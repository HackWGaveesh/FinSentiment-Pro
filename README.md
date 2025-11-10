# 🚀 FinSentiment Pro - AI-Powered Stock Market Sentiment Analysis# FinSentiment Pro - AI-Powered Financial Sentiment Analysis



<div align="center">A premium, production-ready Financial Sentiment Analysis web application with real-time multi-dimensional sentiment tracking for stock market intelligence.



![FinSentiment Pro](https://img.shields.io/badge/FinSentiment-Pro-6366F1?style=for-the-badge)## 🚀 Features

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)- **Multi-Model AI**: FinBERT sentiment analysis + emotion detection

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python)- **Voice Input**: Speak stock tickers using Web Speech API

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)- **Real-Time Data**: Live news from News API and stock prices from Yahoo Finance

- **Interactive Dashboards**: 

**Real-time AI-powered sentiment analysis platform for Indian stocks using FinBERT NLP and advanced visualization**  - Overall Sentiment Gauge

  - Timeline Charts (Sentiment + Price correlation)

[🌐 Live Demo](#) | [📖 Documentation](#features) | [🐛 Report Bug](https://github.com/HackWGaveesh/FinSentiment-Pro/issues) | [✨ Request Feature](https://github.com/HackWGaveesh/FinSentiment-Pro/issues)  - Multi-dimensional Radar Charts

  - Source Comparison

</div>  - Calendar Heatmap

  - Correlation Scatter Plots

---  - AI-Generated Insights

- **Dark/Light Theme**: Smooth theme transitions with localStorage persistence

## 📋 Table of Contents- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

- **Accessibility**: WCAG 2.1 AA compliant

- [Overview](#-overview)- **Performance Optimized**: Lazy loading, code splitting, memoization

- [Features](#-features)

- [Tech Stack](#-tech-stack)## 📋 Prerequisites

- [Installation](#-installation)

- [Configuration](#-configuration)- **Node.js** (v18 or higher)

- [Usage](#-usage)- **Python** (v3.8 or higher)

- [API Endpoints](#-api-endpoints)- **pip** (Python package manager)

- [Project Structure](#-project-structure)

- [Contributing](#-contributing)## 🛠️ Installation

- [License](#-license)

### 1. Install Frontend Dependencies

---

```powershell

## 🌟 Overviewnpm install

```

**FinSentiment Pro** is a comprehensive stock market sentiment analysis platform that leverages cutting-edge AI/ML models to provide real-time insights into market sentiment for Indian stocks. Built with React, TypeScript, and Python Flask, it combines powerful natural language processing (FinBERT) with beautiful, interactive visualizations.

### 2. Install Backend Dependencies

### Key Highlights

```powershell

- 🤖 **Advanced NLP**: FinBERT model fine-tuned for financial sentiment analysiscd backend

- 📊 **Real-time Data**: Live trending stocks from NSE with sentiment indicatorspip install -r requirements.txt

- 🎯 **Multi-dimensional Analysis**: Sentiment, emotion, confidence, and correlation metrics```

- 📈 **Interactive Charts**: Timeline, radar, heatmap, scatter, and gauge visualizations

- 🎨 **Premium UI/UX**: Modern glass-morphism design with dark mode supportThe backend uses:

- 🔍 **Smart Search**: Auto-complete stock ticker search with voice input- **FinBERT** for financial sentiment analysis

- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices- **yfinance** for stock price data

- **News API** for real-time news articles

---- **Transformers** for emotion detection



## ✨ Features## 🔑 API Keys Setup



### 🎯 Core FunctionalityTo use this application, you'll need to obtain free API keys from:



| Feature | Description |1. **News API** - Get your free key at https://newsapi.org/

|---------|-------------|2. **Alpha Vantage** - Get your free key at https://www.alphavantage.co/support/#api-key

| **Sentiment Analysis** | FinBERT-powered sentiment scoring (-100 to +100) with confidence levels |3. **Hugging Face** - Get your token at https://huggingface.co/settings/tokens

| **Emotion Detection** | Multi-label emotion classification (joy, fear, anger, surprise, etc.) |4. **Indian Stock API** - Get your key at https://indianapi.in/

| **Trending Stocks** | Real-time top gainers/losers with AI sentiment overlay |

| **News Aggregation** | Latest headlines from multiple sources with sentiment tagging |### Setup Instructions

| **Price Correlation** | Sentiment vs. price movement correlation analysis |

| **Historical Tracking** | Calendar heatmap of sentiment trends over time |1. Copy the example environment file:

   ```bash

### 📊 Visualizations   cd backend

   cp .env.example .env

- **Overall Sentiment Gauge**: Animated circular gauge with color-coded sentiment ranges   ```

- **Timeline Chart**: Dual-axis chart showing sentiment and price movement correlation

- **Radar Chart**: Multi-dimensional sentiment breakdown across news sources2. Edit the `.env` file and add your API keys:

- **Source Comparison**: Sentiment distribution by news provider   ```env

- **Calendar Heatmap**: Monthly sentiment intensity visualization   NEWS_API_KEY=your_newsapi_key_here

- **Correlation Scatter**: Sentiment score vs. price change analysis   ALPHA_VANTAGE_KEY=your_alphavantage_key_here

   HF_API_KEY=your_huggingface_key_here

### 🎨 User Experience   INDIAN_STOCK_API_KEY=your_indian_stock_api_key_here

   ```

- ⚡ **Lightning Fast**: Optimized performance with lazy loading and code splitting

- 🌓 **Dark/Light Theme**: Smooth theme transitions with localStorage persistence**Note**: The `.env` file is gitignored and will not be committed to the repository for security.

- 🎙️ **Voice Input**: Speak stock tickers using Web Speech API

- 🔔 **Real-time Updates**: Manual refresh for trending stocks## 🚀 Running the Application

- 🎛️ **Filters & Sorting**: Filter by Bullish/Bearish/Neutral, sort by sentiment/change

- 📤 **Export Ready**: Download analysis reports (implementation ready)### Option 1: Manual Start



---**Terminal 1 - Start Backend:**

```powershell

## 🛠️ Tech Stackcd backend

python app.py

### Frontend```



| Technology | Version | Purpose |The backend will start on `http://localhost:5000`

|------------|---------|---------|

| **React** | 18.3.1 | UI framework |**Terminal 2 - Start Frontend:**

| **TypeScript** | 5.5.3 | Type-safe development |```powershell

| **Vite** | 5.4.2 | Build tool and dev server |npm run dev

| **Tailwind CSS** | 3.4.1 | Utility-first styling |```

| **Framer Motion** | 11.5.4 | Animation library |

| **Recharts** | 2.12.7 | Data visualization |The frontend will start on `http://localhost:3000`

| **Zustand** | 4.5.5 | State management |

| **Axios** | 1.7.7 | HTTP client |### Option 2: Quick Start (Single Command)



### Backend```powershell

# Windows PowerShell

| Technology | Version | Purpose |.\start.ps1

|------------|---------|---------|```

| **Python** | 3.8+ | Backend runtime |

| **Flask** | 3.0.0 | Web framework |Or use the start script from package.json:

| **FinBERT** | latest | Sentiment analysis model |```powershell

| **Transformers** | 4.36.0 | NLP pipeline |npm start

| **yfinance** | 0.2.36 | Stock data |```

| **NumPy** | 1.24.3 | Numerical computing |

| **TextBlob** | 0.17.1 | Additional NLP utilities |## 📱 Usage



---1. **Enter a Stock Ticker**: Type a ticker symbol (e.g., AAPL, TSLA, GOOGL) or use voice input

2. **Select Time Period**: Choose 24 Hours, 7 Days, or 30 Days

## 🚀 Installation3. **Click Analyze**: The app will fetch news and perform sentiment analysis

4. **Explore Results**:

### Prerequisites   - View overall sentiment score

   - Analyze sentiment trends over time

- **Node.js** 18+ ([Download](https://nodejs.org/))   - Compare different news sources

- **Python** 3.8+ ([Download](https://www.python.org/))   - Read AI-generated insights

- **Git** ([Download](https://git-scm.com/))   - Export reports



### 1️⃣ Clone the Repository## ⌨️ Keyboard Shortcuts



```bash- `/` - Focus search input

git clone https://github.com/HackWGaveesh/FinSentiment-Pro.git- `D` - Toggle dark/light mode

cd FinSentiment-Pro- `V` - Activate voice input

```- `Esc` - Close modals



### 2️⃣ Frontend Setup## 🎨 Tech Stack



```bash### Frontend

# Install dependencies- **React 18** with TypeScript

npm install- **Tailwind CSS** for styling

- **Framer Motion** for animations

# Start development server- **Recharts** for charts and graphs

npm run dev- **Lucide React** for icons

```- **Zustand** for state management

- **Axios** for API calls

The frontend will be available at **http://localhost:3000**

### Backend

### 3️⃣ Backend Setup- **Flask** for REST API

- **FinBERT** (ProsusAI/finbert) for financial sentiment

```bash- **Transformers** for emotion detection

# Navigate to backend directory- **yfinance** for stock data

cd backend- **News API** for news articles

- **NumPy** for data processing

# Create virtual environment (recommended)

python -m venv venv## 📊 API Endpoints

source venv/bin/activate  # On Windows: venv\Scripts\activate

### `POST /api/analyze`

# Install dependencies

pip install -r requirements.txtAnalyze sentiment for a stock ticker.



# Start Flask server**Request:**

python app.py```json

```{

  "ticker": "AAPL",

The backend API will be available at **http://localhost:5000**  "days": 7

}

---```



## ⚙️ Configuration**Response:**

```json

### Environment Variables{

  "ticker": "AAPL",

Create a `.env` file in the `backend/` directory:  "companyName": "Apple Inc.",

  "overallScore": 67.5,

```env  "confidence": 89,

# Indian Stock API (for trending stocks)  "totalArticles": 247,

INDIAN_STOCK_API_KEY=your_api_key_here  "timeline": [...],

  "dimensions": {...},

# News API (optional - for enhanced news fetching)  "sourceBreakdown": [...],

NEWS_API_KEY=your_newsapi_key_here  "headlines": [...],

  "insights": {...}

# Alpha Vantage (optional - for additional stock data)}

ALPHA_VANTAGE_KEY=your_alphavantage_key_here```



# Demo Mode (set to 'true' to use sample data)### `GET /api/health`

DEMO_MODE=false

```Health check endpoint.



### API Keys## 🏗️ Project Structure



1. **Indian Stock API**: Get your key from [Indian Stock API](https://stock.indianapi.in/)```

2. **News API** (Optional): Register at [NewsAPI.org](https://newsapi.org/)nlp/

3. **Alpha Vantage** (Optional): Get free key at [Alpha Vantage](https://www.alphavantage.co/)├── backend/

│   ├── app.py              # Flask API server

---│   └── requirements.txt    # Python dependencies

├── src/

## 📖 Usage│   ├── components/

│   │   ├── Header.tsx

### Basic Workflow│   │   ├── Hero.tsx

│   │   ├── Dashboard.tsx

1. **Navigate to Dashboard**: Click "Dashboard" in the header or scroll to the analysis section│   │   ├── Footer.tsx

2. **Search for Stock**: │   │   └── dashboard/

   - Type ticker symbol (e.g., `RELIANCE.NS`, `TCS.NS`, `INFY.NS`)│   │       ├── SearchSection.tsx

   - Or click popular tickers│   │       ├── OverallSentimentGauge.tsx

   - Or use voice input 🎙️│   │       ├── TimelineChart.tsx

3. **Select Time Range**: Choose 24h, 7d, 30d, or 365d│   │       ├── RadarChart.tsx

4. **Click "Analyze Sentiment"**: View comprehensive AI-powered analysis│   │       ├── SourceComparison.tsx

5. **Explore Visualizations**: Interact with charts, filter trends, export data│   │       ├── HeadlinesFeed.tsx

│   │       ├── CalendarHeatmap.tsx

### Popular Indian Stock Tickers│   │       ├── AIInsights.tsx

│   │       ├── ExportPanel.tsx

| Company | Ticker | Sector |│   │       └── CorrelationScatter.tsx

|---------|--------|--------|│   ├── store/

| Reliance Industries | `RELIANCE.NS` | Energy/Telecom |│   │   └── useStore.ts     # Zustand state management

| Tata Consultancy Services | `TCS.NS` | IT Services |│   ├── types/

| HDFC Bank | `HDFCBANK.NS` | Banking |│   │   └── index.ts        # TypeScript types

| Infosys | `INFY.NS` | IT Services |│   ├── App.tsx

| ICICI Bank | `ICICIBANK.NS` | Banking |│   ├── main.tsx

| Hindustan Unilever | `HINDUNILVR.NS` | FMCG |│   └── index.css

| Bharti Airtel | `BHARTIARTL.NS` | Telecom |├── package.json

| State Bank of India | `SBIN.NS` | Banking |├── tsconfig.json

├── vite.config.ts

### Trending Stocks├── tailwind.config.js

└── README.md

- Navigate to the **Trending Stocks** section (after hero section)```

- Filter by sentiment: **All / Bullish / Bearish / Neutral**

- Sort by: **Sentiment / Change % / Confidence**## 🎯 Features Breakdown

- Click any stock card to instantly analyze it

### Sentiment Analysis

---- Real-time sentiment scoring (-100 to +100)

- Multi-dimensional analysis (6 metrics)

## 🔌 API Endpoints- Confidence levels for each prediction

- Emotion detection (joy, fear, anger, surprise, etc.)

### Backend Endpoints

### Data Visualization

| Method | Endpoint | Description |- Interactive timeline charts

|--------|----------|-------------|- Radar charts for multi-dimensional view

| `GET` | `/api/health` | Health check - returns model status |- Source comparison bar charts

| `GET` | `/api/search?q={query}` | Search stock tickers with autocomplete |- Calendar heatmaps

| `POST` | `/api/analyze` | Analyze sentiment for a stock |- Correlation scatter plots

| `GET` | `/api/trending` | Get trending stocks with sentiment |

### Voice Input

### Request/Response Examples- Uses Web Speech API

- Real-time transcription

#### Analyze Stock- Ticker confirmation dialog



**Request:**### AI Insights

```bash- Automated trend analysis

POST /api/analyze- Correlation calculations

Content-Type: application/json- Volatility assessment

- Key topics extraction

{- Prediction indicators

  "ticker": "RELIANCE.NS",

  "days": 7## 🔧 Troubleshooting

}

```### Backend Issues



**Response:****Problem**: `Module not found` errors

```json```powershell

{cd backend

  "ticker": "RELIANCE.NS",pip install -r requirements.txt --upgrade

  "overallSentiment": 45.2,```

  "sentimentLabel": "Bullish",

  "confidence": 82.5,**Problem**: FinBERT model download is slow

  "articles": [- The first run will download the FinBERT model (~450MB)

    {- Subsequent runs will use the cached model

      "title": "Reliance announces new green energy...",- Ensure stable internet connection

      "sentiment": 78.3,

      "source": "Economic Times",### Frontend Issues

      "publishedAt": "2025-11-10T12:00:00Z"

    }**Problem**: Dependencies not installed

  ],```powershell

  "emotions": {rm -rf node_modules package-lock.json

    "joy": 0.65,npm install

    "fear": 0.12,```

    "surprise": 0.23

  },**Problem**: Port 3000 already in use

  "timeline": [...],- Change port in `vite.config.ts`:

  "insights": "Strong bullish sentiment detected..."```typescript

}server: {

```  port: 3001, // Use different port

}

#### Get Trending Stocks```



**Request:**### Voice Input Issues

```bash

GET /api/trending**Problem**: Voice input not working

```- Ensure you're using Chrome, Edge, or Safari

- Allow microphone permissions

**Response:**- Check browser console for errors

```json

{## 🎓 Academic Project

  "trending": [

    {This project was created for **NLP Academic Evaluation** and demonstrates:

      "ticker": "TATAMOTORS.NS",

      "name": "Tata Motors Ltd",1. **Natural Language Processing**:

      "price": 734.20,   - Sentiment analysis using FinBERT

      "change": 56.80,   - Emotion classification

      "changePercent": 8.39,   - Text preprocessing

      "sentiment": 83.9,

      "sentimentLabel": "Bullish",2. **Machine Learning**:

      "confidence": 75.2   - Transfer learning with pre-trained models

    }   - Multi-class classification

  ],   - Confidence scoring

  "count": 15,

  "timestamp": "2025-11-11T01:54:26.931840"3. **Data Visualization**:

}   - Interactive charts

```   - Real-time updates

   - Responsive design

---

4. **Full-Stack Development**:

## 📁 Project Structure   - RESTful API design

   - State management

```   - Performance optimization

FinSentiment-Pro/

├── backend/## 📝 License

│   ├── app.py                 # Flask application

│   ├── requirements.txt       # Python dependenciesCreated for academic purposes. All rights reserved.

│   ├── stock_database.json    # Stock ticker database

│   └── .env                   # Environment variables (create this)## 🙏 Acknowledgments

├── src/

│   ├── components/- **ProsusAI** for FinBERT model

│   │   ├── Header.tsx         # Navigation with scroll effects- **Hugging Face** for Transformers library

│   │   ├── Hero.tsx           # Landing section with quick search- **News API** for news data

│   │   ├── Features.tsx       # Feature showcase- **Yahoo Finance** for stock data

│   │   ├── Dashboard.tsx      # Main analysis dashboard

│   │   ├── TrendingStocks.tsx # Trending stocks with filters## 📧 Contact

│   │   ├── About.tsx          # About section

│   │   ├── Contact.tsx        # Contact formFor questions or issues, please contact the development team.

│   │   ├── Footer.tsx         # Footer component

│   │   └── dashboard/---

│   │       ├── SearchSection.tsx

│   │       ├── OverallSentimentGauge.tsx**Made with ❤️ and AI**

│   │       ├── TimelineChart.tsx

│   │       ├── RadarChart.tsx*FinSentiment Pro - Empowering financial decisions with AI-powered sentiment analysis*

│   │       ├── SourceComparison.tsx
│   │       ├── CalendarHeatmap.tsx
│   │       ├── CorrelationScatter.tsx
│   │       ├── HeadlinesFeed.tsx
│   │       ├── AIInsights.tsx
│   │       └── ExportPanel.tsx
│   ├── store/
│   │   └── useStore.ts        # Zustand global state
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles + Tailwind
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Node dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style (Prettier + ESLint configured)
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation if needed

---

## 🐛 Known Issues & Limitations

- **API Rate Limits**: Indian Stock API has request limits (fallback to sample data implemented)
- **Historical Data**: Limited to yfinance availability for Indian stocks
- **News Coverage**: Best results with large-cap stocks (more news articles)
- **Model Loading**: FinBERT model takes ~10 seconds to load on first backend start

---

## 🔮 Future Enhancements

- [ ] User authentication and watchlists
- [ ] Email/SMS alerts for sentiment changes
- [ ] Portfolio tracking with sentiment overlay
- [ ] Comparative analysis (multiple stocks)
- [ ] Machine learning predictions based on sentiment trends
- [ ] Mobile app (React Native)
- [ ] Real-time WebSocket updates
- [ ] Social media sentiment integration (Twitter/Reddit)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Gaveesh**
- GitHub: [@HackWGaveesh](https://github.com/HackWGaveesh)
- Project: [FinSentiment-Pro](https://github.com/HackWGaveesh/FinSentiment-Pro)

---

## 🙏 Acknowledgments

- **FinBERT** by ProsusAI for financial sentiment analysis
- **Yahoo Finance** for stock price data
- **Indian Stock API** for trending stocks
- **News API** for news aggregation
- **Recharts** for beautiful data visualizations
- **Tailwind CSS** for rapid UI development
- **Framer Motion** for smooth animations

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 [Report a Bug](https://github.com/HackWGaveesh/FinSentiment-Pro/issues)
- 💡 [Request a Feature](https://github.com/HackWGaveesh/FinSentiment-Pro/issues)
- 📧 Contact via GitHub

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ using React, TypeScript, Python, and AI**

</div>
