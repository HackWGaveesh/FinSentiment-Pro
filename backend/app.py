from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import torch
import requests
from datetime import datetime, timedelta
import numpy as np
from textblob import TextBlob
import os
import json
import time
from dotenv import load_dotenv

# Load environment variables from .env file
# Try multiple locations to ensure keys load whether app is started from repo root or backend folder
load_dotenv()  # current working directory
try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # Load backend/.env explicitly
    load_dotenv(os.path.join(BASE_DIR, '.env'))
    # Also attempt repo root .env (one level up) without overriding existing values
    load_dotenv(os.path.join(BASE_DIR, '..', '.env'))
except Exception:
    pass

app = Flask(__name__)

# CORS configuration - allow Vercel and Render domains plus localhost
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "http://localhost:5173",
            "https://*.vercel.app",
            "https://*.render.com"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Load stock database
STOCK_DATABASE = []
try:
    with open('stock_database.json', 'r', encoding='utf-8') as f:
        STOCK_DATABASE = json.load(f)
    print(f"Loaded {len(STOCK_DATABASE)} stocks from database")
except Exception as e:
    print(f"Warning: Could not load stock database: {e}")
    STOCK_DATABASE = []

# Cache for stock data to reduce API calls
STOCK_DATA_CACHE = {}
CACHE_DURATION = 300  # 5 minutes in seconds

# Demo mode toggle - set to True to always use sample data, False to try real APIs first
# Setting to False will try Alpha Vantage first, then yfinance, then fall back to sample data
DEMO_MODE = os.environ.get('DEMO_MODE', 'false').lower() == 'true'  # Changed to 'false' for real data

# API Keys - Load from environment variables with rotation support
NEWS_API_KEY = os.getenv('NEWS_API_KEY', 'your_newsapi_key_here')
ALPHA_VANTAGE_KEY = os.getenv('ALPHA_VANTAGE_KEY', 'your_alphavantage_key_here')
HF_API_KEY = os.getenv('HF_API_KEY', 'your_huggingface_key_here')

# Indian Stock API Keys (multiple keys for rotation when rate limit hits)
INDIAN_STOCK_API_KEYS = [
    os.getenv('INDIAN_STOCK_API_KEY', 'your_indian_stock_api_key_here'),
    os.getenv('INDIAN_STOCK_API_KEY_2', ''),
    os.getenv('INDIAN_STOCK_API_KEY_3', ''),
]
# Filter out empty keys
INDIAN_STOCK_API_KEYS = [k for k in INDIAN_STOCK_API_KEYS if k and k != 'your_indian_stock_api_key_here']
CURRENT_API_KEY_INDEX = 0

def get_next_indian_stock_api_key():
    """Rotate to next API key when current one hits rate limit"""
    global CURRENT_API_KEY_INDEX
    if not INDIAN_STOCK_API_KEYS:
        return None
    
    # Get current key
    key = INDIAN_STOCK_API_KEYS[CURRENT_API_KEY_INDEX]
    
    # Rotate to next key for next call
    CURRENT_API_KEY_INDEX = (CURRENT_API_KEY_INDEX + 1) % len(INDIAN_STOCK_API_KEYS)
    
    return key

# Quick sanity log (masked) to help debug missing API keys without leaking secrets
def _mask(s: str) -> str:
    if not s or s == 'your_indian_stock_api_key_here':
        return 'MISSING'
    if len(s) <= 8:
        return '****'
    return s[:4] + '...' + s[-4:]

print(f"Config: Loaded {len(INDIAN_STOCK_API_KEYS)} API keys | DEMO_MODE={DEMO_MODE}")
if INDIAN_STOCK_API_KEYS:
    print(f"API Key 1: {_mask(INDIAN_STOCK_API_KEYS[0])}")

# Initialize FinBERT model for sentiment analysis
print("Loading FinBERT model...")
finbert_tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
finbert_model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
finbert_pipeline = pipeline("sentiment-analysis", model=finbert_model, tokenizer=finbert_tokenizer)

# Emotion detection pipeline
emotion_pipeline = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)

def get_indian_news_articles(days=7):
    """Fetch news articles from Indian Stock API"""
    try:
        import http.client
        
        api_key = get_next_indian_stock_api_key()
        if not api_key:
            return []
        
        conn = http.client.HTTPSConnection('stock.indianapi.in')
        headers = {'x-api-key': api_key}
        
        conn.request('GET', '/news', headers=headers)
        res = conn.getresponse()
        data = res.read()
        
        if res.status != 200:
            print(f"Indian Stock API news error: Status {res.status}")
            return []
        
        news_data = json.loads(data.decode('utf-8'))
        
        if not isinstance(news_data, list):
            print(f"Unexpected news data format: {type(news_data)}")
            return []
        
        # Convert to NewsAPI format for compatibility
        articles = []
        cutoff_date = datetime.now() - timedelta(days=days)
        
        for item in news_data:
            try:
                # Parse publication date
                pub_date_str = item.get('pub_date', '')
                if pub_date_str:
                    # Format: "2025-11-10T13:52:05"
                    pub_date = datetime.fromisoformat(pub_date_str.replace('Z', ''))
                    
                    # Only include articles within date range
                    if pub_date < cutoff_date:
                        continue
                    
                    # Convert to NewsAPI format
                    articles.append({
                        'title': item.get('title', ''),
                        'description': item.get('summary', ''),
                        'publishedAt': pub_date_str + 'Z' if not pub_date_str.endswith('Z') else pub_date_str,
                        'source': {'name': item.get('source', 'Indian Market News')},
                        'url': item.get('url', '#'),
                        'urlToImage': item.get('image_url', ''),
                        'topics': item.get('topics', [])
                    })
            except Exception as e:
                print(f"Error parsing news item: {e}")
                continue
        
        print(f"✅ Indian Stock API: Fetched {len(articles)} news articles")
        return articles
        
    except Exception as e:
        print(f"❌ Error fetching Indian news: {e}")
        import traceback
        traceback.print_exc()
        return []


def get_news_articles(ticker, days=7):
    """Fetch news articles from News API or Indian Stock API"""
    # Determine if this is an Indian stock
    is_indian_stock = ticker.endswith('.NS') or ticker.endswith('.BO') or ticker.endswith('.BO.BO')
    
    # For Indian stocks, get stock-specific news from Indian Stock API
    if is_indian_stock:
        print(f"📰 Fetching stock-specific news for {ticker} from Indian Stock API")
        
        try:
            import http.client
            
            # Extract stock symbol (remove .NS or .BO suffix)
            stock_symbol = ticker.replace('.NS', '').replace('.BO', '').replace('.BO.BO', '')
            
            api_key = get_next_indian_stock_api_key()
            if not api_key:
                return []
            
            conn = http.client.HTTPSConnection('stock.indianapi.in')
            headers = {'x-api-key': api_key}
            
            conn.request('GET', f'/stock?name={stock_symbol}', headers=headers)
            res = conn.getresponse()
            data = res.read()
            
            if res.status != 200:
                print(f"Indian Stock API error: Status {res.status}")
            else:
                stock_data = json.loads(data.decode('utf-8'))
                
                # Get stock-specific news from recentNews field
                if 'recentNews' in stock_data and stock_data['recentNews']:
                    recent_news = stock_data['recentNews']
                    
                    # Convert to NewsAPI format
                    articles = []
                    cutoff_date = datetime.now() - timedelta(days=days)
                    
                    for item in recent_news:
                        try:
                            # Parse publication date
                            pub_date_str = item.get('date', item.get('lastPublishedDate', ''))
                            if pub_date_str:
                                # Format: "2025-11-09T06:55:04+0000"
                                pub_date = datetime.fromisoformat(pub_date_str.replace('+0000', ''))
                                
                                # Only include articles within date range
                                if pub_date < cutoff_date:
                                    continue
                                
                                # Clean headline (remove HTML tags)
                                headline = item.get('headline', '')
                                headline = headline.replace('<span class=\'webrupee\'>₹</span>', '₹')
                                headline = headline.replace('<span class="webrupee">₹</span>', '₹')
                                
                                # Convert to NewsAPI format
                                articles.append({
                                    'title': headline,
                                    'description': item.get('summary', ''),
                                    'publishedAt': pub_date_str.replace('+0000', 'Z'),
                                    'source': {'name': 'LiveMint'},
                                    'url': f"https://www.livemint.com{item.get('url', '#')}",
                                    'urlToImage': item.get('thumbnailImage', item.get('listimage', ''))
                                })
                        except Exception as e:
                            print(f"Error parsing news item: {e}")
                            continue
                    
                    if articles:
                        print(f"✅ Found {len(articles)} stock-specific news articles for {ticker}")
                        return articles
                    else:
                        print(f"⚠️ No recent news within {days} days for {ticker}")
                else:
                    print(f"⚠️ No 'recentNews' field for {ticker}")
        
        except Exception as e:
            print(f"❌ Error fetching Indian stock news: {e}")
            import traceback
            traceback.print_exc()
        
        # Fallback to general Indian market news
        print(f"⚠️ Trying general Indian market news as fallback...")
        articles = get_indian_news_articles(days)
        if articles and len(articles) >= 5:
            return articles
    
    # Fallback to NewsAPI (for US stocks or if Indian API didn't return enough)
    try:
        # Calculate date range
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        # Search query
        query = f"{ticker} stock OR {ticker} shares"
        
        url = f"https://newsapi.org/v2/everything"
        params = {
            'q': query,
            'from': start_date.strftime('%Y-%m-%d'),
            'to': end_date.strftime('%Y-%m-%d'),
            'language': 'en',
            'sortBy': 'publishedAt',
            'pageSize': 100,
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if data['status'] == 'ok':
            return data['articles']
        return []
    except Exception as e:
        print(f"Error fetching news: {e}")
        return []

def analyze_sentiment_finbert(text):
    """Analyze sentiment using FinBERT"""
    try:
        # Truncate text to max length
        max_length = 512
        text = text[:max_length]
        
        result = finbert_pipeline(text)[0]
        
        # Convert to score (-100 to 100)
        label = result['label'].lower()
        score = result['score']
        
        if label == 'positive':
            sentiment_score = score * 100
        elif label == 'negative':
            sentiment_score = -score * 100
        else:  # neutral
            sentiment_score = 0
            
        return sentiment_score, score
    except Exception as e:
        print(f"FinBERT error: {e}")
        return 0, 0.5

def detect_emotions(text):
    """Detect emotions in text"""
    try:
        results = emotion_pipeline(text[:512])[0]
        # Get top 2 emotions
        emotions = sorted(results, key=lambda x: x['score'], reverse=True)[:2]
        return [e['label'] for e in emotions if e['score'] > 0.3]
    except Exception as e:
        print(f"Emotion detection error: {e}")
        return []


def get_indian_stock_data(ticker, days=30):
    """Fetch Indian stock data from IndianAPI.in"""
    try:
        import http.client
        import pandas as pd
        
        # Extract stock symbol (remove .NS or .BO suffix)
        stock_symbol = ticker.replace('.NS', '').replace('.BO', '').replace('.BO.BO', '')
        
        print(f"🇮🇳 Fetching Indian stock data for {stock_symbol} ({ticker})")
        
        api_key = get_next_indian_stock_api_key()
        if not api_key:
            print("No Indian Stock API keys available")
            return None
        
        conn = http.client.HTTPSConnection('stock.indianapi.in')
        headers = {'x-api-key': api_key}
        
        conn.request('GET', f'/stock?name={stock_symbol}', headers=headers)
        res = conn.getresponse()
        data = res.read()
        
        if res.status != 200:
            print(f"Indian Stock API error: Status {res.status}")
            return None
        
        stock_data = json.loads(data.decode('utf-8'))
        
        # Extract company name and current price
        company_name = stock_data.get('companyName', stock_symbol)
        current_price_nse = float(stock_data.get('currentPrice', {}).get('NSE', 0))
        current_price_bse = float(stock_data.get('currentPrice', {}).get('BSE', 0))
        
        # Use NSE price by default, fallback to BSE
        current_price = current_price_nse if current_price_nse > 0 else current_price_bse
        
        if current_price == 0:
            print(f"No price data available for {stock_symbol}")
            return None
        
        # Build historical data from technical data
        technical_data = stock_data.get('stockTechnicalData', [])
        
        if not technical_data:
            print(f"No technical/historical data for {stock_symbol}")
            return None
        
        # Create a DataFrame with historical prices
        # The API provides average prices for 5, 10, 20, 50, 100 days
        dates = []
        prices = []
        volumes = []
        
        # Add current price as most recent data point
        dates.append(datetime.now())
        prices.append(current_price)
        volumes.append(1000000)  # Default volume
        
        # Add historical data points (working backwards)
        for item in technical_data[:min(len(technical_data), days)]:
            days_ago = item.get('days', 0)
            nse_price = float(item.get('nsePrice', 0))
            bse_price = float(item.get('bsePrice', 0))
            price = nse_price if nse_price > 0 else bse_price
            
            if price > 0 and days_ago > 0:
                date = datetime.now() - timedelta(days=days_ago)
                dates.append(date)
                prices.append(price)
                volumes.append(1000000)  # Default volume
        
        # Create DataFrame
        hist = pd.DataFrame({
            'Close': prices,
            'Open': prices,  # Use same as close (API doesn't provide OHLC)
            'High': [p * 1.005 for p in prices],  # Estimate
            'Low': [p * 0.995 for p in prices],   # Estimate
            'Volume': volumes
        }, index=pd.DatetimeIndex(dates))
        
        # Sort by date (oldest to newest)
        hist = hist.sort_index()
        
        print(f"✅ Indian Stock API: Fetched {len(hist)} data points for {company_name}")
        print(f"   Current Price: ₹{current_price:.2f}")
        
        return {
            'history': hist,
            'info': {'longName': company_name},
            'company_name': company_name,
            'data_source': 'indian_stock_api'
        }
        
    except Exception as e:
        print(f"❌ Indian Stock API error for {ticker}: {e}")
        import traceback
        traceback.print_exc()
        return None


def get_stock_data_alpha_vantage(ticker, days=30):
    """Fetch stock data from Alpha Vantage API with support for Indian exchanges"""
    try:
        # Import pandas here to avoid missing import
        import pandas as pd
        
        # Map Indian exchange suffixes to Alpha Vantage format
        alpha_ticker = ticker
        original_ticker = ticker
        
        if ticker.endswith('.NS'):
            # NSE India - Remove suffix, Alpha Vantage doesn't need exchange prefix for most Indian stocks
            base_ticker = ticker.replace('.NS', '')
            # Try both formats
            alpha_ticker = base_ticker  # First try without prefix
        elif ticker.endswith('.BO.BO'):
            # Fix duplicate suffix first
            base_ticker = ticker.replace('.BO.BO', '')
            alpha_ticker = base_ticker
        elif ticker.endswith('.BO'):
            # BSE India
            base_ticker = ticker.replace('.BO', '')
            alpha_ticker = base_ticker
        
        print(f"Alpha Vantage: Fetching {original_ticker} as {alpha_ticker}")
        
        url = "https://www.alphavantage.co/query"
        params = {
            'function': 'TIME_SERIES_DAILY',
            'symbol': alpha_ticker,
            'outputsize': 'full',  # Returns up to 20 years of data
            'apikey': ALPHA_VANTAGE_KEY
        }
        
        response = requests.get(url, params=params, timeout=15)
        data = response.json()
        
        # Check for errors or rate limits
        if 'Error Message' in data:
            print(f"Alpha Vantage error: {data['Error Message']}")
            return None
            
        if 'Note' in data:
            print(f"⚠️ Alpha Vantage rate limit: {data['Note']}")
            print("Consider waiting 60 seconds or upgrading your API key for higher limits")
            return None
            
        if 'Time Series (Daily)' not in data:
            print(f"No time series data in Alpha Vantage response for {alpha_ticker}")
            # Try with exchange-specific format for Indian stocks
            if original_ticker.endswith('.NS') or original_ticker.endswith('.BO'):
                exchange_prefix = 'BSE:' if original_ticker.endswith('.BO') or original_ticker.endswith('.BO.BO') else 'NSE:'
                base_ticker = original_ticker.replace('.NS', '').replace('.BO.BO', '').replace('.BO', '')
                alt_ticker = f"{exchange_prefix}{base_ticker}"
                print(f"Retrying with exchange prefix: {alt_ticker}")
                
                params['symbol'] = alt_ticker
                response = requests.get(url, params=params, timeout=15)
                data = response.json()
                
                if 'Time Series (Daily)' not in data:
                    print(f"Still no data with exchange prefix {alt_ticker}")
                    return None
        
        # Parse time series data
        time_series = data['Time Series (Daily)']
        
        # Convert to DataFrame - get only the requested number of days
        dates, prices, volumes, opens, highs, lows = [], [], [], [], [], []
        sorted_dates = sorted(time_series.items(), reverse=True)[:days]
        
        for date_str, values in sorted_dates:
            dates.append(pd.to_datetime(date_str))
            opens.append(float(values['1. open']))
            highs.append(float(values['2. high']))
            lows.append(float(values['3. low']))
            prices.append(float(values['4. close']))
            volumes.append(int(values['5. volume']))
        
        if not dates:
            print(f"Alpha Vantage returned data structure, but no daily entries for {alpha_ticker}")
            return None

        # Reverse to get chronological order (oldest to newest)
        dates.reverse()
        opens.reverse()
        highs.reverse()
        lows.reverse()
        prices.reverse()
        volumes.reverse()
        
        hist = pd.DataFrame({
            'Open': opens,
            'High': highs,
            'Low': lows,
            'Close': prices,
            'Volume': volumes
        }, index=pd.DatetimeIndex(dates))
        
        # Get company name from database or use ticker
        company_name = original_ticker
        for stock in STOCK_DATABASE:
            if stock['ticker'] == original_ticker:
                company_name = stock['name']
                break
        
        print(f"✅ Alpha Vantage: Fetched {len(hist)} days for {original_ticker} ({company_name})")
        print(f"   Latest price: {prices[-1]:.2f}, Date: {dates[-1].strftime('%Y-%m-%d')}")
        
        return {
            'history': hist,
            'info': {'longName': company_name},
            'company_name': company_name,
            'data_source': 'alpha_vantage'
        }
        
    except Exception as e:
        print(f"❌ Alpha Vantage error for {ticker}: {e}")
        import traceback
        traceback.print_exc()
        return None


def get_realtime_quote_alpha_vantage(ticker):
    """Get real-time stock quote using Alpha Vantage GLOBAL_QUOTE endpoint"""
    try:
        # Map Indian exchange suffixes
        alpha_ticker = ticker
        if ticker.endswith('.NS'):
            base_ticker = ticker.replace('.NS', '')
            alpha_ticker = base_ticker
        elif ticker.endswith('.BO.BO'):
            base_ticker = ticker.replace('.BO.BO', '')
            alpha_ticker = base_ticker
        elif ticker.endswith('.BO'):
            base_ticker = ticker.replace('.BO', '')
            alpha_ticker = base_ticker
        
        url = "https://www.alphavantage.co/query"
        params = {
            'function': 'GLOBAL_QUOTE',
            'symbol': alpha_ticker,
            'apikey': ALPHA_VANTAGE_KEY
        }
        
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        
        if 'Global Quote' not in data or not data['Global Quote']:
            print(f"No quote data for {ticker}")
            return None
        
        quote = data['Global Quote']
        
        return {
            'price': float(quote.get('05. price', 0)),
            'change': float(quote.get('09. change', 0)),
            'change_percent': quote.get('10. change percent', '0%').replace('%', ''),
            'volume': int(quote.get('06. volume', 0)),
            'latest_trading_day': quote.get('07. latest trading day', ''),
            'previous_close': float(quote.get('08. previous close', 0)),
            'open': float(quote.get('02. open', 0)),
            'high': float(quote.get('03. high', 0)),
            'low': float(quote.get('04. low', 0))
        }
        
    except Exception as e:
        print(f"Error fetching quote for {ticker}: {e}")
        return None

def get_stock_data(ticker, days=30):
    """Fetch stock price data - Yahoo Finance (primary for Indian stocks), Alpha Vantage (fallback), then synthetic"""
    # Check cache first
    cache_key = f"{ticker}_{days}"
    current_time = time.time()
    
    if cache_key in STOCK_DATA_CACHE:
        cached_data, cache_time = STOCK_DATA_CACHE[cache_key]
        if current_time - cache_time < CACHE_DURATION:
            print(f"✓ Using cached data for {ticker}")
            return cached_data
    
    # If DEMO_MODE is enabled, skip APIs and use sample data directly
    if DEMO_MODE:
        print(f"DEMO MODE: Generating sample data for {ticker}")
        result = generate_sample_stock_data(ticker, days)
        result['data_source'] = 'synthetic'
        STOCK_DATA_CACHE[cache_key] = (result, current_time)
        return result
    
    # Determine if this is an Indian stock
    is_indian_stock = ticker.endswith('.NS') or ticker.endswith('.BO') or ticker.endswith('.BO.BO')
    
    # For Indian stocks, prioritize Indian Stock API (best coverage for Indian markets)
    # For US/international stocks, try Alpha Vantage first (more reliable for US markets)
    if is_indian_stock:
        print(f"📍 Indian stock detected: {ticker} - Using Indian Stock API as primary source")
        
        # Try Indian Stock API first for Indian stocks
        print(f"→ Trying Indian Stock API for {ticker}")
        result = get_indian_stock_data(ticker, days)
        if result:
            STOCK_DATA_CACHE[cache_key] = (result, current_time)
            return result
        
        print(f"⚠️ Indian Stock API returned no data, trying Alpha Vantage...")
        
        # Fallback to Alpha Vantage for Indian stocks (rarely works but worth trying)
        print(f"→ Trying Alpha Vantage as fallback for {ticker}")
        result = get_stock_data_alpha_vantage(ticker, days)
        if result:
            result['data_source'] = 'alpha_vantage'
            STOCK_DATA_CACHE[cache_key] = (result, current_time)
            return result
    
    else:
        # For US/international stocks, try Alpha Vantage first
        print(f"🌐 International stock: {ticker} - Trying Alpha Vantage first")
        result = get_stock_data_alpha_vantage(ticker, days)
        if result:
            result['data_source'] = 'alpha_vantage'
            STOCK_DATA_CACHE[cache_key] = (result, current_time)
            return result
        
        # Fallback to Yahoo Finance for US stocks
        print(f"→ Trying Yahoo Finance as fallback for {ticker}")
        try:
            # Add delay to avoid rate limiting
            time.sleep(0.5)
            
            stock = yf.Ticker(ticker)
            # Use download function which is more reliable
            hist = yf.download(ticker, period=f"{days}d", progress=False, show_errors=False)
            
            if not hist.empty and len(hist) > 0:
                # Get company name from database
                company_name = next((s['name'] for s in STOCK_DATABASE if s['ticker'] == ticker), ticker)
                
                # Try to get company info from API (works better for US stocks)
                try:
                    info = stock.info
                    company_name = info.get('longName', company_name)
                except:
                    pass  # Use database name if API fails

                result = {
                    'history': hist,
                    'info': {'longName': company_name},
                    'company_name': company_name,
                    'data_source': 'yahoo_finance'
                }
                
                STOCK_DATA_CACHE[cache_key] = (result, current_time)
                print(f"✅ Yahoo Finance: Successfully fetched {len(hist)} days for {ticker} ({company_name})")
                latest_price = hist['Close'].iloc[-1]
                latest_date = hist.index[-1].strftime('%Y-%m-%d')
                print(f"   Latest price: ${latest_price:.2f}, Date: {latest_date}")
                return result
            else:
                print(f"⚠️ Yahoo Finance returned no data for {ticker}")
                
        except Exception as e:
            print(f"❌ Yahoo Finance error for {ticker}: {e}")
            import traceback
            traceback.print_exc()
    
    # If both APIs failed, fall back to sample data
    print(f"⚠️  WARNING: Real data not available for {ticker}. Using synthetic fallback data.")
    print(f"   This stock may be delisted, have an incorrect symbol, or not be available via free APIs.")
    result = generate_sample_stock_data(ticker, days)
    result['data_source'] = 'synthetic'
    result['is_fallback'] = True
    STOCK_DATA_CACHE[cache_key] = (result, current_time)
    return result

def generate_sample_stock_data(ticker, days=30):
    """Generate sample stock data for demo purposes when Yahoo Finance is unavailable"""
    import pandas as pd
    
    # Find company name from database
    company_name = ticker
    exchange = "Unknown"
    country = "Unknown"
    
    for stock in STOCK_DATABASE:
        if stock['ticker'] == ticker:
            company_name = stock['name']
            exchange = stock.get('exchange', 'Unknown')
            country = stock.get('country', 'Unknown')
            break
    
    # Generate sample price data with variety based on ticker characteristics
    dates = pd.date_range(end=datetime.now(), periods=days, freq='D')
    
    # Base price varies by exchange and ticker
    if '.NS' in ticker or '.BO' in ticker:  # Indian stocks
        base_price = 50 + (hash(ticker) % 5000)  # INR 50-5050
    else:  # US and other stocks
        base_price = 50 + (hash(ticker) % 950)  # USD 50-1000
    
    # Create random-walk price data with consistent seed
    np.random.seed(hash(ticker) % 100000)
    prices = [base_price]
    
    # Volatility varies by stock
    volatility = 0.5 + (hash(ticker + "vol") % 30) / 10  # 0.5% to 3.5%
    
    for i in range(days - 1):
        # Random walk with drift
        change = np.random.normal(0.05, volatility)  # Slight upward drift
        new_price = prices[-1] * (1 + change / 100)
        prices.append(max(new_price, base_price * 0.5))  # Don't drop below 50% of base
    
    # Generate volume based on country/exchange
    if country == 'India':
        volume_base = 500000  # Lower volume for Indian stocks
        volume_range = 5000000
    else:
        volume_base = 2000000  # Higher volume for US stocks
        volume_range = 20000000
    
    volumes = [volume_base + np.random.randint(0, volume_range) for _ in range(days)]
    
    # Create OHLC data
    hist = pd.DataFrame({
        'Close': prices,
        'Volume': volumes,
        'Open': [p * (1 + np.random.uniform(-0.5, 0.5) / 100) for p in prices],
        'High': [p * (1 + abs(np.random.uniform(0, 1.5)) / 100) for p in prices],
        'Low': [p * (1 - abs(np.random.uniform(0, 1.5)) / 100) for p in prices],
    }, index=dates)
    
    print(f"Generated sample data for {ticker} ({company_name}): {len(hist)} days, "
          f"price ${min(prices):.2f}-${max(prices):.2f}, avg volume {int(np.mean(volumes)):,}")
    
    return {
        'history': hist,
        'info': {
            'longName': company_name,
            'exchange': exchange,
            'country': country
        },
        'company_name': company_name
    }

def generate_sample_news(ticker, company_name, days=7):
    """Generate sample news articles for demo purposes"""
    sample_templates = [
        "{company} reports strong quarterly earnings",
        "{company} announces new product launch",
        "{company} stock shows positive momentum",
        "Market analysts upgrade {company} rating",
        "{company} expands into new markets",
        "Investors remain bullish on {company}",
        "{company} sees increased trading volume",
        "Industry outlook positive for {company}",
        "{company} maintains steady growth",
        "Analysts predict continued success for {company}",
        "{company} announces strategic partnership",
        "Market volatility impacts {company} trading",
        "{company} focuses on innovation and growth",
        "Quarterly results exceed expectations for {company}",
        "{company} adapts to changing market conditions"
    ]

    articles = []
    np.random.seed(hash(ticker) % 10000)

    # Generate 5-15 sample articles
    num_articles = 5 + (hash(ticker) % 10)

    for i in range(min(num_articles, 15)):
        template = sample_templates[i % len(sample_templates)]
        title = template.format(company=company_name)

        # Create description
        descriptions = [
            f"Recent market analysis suggests {company_name} is well-positioned for growth.",
            f"{company_name} continues to show strong performance in the current market.",
            f"Industry experts are optimistic about {company_name}'s future prospects.",
            f"Market trends indicate positive sentiment toward {company_name}.",
            f"{company_name} demonstrates resilience in volatile market conditions."
        ]
        description = descriptions[i % len(descriptions)]

        # Calculate date (spread over the requested days)
        days_ago = int((i / num_articles) * days)
        article_date = (datetime.now() - timedelta(days=days_ago)).isoformat() + 'Z'

        articles.append({
            'title': title,
            'description': description,
            'publishedAt': article_date,
            'source': {'name': 'Market News'},
            'url': f'https://example.com/news/{ticker.lower()}-{i}'
        })

    print(f"Generated {len(articles)} sample news articles for {ticker}")
    return articles

def calculate_dimensions(articles):
    """Calculate multi-dimensional sentiment metrics"""
    if not articles:
        return {
            'marketSentiment': 50,
            'emotionalTone': 50,
            'uncertainty': 50,
            'urgency': 50,
            'futureOutlook': 50,
            'riskAssessment': 50
        }
    
    sentiments = []
    emotions_count = {'joy': 0, 'fear': 0, 'anger': 0, 'surprise': 0}
    uncertainty_words = ['uncertain', 'unclear', 'volatile', 'risk', 'doubt', 'maybe', 'possibly']
    urgency_words = ['urgent', 'immediately', 'breaking', 'alert', 'now', 'sudden']
    future_words = ['forecast', 'predict', 'outlook', 'expect', 'future', 'will', 'growth']
    risk_words = ['risk', 'danger', 'threat', 'concern', 'warning', 'caution']
    
    for article in articles:
        text = (article.get('title', '') + ' ' + article.get('description', '')).lower()
        
        # Sentiment
        sentiment, _ = analyze_sentiment_finbert(text)
        sentiments.append(sentiment)
        
        # Emotions
        emotions = detect_emotions(text)
        for emotion in emotions:
            if emotion in emotions_count:
                emotions_count[emotion] += 1
        
        # Count keyword occurrences
        article['uncertainty_count'] = sum(1 for word in uncertainty_words if word in text)
        article['urgency_count'] = sum(1 for word in urgency_words if word in text)
        article['future_count'] = sum(1 for word in future_words if word in text)
        article['risk_count'] = sum(1 for word in risk_words if word in text)
    
    avg_sentiment = np.mean(sentiments) if sentiments else 0
    total_articles = len(articles)
    
    # Calculate dimensions
    market_sentiment = max(0, min(100, 50 + avg_sentiment / 2))
    
    positive_emotions = emotions_count.get('joy', 0) + emotions_count.get('surprise', 0)
    negative_emotions = emotions_count.get('fear', 0) + emotions_count.get('anger', 0)
    total_emotions = positive_emotions + negative_emotions
    emotional_tone = (positive_emotions / total_emotions * 100) if total_emotions > 0 else 50
    
    uncertainty_total = sum(a.get('uncertainty_count', 0) for a in articles)
    uncertainty = min(100, (uncertainty_total / total_articles) * 20)
    
    urgency_total = sum(a.get('urgency_count', 0) for a in articles)
    urgency = min(100, (urgency_total / total_articles) * 25)
    
    future_total = sum(a.get('future_count', 0) for a in articles)
    future_outlook = min(100, (future_total / total_articles) * 15 + market_sentiment * 0.3)
    
    risk_total = sum(a.get('risk_count', 0) for a in articles)
    risk_assessment = min(100, (risk_total / total_articles) * 20)
    
    return {
        'marketSentiment': round(market_sentiment, 1),
        'emotionalTone': round(emotional_tone, 1),
        'uncertainty': round(uncertainty, 1),
        'urgency': round(urgency, 1),
        'futureOutlook': round(future_outlook, 1),
        'riskAssessment': round(risk_assessment, 1)
    }

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """Main endpoint for sentiment analysis"""
    try:
        data = request.json
        ticker = data.get('ticker', '').upper()
        days = int(data.get('days', 7))
        
        if not ticker:
            return jsonify({'error': 'Ticker required'}), 400
        
        # Fetch stock data
        stock_data = get_stock_data(ticker, days=days)
        if not stock_data:
            return jsonify({
                'error': f'Unable to fetch stock data for {ticker}. This could be due to:\n'
                        '1. Invalid ticker symbol\n'
                        '2. Yahoo Finance rate limiting (try again in a few minutes)\n'
                        '3. Network connectivity issues\n'
                        '4. Market is closed (try a ticker with recent trading activity)'
            }), 404
        
        # Add data source information to help users know if they're seeing real or synthetic data
        data_source = stock_data.get('data_source', 'unknown')
        
        # Fetch news articles
        articles = get_news_articles(ticker, days=days)

        # If no articles found, generate sample news as a fallback so analysis can proceed
        if not articles:
            print(f"No news found for {ticker}. Generating synthetic articles as fallback for analysis.")
            articles = generate_sample_news(ticker, stock_data.get('company_name', ticker), days)
        
        # Analyze each article
        analyzed_headlines = []
        sentiment_scores = []
        source_breakdown = {}
        
        for idx, article in enumerate(articles[:50]):  # Limit to 50 articles
            title = article.get('title', '')
            description = article.get('description', '')
            text = f"{title}. {description}"
            
            # Sentiment analysis
            sentiment, confidence = analyze_sentiment_finbert(text)
            sentiment_scores.append(sentiment)
            
            # Emotion detection
            emotions = detect_emotions(text)
            
            # Determine label
            if sentiment > 20:
                label = 'Positive'
            elif sentiment < -20:
                label = 'Negative'
            else:
                label = 'Neutral'
            
            # Source tracking
            source = article.get('source', {}).get('name', 'Unknown')
            if source not in source_breakdown:
                source_breakdown[source] = {'sentiment': [], 'count': 0}
            source_breakdown[source]['sentiment'].append(sentiment)
            source_breakdown[source]['count'] += 1
            
            # Calculate time ago
            published = article.get('publishedAt', '')
            time_ago = calculate_time_ago(published)
            
            analyzed_headlines.append({
                'id': idx + 1,
                'title': title,
                'source': source,
                'timestamp': published,
                'timeAgo': time_ago,
                'sentiment': round(max(-100, min(100, sentiment)), 1),
                'sentimentLabel': label,
                'confidence': round(confidence, 2),
                'emotions': emotions,
                'url': article.get('url', '#'),
                'summary': description[:200] + '...' if len(description) > 200 else description,
                'topics': article.get('topics', [])  # Include topics from Indian Stock API
            })
        
        # Calculate overall metrics
        overall_score = np.mean(sentiment_scores) if sentiment_scores else 0
        confidence_avg = np.mean([h['confidence'] for h in analyzed_headlines])
        
        # Calculate dimensions
        dimensions = calculate_dimensions(articles)
        
        # Build source breakdown
        sources = []
        for source_name, data in source_breakdown.items():
            avg_sent = np.mean(data['sentiment'])
            sources.append({
                'source': source_name,
                'sentiment': round(avg_sent, 1),
                'articles': data['count'],
                'logo': '📰'
            })
        sources.sort(key=lambda x: x['articles'], reverse=True)
        
        # Build timeline
        timeline = build_timeline(stock_data['history'], articles, days)
        
        # Calculate calendar data
        calendar_data = build_calendar_data(articles, days)
        
        # Generate insights
        insights = generate_insights(ticker, overall_score, sentiment_scores, timeline)
        
        # Calculate correlation
        correlation_data, corr_coef = calculate_correlation(timeline)
        
        # Build response
        result = {
            'ticker': ticker,
            'companyName': stock_data['company_name'],
            'overallScore': round(overall_score, 1),
            'confidence': round(confidence_avg * 100, 0),
            'totalArticles': len(analyzed_headlines),
            'dateRange': f"{(datetime.now() - timedelta(days=days)).strftime('%b %d, %Y')} - {datetime.now().strftime('%b %d, %Y')}",
            'timeline': timeline,
            'dimensions': dimensions,
            'sourceBreakdown': sources[:6],
            'headlines': analyzed_headlines[:20],
            'calendarData': calendar_data,
            'insights': insights,
            'correlationData': correlation_data,
            'correlationCoefficient': round(corr_coef, 2),
            'dataSource': data_source
        }
        
        # Add warning if using synthetic data
        if stock_data.get('is_fallback'):
            result['warning'] = {
                'type': 'synthetic_data',
                'message': f'Real market data not available for {ticker}. Displaying synthetic data for demonstration. This stock may be delisted, have an incorrect symbol, or not be available via free APIs.'
            }
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in analyze endpoint: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

def calculate_time_ago(timestamp_str):
    """Calculate human-readable time ago"""
    try:
        timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
        now = datetime.now(timestamp.tzinfo)
        diff = now - timestamp
        
        if diff.days > 0:
            return f"{diff.days} day{'s' if diff.days > 1 else ''} ago"
        elif diff.seconds >= 3600:
            hours = diff.seconds // 3600
            return f"{hours} hour{'s' if hours > 1 else ''} ago"
        else:
            minutes = diff.seconds // 60
            return f"{minutes} minute{'s' if minutes > 1 else ''} ago"
    except:
        return "Recently"

def build_timeline(price_history, articles, days):
    """Build timeline with sentiment and price data"""
    import pandas as pd
    
    timeline = []
    
    # Ensure index is DatetimeIndex and normalize (remove time component)
    if not isinstance(price_history.index, pd.DatetimeIndex):
        price_history.index = pd.to_datetime(price_history.index)
    price_history.index = price_history.index.normalize()
    
    for i in range(days):
        date = datetime.now() - timedelta(days=days-i-1)
        date_normalized = pd.Timestamp(date.year, date.month, date.day)
        date_str = date.strftime('%Y-%m-%d')
        
        # Get price for this date
        try:
            # Try to find exact date match
            if date_normalized in price_history.index:
                price = price_history.loc[date_normalized, 'Close']
                volume = price_history.loc[date_normalized, 'Volume']
            else:
                # Find nearest date (for weekends/holidays)
                idx = price_history.index.get_indexer([date_normalized], method='nearest')[0]
                if idx >= 0 and idx < len(price_history):
                    price = price_history.iloc[idx]['Close']
                    volume = price_history.iloc[idx]['Volume']
                else:
                    price = None
                    volume = 0
        except Exception as e:
            print(f"Error getting price for {date_str}: {e}")
            price = None
            volume = 0
        
        # Calculate sentiment for this date
        day_articles = [a for a in articles if a.get('publishedAt', '').startswith(date_str)]
        day_sentiments = []
        
        for article in day_articles:
            text = f"{article.get('title', '')}. {article.get('description', '')}"
            sentiment, _ = analyze_sentiment_finbert(text)
            day_sentiments.append(sentiment)
        
        avg_sentiment = np.mean(day_sentiments) if day_sentiments else 0
        
        if price is not None:
            timeline.append({
                'date': date_str,
                'sentiment': round(avg_sentiment, 1),
                'price': round(float(price), 2),
                'volume': int(volume)
            })
    
    return timeline

def build_calendar_data(articles, days):
    """Build calendar data for heatmap"""
    calendar = []
    
    for i in range(min(days, 30)):
        date = datetime.now() - timedelta(days=i)
        date_str = date.strftime('%Y-%m-%d')
        
        # Calculate sentiment for this date
        day_articles = [a for a in articles if a.get('publishedAt', '').startswith(date_str)]
        day_sentiments = []
        
        for article in day_articles:
            text = f"{article.get('title', '')}. {article.get('description', '')}"
            sentiment, _ = analyze_sentiment_finbert(text)
            day_sentiments.append(sentiment)
        
        avg_sentiment = np.mean(day_sentiments) if day_sentiments else 0
        
        calendar.append({
            'date': date_str,
            'sentiment': round(avg_sentiment, 1)
        })
    
    return calendar

def generate_insights(ticker, overall_score, sentiment_scores, timeline):
    """Generate AI insights"""
    
    # Trend analysis
    if len(timeline) >= 2:
        first_half = [t['sentiment'] for t in timeline[:len(timeline)//2]]
        second_half = [t['sentiment'] for t in timeline[len(timeline)//2:]]
        
        avg_first = np.mean(first_half) if first_half else 0
        avg_second = np.mean(second_half) if second_half else 0
        
        if avg_second > avg_first + 10:
            trend = "IMPROVING"
        elif avg_second < avg_first - 10:
            trend = "DECLINING"
        else:
            trend = "STABLE"
    else:
        trend = "STABLE"
    
    # Volatility
    variance = np.var(sentiment_scores) if len(sentiment_scores) > 1 else 0
    if variance > 500:
        volatility = "HIGH"
    elif variance > 200:
        volatility = "MEDIUM"
    else:
        volatility = "LOW"
    
    # Correlation
    if timeline and len(timeline) > 2:
        sentiments = [t['sentiment'] for t in timeline]
        prices = [t['price'] for t in timeline]
        
        if len(sentiments) == len(prices):
            corr = np.corrcoef(sentiments, prices)[0, 1] if len(sentiments) > 1 else 0
            
            if abs(corr) > 0.7:
                correlation_strength = "STRONG"
            elif abs(corr) > 0.4:
                correlation_strength = "MODERATE"
            else:
                correlation_strength = "WEAK"
            
            correlation = f"{correlation_strength} {'positive' if corr > 0 else 'negative'} correlation between sentiment and price (r={corr:.2f})"
        else:
            correlation = "Insufficient data for correlation analysis"
    else:
        correlation = "Insufficient data for correlation analysis"
    
    # Sentiment label
    if overall_score > 20:
        sentiment_label = "POSITIVE"
    elif overall_score < -20:
        sentiment_label = "NEGATIVE"
    else:
        sentiment_label = "NEUTRAL"
    
    return {
        'summary': f"Overall sentiment for {ticker} is {sentiment_label}",
        'trend': f"Sentiment has been {trend} over the analysis period",
        'keyTopics': ["earnings", "market performance", "industry trends"],
        'volatility': f"{volatility} - sentiment variance indicates {'high' if volatility == 'HIGH' else 'moderate' if volatility == 'MEDIUM' else 'low'} market uncertainty",
        'correlation': correlation,
        'prediction': f"Based on current sentiment trends, {'positive' if overall_score > 0 else 'negative'} short-term outlook"
    }

def calculate_correlation(timeline):
    """Calculate correlation between sentiment and price changes"""
    if len(timeline) < 2:
        return [], 0
    
    correlation_data = []
    
    for i in range(1, len(timeline)):
        prev_price = timeline[i-1]['price']
        curr_price = timeline[i]['price']
        price_change = ((curr_price - prev_price) / prev_price) * 100 if prev_price > 0 else 0
        
        correlation_data.append({
            'sentiment': timeline[i]['sentiment'],
            'priceChange': round(price_change, 2)
        })
    
    # Calculate correlation coefficient
    if correlation_data:
        sentiments = [d['sentiment'] for d in correlation_data]
        price_changes = [d['priceChange'] for d in correlation_data]
        
        if len(sentiments) > 1:
            corr_coef = np.corrcoef(sentiments, price_changes)[0, 1]
        else:
            corr_coef = 0
    else:
        corr_coef = 0
    
    return correlation_data, corr_coef

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model': 'FinBERT loaded'})

@app.route('/api/search', methods=['GET'])
def search_stocks():
    """Search for stocks in the database"""
    try:
        query = request.args.get('q', '').strip()
        limit = int(request.args.get('limit', 10))
        
        if not query:
            return jsonify([])
        
        query_lower = query.lower()
        matches = []
        
        # Search by name or ticker
        for stock in STOCK_DATABASE:
            name_lower = stock['name'].lower()
            ticker_lower = stock['ticker'].lower()
            
            # Exact ticker match gets highest priority
            if ticker_lower == query_lower:
                matches.insert(0, stock)
            # Ticker starts with query
            elif ticker_lower.startswith(query_lower):
                matches.append(stock)
            # Name contains query
            elif query_lower in name_lower:
                matches.append(stock)
        
        # Remove duplicates while preserving order
        seen = set()
        unique_matches = []
        for stock in matches:
            if stock['ticker'] not in seen:
                seen.add(stock['ticker'])
                unique_matches.append(stock)
        
        return jsonify(unique_matches[:limit])
        
    except Exception as e:
        print(f"Search error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/quote', methods=['GET'])
def get_quote():
    """Get real-time stock quote"""
    try:
        ticker = request.args.get('ticker', '').strip().upper()
        
        if not ticker:
            return jsonify({'error': 'Ticker parameter is required'}), 400
        
        # Try Alpha Vantage first
        quote = get_realtime_quote_alpha_vantage(ticker)
        
        if quote:
            return jsonify({
                'ticker': ticker,
                'quote': quote,
                'source': 'alpha_vantage'
            })
        
        # Fallback to yfinance
        try:
            stock = yf.Ticker(ticker)
            info = stock.info
            
            quote = {
                'price': info.get('currentPrice', info.get('regularMarketPrice', 0)),
                'change': info.get('regularMarketChange', 0),
                'change_percent': info.get('regularMarketChangePercent', 0),
                'volume': info.get('volume', 0),
                'open': info.get('open', 0),
                'high': info.get('dayHigh', 0),
                'low': info.get('dayLow', 0),
                'previous_close': info.get('previousClose', 0),
                'market_cap': info.get('marketCap', 0),
                'name': info.get('longName', ticker)
            }
            
            return jsonify({
                'ticker': ticker,
                'quote': quote,
                'source': 'yahoo_finance'
            })
            
        except Exception as yf_error:
            print(f"Yahoo Finance quote error: {yf_error}")
            return jsonify({'error': 'Unable to fetch quote data'}), 404
        
    except Exception as e:
        print(f"Quote endpoint error: {e}")
        return jsonify({'error': str(e)}), 500

def get_sample_trending_stocks():
    """Return sample trending stocks data when API is unavailable"""
    import random
    sample_stocks = [
        {'ticker': 'RELIANCE.NS', 'name': 'Reliance Industries Ltd', 'price': 2456.75, 'change': 45.30, 'changePercent': 1.88},
        {'ticker': 'TCS.NS', 'name': 'Tata Consultancy Services', 'price': 3678.90, 'change': -12.45, 'changePercent': -0.34},
        {'ticker': 'HDFCBANK.NS', 'name': 'HDFC Bank Ltd', 'price': 1689.50, 'change': 23.80, 'changePercent': 1.43},
        {'ticker': 'INFY.NS', 'name': 'Infosys Ltd', 'price': 1456.20, 'change': -8.90, 'changePercent': -0.61},
        {'ticker': 'ICICIBANK.NS', 'name': 'ICICI Bank Ltd', 'price': 1023.45, 'change': 34.60, 'changePercent': 3.50},
        {'ticker': 'HINDUNILVR.NS', 'name': 'Hindustan Unilever Ltd', 'price': 2389.75, 'change': 12.35, 'changePercent': 0.52},
        {'ticker': 'BHARTIARTL.NS', 'name': 'Bharti Airtel Ltd', 'price': 1145.80, 'change': 28.90, 'changePercent': 2.59},
        {'ticker': 'ITC.NS', 'name': 'ITC Ltd', 'price': 456.30, 'change': -5.70, 'changePercent': -1.23},
        {'ticker': 'SBIN.NS', 'name': 'State Bank of India', 'price': 634.90, 'change': 42.10, 'changePercent': 7.10},
        {'ticker': 'WIPRO.NS', 'name': 'Wipro Ltd', 'price': 445.60, 'change': -3.20, 'changePercent': -0.71},
        {'ticker': 'LT.NS', 'name': 'Larsen & Toubro Ltd', 'price': 3267.40, 'change': 67.25, 'changePercent': 2.10},
        {'ticker': 'AXISBANK.NS', 'name': 'Axis Bank Ltd', 'price': 1078.95, 'change': -15.30, 'changePercent': -1.40},
        {'ticker': 'MARUTI.NS', 'name': 'Maruti Suzuki India Ltd', 'price': 10456.80, 'change': 123.50, 'changePercent': 1.20},
        {'ticker': 'TATAMOTORS.NS', 'name': 'Tata Motors Ltd', 'price': 734.20, 'change': 56.80, 'changePercent': 8.39},
        {'ticker': 'ADANIENT.NS', 'name': 'Adani Enterprises Ltd', 'price': 2234.55, 'change': -89.45, 'changePercent': -3.85},
    ]
    
    results = []
    for stock in sample_stocks:
        change_pct = stock['changePercent']
        avg_sentiment = min(100, max(-100, change_pct * 10))
        confidence = min(95, 50 + abs(change_pct) * 3)
        
        if avg_sentiment > 30:
            label = 'Bullish'
        elif avg_sentiment < -30:
            label = 'Bearish'
        else:
            label = 'Neutral'
        
        results.append({
            'ticker': stock['ticker'],
            'name': stock['name'],
            'price': stock['price'],
            'change': stock['change'],
            'changePercent': stock['changePercent'],
            'sentiment': round(avg_sentiment, 1),
            'sentimentLabel': label,
            'articleCount': 0,
            'confidence': round(confidence, 1)
        })
    
    return results

def get_real_time_prices_yfinance():
    """Fetch real-time prices from yfinance as fallback"""
    popular_stocks = [
        {'ticker': 'RELIANCE.NS', 'name': 'Reliance Industries Ltd'},
        {'ticker': 'TCS.NS', 'name': 'Tata Consultancy Services'},
        {'ticker': 'HDFCBANK.NS', 'name': 'HDFC Bank Ltd'},
        {'ticker': 'INFY.NS', 'name': 'Infosys Ltd'},
        {'ticker': 'ICICIBANK.NS', 'name': 'ICICI Bank Ltd'},
        {'ticker': 'HINDUNILVR.NS', 'name': 'Hindustan Unilever Ltd'},
        {'ticker': 'BHARTIARTL.NS', 'name': 'Bharti Airtel Ltd'},
        {'ticker': 'ITC.NS', 'name': 'ITC Ltd'},
        {'ticker': 'SBIN.NS', 'name': 'State Bank of India'},
        {'ticker': 'WIPRO.NS', 'name': 'Wipro Ltd'},
        {'ticker': 'LT.NS', 'name': 'Larsen & Toubro Ltd'},
        {'ticker': 'AXISBANK.NS', 'name': 'Axis Bank Ltd'},
        {'ticker': 'MARUTI.NS', 'name': 'Maruti Suzuki India Ltd'},
        {'ticker': 'TATAMOTORS.NS', 'name': 'Tata Motors Ltd'},
        {'ticker': 'ADANIENT.NS', 'name': 'Adani Enterprises Ltd'},
    ]
    
    results = []
    for stock_info in popular_stocks:
        try:
            ticker = stock_info['ticker']
            stock = yf.Ticker(ticker)
            
            # Get current data
            info = stock.info
            hist = stock.history(period='2d')
            
            if len(hist) < 2:
                continue
                
            current_price = hist['Close'].iloc[-1]
            prev_price = hist['Close'].iloc[-2]
            change = current_price - prev_price
            change_pct = (change / prev_price) * 100
            
            # Calculate sentiment based on price movement
            avg_sentiment = min(100, max(-100, change_pct * 10))
            confidence = min(95, 50 + abs(change_pct) * 3)
            
            if avg_sentiment > 30:
                label = 'Bullish'
            elif avg_sentiment < -30:
                label = 'Bearish'
            else:
                label = 'Neutral'
            
            results.append({
                'ticker': ticker,
                'name': stock_info['name'],
                'price': round(current_price, 2),
                'change': round(change, 2),
                'changePercent': round(change_pct, 2),
                'sentiment': round(avg_sentiment, 1),
                'sentimentLabel': label,
                'articleCount': 0,
                'confidence': round(confidence, 1)
            })
        except Exception as e:
            print(f"Error fetching {stock_info['ticker']}: {e}")
            continue
    
    return results

@app.route('/api/trending', methods=['GET'])
def get_trending():
    """Fetch trending stocks with quick sentiment analysis"""
    try:
        import http.client
        
        # Get next API key from rotation
        api_key = get_next_indian_stock_api_key()
        if not api_key:
            print("No Indian Stock API keys available")
            real_time_data = get_real_time_prices_yfinance()
            if real_time_data:
                return jsonify({
                    'trending': real_time_data,
                    'timestamp': datetime.now().isoformat(),
                    'count': len(real_time_data),
                    'demo': False,
                    'message': 'Real-time data from Yahoo Finance'
                })
            return jsonify({
                'trending': get_sample_trending_stocks(),
                'timestamp': datetime.now().isoformat(),
                'count': 15,
                'demo': True,
                'message': 'Using sample data (No API keys available)'
            })
        
        # Fetch trending stocks from Indian Stock API
        conn = http.client.HTTPSConnection('stock.indianapi.in')
        headers = {'x-api-key': api_key}
        
        conn.request('GET', '/trending', headers=headers)
        res = conn.getresponse()
        data = res.read()
        data_str = data.decode('utf-8')
        
        # Check for rate limit error
        if res.status != 200 or 'limit exceeded' in data_str.lower() or 'rate limit' in data_str.lower():
            print(f"Trending API error: Status {res.status}, Response: {data_str[:200]}")
            print("Fetching real-time prices from Yahoo Finance...")
            # Fetch real-time data from yfinance
            real_time_data = get_real_time_prices_yfinance()
            if real_time_data:
                return jsonify({
                    'trending': real_time_data,
                    'timestamp': datetime.now().isoformat(),
                    'count': len(real_time_data),
                    'demo': False,
                    'message': 'Real-time data from Yahoo Finance'
                })
            else:
                # Final fallback to sample data
                return jsonify({
                    'trending': get_sample_trending_stocks(),
                    'timestamp': datetime.now().isoformat(),
                    'count': 15,
                    'demo': True,
                    'message': 'Using sample data (API rate limit reached)'
                })
        
        trending_stocks = json.loads(data_str)

        # Normalize response shape to a list
        trending_list = []
        if isinstance(trending_stocks, dict):
            # Handle structure like {"trending_stocks": {"top_gainers": [...], "top_losers": [...]}}
            if 'trending_stocks' in trending_stocks and isinstance(trending_stocks['trending_stocks'], dict):
                ts = trending_stocks['trending_stocks']
                top_gainers = ts.get('top_gainers', []) if isinstance(ts.get('top_gainers'), list) else []
                top_losers = ts.get('top_losers', []) if isinstance(ts.get('top_losers'), list) else []
                trending_list = top_gainers + top_losers
            else:
                # Common keys that may contain the list directly
                for key in ['data', 'trending', 'results', 'items', 'stocks', 'top_gainers', 'top_losers']:
                    if key in trending_stocks and isinstance(trending_stocks[key], list):
                        trending_list.extend(trending_stocks[key])
                if not trending_list:
                    # Fallback: take first list value in dict
                    first_list = next((v for v in trending_stocks.values() if isinstance(v, list)), [])
                    trending_list = first_list
        elif isinstance(trending_stocks, list):
            trending_list = trending_stocks
        else:
            print(f"Unexpected trending data type: {type(trending_stocks)}")
            trending_list = []
        
        # Get quick sentiment for each trending stock (lightweight: use recent news only)
        results = []
        for stock in trending_list[:15]:  # Limit to top 15
            try:
                # Normalize field names from different possible shapes
                # Note: Indian Stock API returns 'ric' field with exchange ticker (e.g., BAJE.NS)
                ticker = stock.get('ric') or stock.get('symbol') or stock.get('ticker') or stock.get('code') or ''
                if not ticker:
                    continue
                
                # Normalize numbers possibly provided as strings
                def _to_float(x, default=0.0):
                    try:
                        if isinstance(x, (int, float)):
                            return float(x)
                        if isinstance(x, str):
                            return float(x.replace(',', '').strip())
                    except Exception:
                        return float(default)
                    return float(default)

                # Quick sentiment based on price movement (no heavy ML inference for trending)
                # This makes the endpoint fast - detailed sentiment available via /api/analyze
                change_pct = _to_float(stock.get('changePercent') or stock.get('%Change') or stock.get('percentChange') or stock.get('percent_change') or 0)
                
                # Map price change to sentiment (-100 to 100)
                # Large gains = bullish, large losses = bearish
                avg_sentiment = min(100, max(-100, change_pct * 10))  # Scale: ±10% change = ±100 sentiment
                confidence = min(95, 50 + abs(change_pct) * 3)  # Higher change = higher confidence
                
                # Determine label
                if avg_sentiment > 30:
                    label = 'Bullish'
                elif avg_sentiment < -30:
                    label = 'Bearish'
                else:
                    label = 'Neutral'
                
                results.append({
                    'ticker': ticker,
                    'name': stock.get('company_name') or stock.get('name') or stock.get('companyName') or ticker,
                    'price': _to_float(stock.get('price') or stock.get('ltp') or stock.get('LTP') or 0),
                    'change': _to_float(stock.get('net_change') or stock.get('change') or stock.get('netChange') or 0),
                    'changePercent': _to_float(stock.get('percent_change') or stock.get('changePercent') or stock.get('%Change') or stock.get('percentChange') or 0),
                    'sentiment': round(avg_sentiment, 1),
                    'sentimentLabel': label,
                    'articleCount': 0,  # Not fetching articles for trending (use /api/analyze for detailed sentiment)
                    'confidence': round(confidence, 1)
                })
                
            except Exception as stock_error:
                print(f"Error processing trending stock {stock.get('ric', 'unknown')}: {stock_error}")
                continue
        
        return jsonify({
            'trending': results,
            'timestamp': datetime.now().isoformat(),
            'count': len(results)
        })
        
    except Exception as e:
        print(f"Trending endpoint error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
