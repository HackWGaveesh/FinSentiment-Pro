# Yahoo Finance Rate Limiting - Troubleshooting Guide

## Problem
You're seeing "No data found for [TICKER]" errors. This is caused by **Yahoo Finance API rate limiting** (HTTP 429 errors).

## Why This Happens
- Yahoo Finance limits the number of requests per IP address
- Too many rapid requests trigger rate limiting
- The limit resets after a few minutes to hours

## Solutions

### 1. Wait and Retry (Recommended)
The simplest solution is to wait 5-15 minutes before trying again. Yahoo Finance typically resets the rate limit after a short period.

### 2. Try Different Tickers
Some tickers work better than others. Try these popular US tickers that typically have good availability:

**US Stocks (Usually Work Better):**
- AAPL (Apple)
- MSFT (Microsoft) 
- GOOGL (Google/Alphabet)
- AMZN (Amazon)
- TSLA (Tesla)
- NVDA (Nvidia)
- META (Meta/Facebook)

**Note:** Indian NSE tickers (*.NS) sometimes have less reliable data availability.

### 3. Use the Implemented Caching
The app now includes:
- **5-minute cache** for stock data
- **Automatic retry** with exponential backoff (3 attempts)
- **Better error messages** explaining the issue

### 4. Check Backend Logs
```bash
tail -f /tmp/flask_backend.log
```

Look for:
- `429 Too Many Requests` - Rate limiting
- `Using cached data for [TICKER]` - Cache hit (good!)
- `Successfully fetched data for [TICKER]` - API call succeeded

### 5. Alternative: Use Mock Data (Development)
For development/testing, you can temporarily use mock data instead of live API calls.

## What Was Fixed

### Backend Improvements (app.py)
1. ✅ **Caching System**
   - 5-minute cache for stock data
   - Reduces API calls significantly
   - Automatic cache invalidation

2. ✅ **Retry Logic**
   - 3 automatic retries with exponential backoff
   - Starts with 2-second delay
   - Doubles delay each retry (2s → 4s → 8s)

3. ✅ **Better Error Messages**
   - Explains why the error occurred
   - Suggests solutions
   - More user-friendly

4. ✅ **Period-based Queries**
   - Uses `period="7d"` instead of start/end dates
   - More compatible with Yahoo Finance API
   - Reduces API complexity

### Code Changes
```python
# Before (no retry, no cache)
def get_stock_data(ticker, days=30):
    stock = yf.Ticker(ticker)
    hist = stock.history(start=start_date, end=end_date)
    # Single attempt, fails on any error

# After (with retry + cache)
def get_stock_data(ticker, days=30):
    # Check cache first
    if cache_hit: return cached_data
    
    # Retry up to 3 times with backoff
    for attempt in range(3):
        try:
            hist = stock.history(period="7d")
            # Cache the result
            # Return data
        except:
            # Wait and retry
```

## How to Test

### 1. Test Search (Should Always Work)
```bash
# Search is not rate-limited
curl "http://localhost:5000/api/search?q=Apple&limit=3"
# ✅ Should return results instantly
```

### 2. Test Health Check
```bash
curl "http://localhost:5000/api/health"
# ✅ Should return: {"status":"healthy","model":"FinBERT loaded"}
```

### 3. Test Stock Analysis (May Hit Rate Limit)
```bash
# Try a popular US ticker
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"ticker":"MSFT","days":7}'
```

If you get a 404 error, wait 10-15 minutes and try again.

### 4. Monitor Cache Usage
```bash
# Watch the backend logs
tail -f /tmp/flask_backend.log | grep -E "(cache|retry|attempt)"
```

You should see:
- First request: `Fetching stock data for MSFT (attempt 1/3)`
- Second request (within 5 min): `Using cached data for MSFT`

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Backend | ✅ Running | Port 5000, with caching enabled |
| Frontend | ✅ Running | Port 3000 |
| Search API | ✅ Working | Not affected by rate limiting |
| Stock Analysis | ⚠️ Limited | Subject to Yahoo Finance rate limits |
| Caching | ✅ Active | 5-minute cache duration |
| Retry Logic | ✅ Active | 3 attempts with backoff |

## Recommendations

### For Development
1. **Use the search feature** to find valid tickers
2. **Test with different tickers** if one fails
3. **Wait between tests** to avoid rate limiting
4. **Check cache logs** to see if data is being reused

### For Production
Consider these alternatives to avoid rate limiting:
1. **Increase cache duration** (e.g., 15-30 minutes)
2. **Use a proxy service** to rotate IPs
3. **Implement a request queue** with rate limiting on your side
4. **Consider paid Yahoo Finance alternatives** (Alpha Vantage, IEX Cloud, etc.)
5. **Add user-based rate limiting** to protect the backend

## Common Error Messages

### "429 Too Many Requests"
**Meaning:** Yahoo Finance blocked your IP temporarily  
**Solution:** Wait 10-15 minutes, then try again

### "No price data found, symbol may be delisted"
**Meaning:** No trading data available for this ticker  
**Solution:** Try a different ticker or check if the symbol is correct

### "No timezone found, symbol may be delisted"  
**Meaning:** Ticker format might be incorrect or data unavailable  
**Solution:** Verify ticker symbol (use search feature)

## Quick Fix Commands

```bash
# Restart backend (clears cache, fresh start)
pkill -f "python.*app.py"
cd /home/BTECH_7TH_SEM/Downloads/nlp/backend
nohup /home/BTECH_7TH_SEM/Downloads/nlp/.venv/bin/python app.py > /tmp/flask_backend.log 2>&1 &

# Check if backend is healthy
sleep 10 && curl http://localhost:5000/api/health

# Test search (always works)
curl "http://localhost:5000/api/search?q=Microsoft&limit=3"

# View live logs
tail -f /tmp/flask_backend.log
```

## Summary

The Yahoo Finance rate limiting is a **temporary external issue**, not a bug in your application. The improvements I made:

✅ Reduce API calls with caching  
✅ Automatically retry failed requests  
✅ Provide better error messages  
✅ Use more compatible API methods  

**The search feature always works** because it uses the local database and doesn't call Yahoo Finance.

**For immediate testing**, try these tickers in order:
1. MSFT (Microsoft)
2. GOOGL (Google)
3. NVDA (Nvidia)

If all fail, wait 15 minutes and try again. The rate limit will reset automatically.
