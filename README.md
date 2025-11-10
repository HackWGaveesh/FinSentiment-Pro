# FinSentiment Pro - AI-Powered Financial Sentiment Analysis

A premium, production-ready Financial Sentiment Analysis web application with real-time multi-dimensional sentiment tracking for stock market intelligence.

## 🚀 Features

- **Multi-Model AI**: FinBERT sentiment analysis + emotion detection
- **Voice Input**: Speak stock tickers using Web Speech API
- **Real-Time Data**: Live news from News API and stock prices from Yahoo Finance
- **Interactive Dashboards**: 
  - Overall Sentiment Gauge
  - Timeline Charts (Sentiment + Price correlation)
  - Multi-dimensional Radar Charts
  - Source Comparison
  - Calendar Heatmap
  - Correlation Scatter Plots
  - AI-Generated Insights
- **Dark/Light Theme**: Smooth theme transitions with localStorage persistence
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance Optimized**: Lazy loading, code splitting, memoization

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

## 🛠️ Installation

### 1. Install Frontend Dependencies

```powershell
npm install
```

### 2. Install Backend Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

The backend uses:
- **FinBERT** for financial sentiment analysis
- **yfinance** for stock price data
- **News API** for real-time news articles
- **Transformers** for emotion detection

## 🔑 API Keys Setup

To use this application, you'll need to obtain free API keys from:

1. **News API** - Get your free key at https://newsapi.org/
2. **Alpha Vantage** - Get your free key at https://www.alphavantage.co/support/#api-key
3. **Hugging Face** - Get your token at https://huggingface.co/settings/tokens
4. **Indian Stock API** - Get your key at https://indianapi.in/

### Setup Instructions

1. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit the `.env` file and add your API keys:
   ```env
   NEWS_API_KEY=your_newsapi_key_here
   ALPHA_VANTAGE_KEY=your_alphavantage_key_here
   HF_API_KEY=your_huggingface_key_here
   INDIAN_STOCK_API_KEY=your_indian_stock_api_key_here
   ```

**Note**: The `.env` file is gitignored and will not be committed to the repository for security.

## 🚀 Running the Application

### Option 1: Manual Start

**Terminal 1 - Start Backend:**
```powershell
cd backend
python app.py
```

The backend will start on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```powershell
npm run dev
```

The frontend will start on `http://localhost:3000`

### Option 2: Quick Start (Single Command)

```powershell
# Windows PowerShell
.\start.ps1
```

Or use the start script from package.json:
```powershell
npm start
```

## 📱 Usage

1. **Enter a Stock Ticker**: Type a ticker symbol (e.g., AAPL, TSLA, GOOGL) or use voice input
2. **Select Time Period**: Choose 24 Hours, 7 Days, or 30 Days
3. **Click Analyze**: The app will fetch news and perform sentiment analysis
4. **Explore Results**:
   - View overall sentiment score
   - Analyze sentiment trends over time
   - Compare different news sources
   - Read AI-generated insights
   - Export reports

## ⌨️ Keyboard Shortcuts

- `/` - Focus search input
- `D` - Toggle dark/light mode
- `V` - Activate voice input
- `Esc` - Close modals

## 🎨 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for charts and graphs
- **Lucide React** for icons
- **Zustand** for state management
- **Axios** for API calls

### Backend
- **Flask** for REST API
- **FinBERT** (ProsusAI/finbert) for financial sentiment
- **Transformers** for emotion detection
- **yfinance** for stock data
- **News API** for news articles
- **NumPy** for data processing

## 📊 API Endpoints

### `POST /api/analyze`

Analyze sentiment for a stock ticker.

**Request:**
```json
{
  "ticker": "AAPL",
  "days": 7
}
```

**Response:**
```json
{
  "ticker": "AAPL",
  "companyName": "Apple Inc.",
  "overallScore": 67.5,
  "confidence": 89,
  "totalArticles": 247,
  "timeline": [...],
  "dimensions": {...},
  "sourceBreakdown": [...],
  "headlines": [...],
  "insights": {...}
}
```

### `GET /api/health`

Health check endpoint.

## 🏗️ Project Structure

```
nlp/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Footer.tsx
│   │   └── dashboard/
│   │       ├── SearchSection.tsx
│   │       ├── OverallSentimentGauge.tsx
│   │       ├── TimelineChart.tsx
│   │       ├── RadarChart.tsx
│   │       ├── SourceComparison.tsx
│   │       ├── HeadlinesFeed.tsx
│   │       ├── CalendarHeatmap.tsx
│   │       ├── AIInsights.tsx
│   │       ├── ExportPanel.tsx
│   │       └── CorrelationScatter.tsx
│   ├── store/
│   │   └── useStore.ts     # Zustand state management
│   ├── types/
│   │   └── index.ts        # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 Features Breakdown

### Sentiment Analysis
- Real-time sentiment scoring (-100 to +100)
- Multi-dimensional analysis (6 metrics)
- Confidence levels for each prediction
- Emotion detection (joy, fear, anger, surprise, etc.)

### Data Visualization
- Interactive timeline charts
- Radar charts for multi-dimensional view
- Source comparison bar charts
- Calendar heatmaps
- Correlation scatter plots

### Voice Input
- Uses Web Speech API
- Real-time transcription
- Ticker confirmation dialog

### AI Insights
- Automated trend analysis
- Correlation calculations
- Volatility assessment
- Key topics extraction
- Prediction indicators

## 🔧 Troubleshooting

### Backend Issues

**Problem**: `Module not found` errors
```powershell
cd backend
pip install -r requirements.txt --upgrade
```

**Problem**: FinBERT model download is slow
- The first run will download the FinBERT model (~450MB)
- Subsequent runs will use the cached model
- Ensure stable internet connection

### Frontend Issues

**Problem**: Dependencies not installed
```powershell
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Port 3000 already in use
- Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001, // Use different port
}
```

### Voice Input Issues

**Problem**: Voice input not working
- Ensure you're using Chrome, Edge, or Safari
- Allow microphone permissions
- Check browser console for errors

## 🎓 Academic Project

This project was created for **NLP Academic Evaluation** and demonstrates:

1. **Natural Language Processing**:
   - Sentiment analysis using FinBERT
   - Emotion classification
   - Text preprocessing

2. **Machine Learning**:
   - Transfer learning with pre-trained models
   - Multi-class classification
   - Confidence scoring

3. **Data Visualization**:
   - Interactive charts
   - Real-time updates
   - Responsive design

4. **Full-Stack Development**:
   - RESTful API design
   - State management
   - Performance optimization

## 📝 License

Created for academic purposes. All rights reserved.

## 🙏 Acknowledgments

- **ProsusAI** for FinBERT model
- **Hugging Face** for Transformers library
- **News API** for news data
- **Yahoo Finance** for stock data

## 📧 Contact

For questions or issues, please contact the development team.

---

**Made with ❤️ and AI**

*FinSentiment Pro - Empowering financial decisions with AI-powered sentiment analysis*
