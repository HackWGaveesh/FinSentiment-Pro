<div align="center">

# 📈 FinSentiment Pro

### AI-Powered Financial Sentiment Analysis Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6.svg)](https://www.typescriptlang.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-000000.svg)](https://flask.palletsprojects.com/)

**Real-time AI-powered sentiment analysis for stock market insights using FinBERT NLP and advanced visualization**

[🚀 Live Demo](#) • [📖 Documentation](#-features) • [🐛 Report Bug](https://github.com/HackWGaveesh/FinSentiment-Pro/issues) • [✨ Request Feature](https://github.com/HackWGaveesh/FinSentiment-Pro/issues)

![FinSentiment Pro Banner](https://via.placeholder.com/1200x400/1a1a2e/eaeaea?text=FinSentiment+Pro)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**FinSentiment Pro** is a comprehensive stock market sentiment analysis platform that leverages cutting-edge AI/ML models to provide real-time insights into market sentiment for stocks. Built with React, TypeScript, and Python Flask, it combines powerful natural language processing (FinBERT) with beautiful, interactive visualizations.

### Why FinSentiment Pro?

- 🤖 **State-of-the-Art NLP**: Utilizes FinBERT, a model fine-tuned specifically for financial sentiment analysis
- 📊 **Real-Time Intelligence**: Live trending stocks and news sentiment with instant analysis
- 🎯 **Multi-Dimensional Insights**: Comprehensive analysis covering sentiment, emotions, confidence, and price correlations
- 📈 **Professional Visualizations**: Interactive charts including timelines, radar plots, heatmaps, and scatter diagrams
- 🎨 **Premium UX**: Modern glass-morphism design with seamless dark/light mode transitions
- 🎙️ **Voice-Enabled**: Smart search with voice input using Web Speech API
- 📱 **Fully Responsive**: Optimized experience across desktop, tablet, and mobile devices

---

## ✨ Key Features

### 🎯 Core Capabilities

| Feature | Description |
|---------|-------------|
| **FinBERT Sentiment Analysis** | Advanced AI scoring from -100 to +100 with confidence levels |
| **Emotion Detection** | Multi-label classification (joy, fear, anger, surprise, sadness) |
| **Trending Stocks** | Real-time top gainers/losers with AI sentiment overlay |
| **News Aggregation** | Latest financial headlines from multiple sources with sentiment tagging |
| **Price Correlation** | Intelligent analysis of sentiment vs. price movement correlation |
| **Historical Tracking** | Calendar heatmap visualization of sentiment trends over time |

### 📊 Advanced Visualizations

- **📍 Overall Sentiment Gauge**: Animated circular gauge with color-coded sentiment ranges
- **📈 Timeline Chart**: Dual-axis visualization showing sentiment and price movement correlation
- **🎯 Radar Chart**: Multi-dimensional sentiment breakdown across news sources
- **📊 Source Comparison**: Sentiment distribution by news provider
- **🗓️ Calendar Heatmap**: Monthly sentiment intensity visualization
- **🔵 Correlation Scatter**: Sentiment score vs. price change analysis

### 🎨 User Experience Excellence

- ⚡ **Lightning Fast**: Optimized with lazy loading, code splitting, and memoization
- 🌓 **Theme Switching**: Smooth dark/light mode transitions with localStorage persistence
- 🎙️ **Voice Input**: Hands-free ticker search using Web Speech API
- 🔔 **Real-Time Updates**: Instant refresh for trending stocks and sentiment data
- 🎛️ **Smart Filters**: Filter by Bullish/Bearish/Neutral, sort by various metrics
- ♿ **Accessibility**: WCAG 2.1 AA compliant for inclusive user experience
- 📤 **Export Ready**: Download analysis reports and charts

---

## 🛠️ Tech Stack

### Frontend Architecture

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework for building interactive interfaces |
| **TypeScript** | 5.5.3 | Type-safe development and better IDE support |
| **Vite** | 5.4.2 | Next-generation build tool and dev server |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework |
| **Framer Motion** | 11.5.4 | Production-ready animation library |
| **Recharts** | 2.12.7 | Composable charting library built on React |
| **Zustand** | 4.5.5 | Lightweight state management solution |
| **Axios** | 1.7.7 | Promise-based HTTP client |
| **Lucide React** | latest | Beautiful & consistent icon toolkit |

### Backend Infrastructure

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.8+ | Backend runtime environment |
| **Flask** | 3.0.0 | Micro web framework for Python |
| **FinBERT** | latest | Financial sentiment analysis model (ProsusAI) |
| **Transformers** | 4.36.0 | Hugging Face NLP pipeline |
| **yfinance** | 0.2.36 | Yahoo Finance market data downloader |
| **NumPy** | 1.24.3 | Numerical computing library |
| **Pandas** | latest | Data manipulation and analysis |
| **Flask-CORS** | latest | Cross-Origin Resource Sharing handling |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **pip** (Python package manager) - Usually comes with Python
- **Git** (for cloning the repository) - [Download](https://git-scm.com/)

### System Requirements

- **RAM**: Minimum 4GB (8GB recommended for smooth model loading)
- **Storage**: ~2GB free space (for dependencies and AI models)
- **Internet**: Required for API calls and initial model download

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/HackWGaveesh/FinSentiment-Pro.git
cd FinSentiment-Pro
```

### Step 2: Frontend Setup

```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at **http://localhost:3000**

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

The backend API will be available at **http://localhost:5000**

### Quick Start (Single Command)

For Windows PowerShell users:

```powershell
# Run the automated start script
.\start.ps1

# Or use npm start
npm start
```

---

## ⚙️ Configuration

### API Keys Setup

To use FinSentiment Pro, you'll need to obtain free API keys from the following services:

1. **News API** - [Get your free key](https://newsapi.org/)
   - Provides real-time news articles
   - Free tier: 100 requests/day

2. **Alpha Vantage** - [Get your free key](https://www.alphavantage.co/support/#api-key)
   - Stock market data provider
   - Free tier: 500 requests/day

3. **Hugging Face** - [Get your token](https://huggingface.co/settings/tokens)
   - Access to transformer models
   - Free for public models

4. **Indian Stock API** - [Get your key](https://indianapi.in/)
   - Trending stocks data for Indian markets
   - Pricing varies

### Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
# Navigate to backend folder
cd backend

# Copy example environment file
cp .env.example .env
```

Edit the `.env` file with your API keys:

```env
# News API Configuration
NEWS_API_KEY=your_newsapi_key_here

# Alpha Vantage Configuration
ALPHA_VANTAGE_KEY=your_alphavantage_key_here

# Hugging Face Configuration
HF_API_KEY=your_huggingface_token_here

# Indian Stock API Configuration
INDIAN_STOCK_API_KEY=your_indian_stock_api_key_here

# Optional: Demo Mode (uses sample data)
DEMO_MODE=false

# Optional: Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=true
```

> ⚠️ **Security Note**: The `.env` file is gitignored and will never be committed to the repository. Never share your API keys publicly.

---

## 📖 Usage

### Basic Workflow

1. **Navigate to Dashboard**
   - Click "Dashboard" in the header navigation
   - Or scroll to the analysis section on the homepage

2. **Search for a Stock**
   - Type ticker symbol (e.g., `AAPL`, `TSLA`, `GOOGL`)
   - Click popular tickers for quick selection
   - Or use voice input by clicking the microphone icon 🎙️

3. **Select Time Range**
   - Choose from: 24 Hours, 7 Days, 30 Days, or 365 Days
   - Longer ranges provide more historical context

4. **Click "Analyze Sentiment"**
   - Wait for AI processing (typically 3-5 seconds)
   - View comprehensive multi-dimensional analysis

5. **Explore Visualizations**
   - Interact with charts and graphs
   - Filter by sentiment categories
   - Export data for further analysis

### Popular Stock Tickers

#### US Stocks (Recommended)

| Company | Ticker | Sector |
|---------|--------|--------|
| Apple | `AAPL` | Technology |
| Tesla | `TSLA` | Automotive |
| Microsoft | `MSFT` | Technology |
| Google | `GOOGL` | Technology |
| Amazon | `AMZN` | E-commerce |
| NVIDIA | `NVDA` | Semiconductors |
| Meta | `META` | Social Media |

#### Indian Stocks (NSE)

| Company | Ticker | Sector |
|---------|--------|--------|
| Reliance Industries | `RELIANCE.NS` | Energy/Telecom |
| Tata Consultancy | `TCS.NS` | IT Services |
| HDFC Bank | `HDFCBANK.NS` | Banking |
| Infosys | `INFY.NS` | IT Services |
| ICICI Bank | `ICICIBANK.NS` | Banking |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search input |
| `D` | Toggle dark/light mode |
| `V` | Activate voice input |
| `Esc` | Close modals |
| `R` | Refresh data |

---

## 🔌 API Reference

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "model": "FinBERT loaded",
  "timestamp": "2025-11-20T10:30:00Z"
}
```

#### 2. Stock Search

```http
GET /api/search?q={query}
```

**Parameters:**
- `q` (string): Search query for stock ticker or company name

**Example:**
```bash
curl http://localhost:5000/api/search?q=apple
```

**Response:**
```json
{
  "results": [
    {
      "ticker": "AAPL",
      "name": "Apple Inc.",
      "exchange": "NASDAQ"
    }
  ]
}
```

#### 3. Sentiment Analysis

```http
POST /api/analyze
```

**Request Body:**
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
  "sentimentLabel": "Bullish",
  "confidence": 89.2,
  "totalArticles": 247,
  "timeline": [
    {
      "date": "2025-11-20",
      "sentiment": 72.3,
      "price": 185.50,
      "volume": 52000000
    }
  ],
  "dimensions": {
    "quality": 85.5,
    "reliability": 78.2,
    "enthusiasm": 90.1,
    "concern": 15.3,
    "innovation": 88.7,
    "stability": 82.4
  },
  "sourceBreakdown": [
    {
      "source": "Bloomberg",
      "sentiment": 85.2,
      "articles": 45
    }
  ],
  "headlines": [
    {
      "title": "Apple Unveils New AI Features",
      "sentiment": 92.5,
      "source": "TechCrunch",
      "publishedAt": "2025-11-20T08:00:00Z",
      "url": "https://example.com/article"
    }
  ],
  "insights": {
    "trend": "Strong bullish momentum",
    "correlation": 0.78,
    "volatility": "Low",
    "recommendation": "Positive outlook"
  },
  "emotions": {
    "joy": 0.65,
    "fear": 0.12,
    "anger": 0.05,
    "surprise": 0.18
  }
}
```

#### 4. Trending Stocks

```http
GET /api/trending
```

**Response:**
```json
{
  "trending": [
    {
      "ticker": "TSLA",
      "name": "Tesla Inc.",
      "price": 242.50,
      "change": 15.80,
      "changePercent": 6.98,
      "sentiment": 78.5,
      "sentimentLabel": "Bullish",
      "confidence": 82.1
    }
  ],
  "count": 15,
  "timestamp": "2025-11-20T10:30:00Z"
}
```

### Error Responses

All endpoints may return the following error codes:

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server-side issue |

**Error Response Format:**
```json
{
  "error": "Error message",
  "code": 400,
  "details": "Additional error information"
}
```

---

## 📁 Project Structure

```
FinSentiment-Pro/
│
├── backend/                      # Python Flask backend
│   ├── app.py                   # Main Flask application
│   ├── requirements.txt         # Python dependencies
│   ├── stock_database.json      # Stock ticker database
│   ├── .env                     # Environment variables (create this)
│   └── .env.example             # Example environment file
│
├── src/                         # React frontend source
│   ├── components/              # React components
│   │   ├── Header.tsx          # Navigation header with scroll effects
│   │   ├── Hero.tsx            # Landing section with quick search
│   │   ├── Features.tsx        # Feature showcase section
│   │   ├── Dashboard.tsx       # Main analysis dashboard
│   │   ├── TrendingStocks.tsx  # Trending stocks with filters
│   │   ├── About.tsx           # About section
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Footer.tsx          # Footer component
│   │   └── dashboard/          # Dashboard subcomponents
│   │       ├── SearchSection.tsx
│   │       ├── OverallSentimentGauge.tsx
│   │       ├── TimelineChart.tsx
│   │       ├── RadarChart.tsx
│   │       ├── SourceComparison.tsx
│   │       ├── CalendarHeatmap.tsx
│   │       ├── CorrelationScatter.tsx
│   │       ├── HeadlinesFeed.tsx
│   │       ├── AIInsights.tsx
│   │       └── ExportPanel.tsx
│   │
│   ├── store/                   # State management
│   │   └── useStore.ts         # Zustand global state
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts            # Type declarations
│   │
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles + Tailwind
│
├── public/                      # Static assets
│   ├── favicon.ico
│   └── images/
│
├── index.html                   # HTML template
├── package.json                 # Node dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts               # Vite build configuration
├── .gitignore                   # Git ignore rules
├── start.ps1                    # Windows start script
└── README.md                    # Project documentation
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Problem**: `Module not found` errors

```bash
cd backend
pip install -r requirements.txt --upgrade
```

**Problem**: FinBERT model download is slow
- First run will download the FinBERT model (~450MB)
- Subsequent runs will use the cached model from `~/.cache/huggingface/`
- Ensure stable internet connection
- Download typically takes 2-5 minutes depending on connection speed

**Problem**: `Port 5000 already in use`

```bash
# Find and kill the process using port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# On macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

**Problem**: API key errors

- Verify all API keys are correctly set in `.env` file
- Ensure no extra spaces or quotes around API keys
- Check API key validity on respective provider websites
- Restart Flask server after updating `.env`

#### Frontend Issues

**Problem**: Dependencies not installing

```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Problem**: Port 3000 already in use

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3001, // Change to any available port
  }
})
```

**Problem**: Build errors

```bash
# Clean build and rebuild
npm run clean
npm run build
```

#### Voice Input Issues

**Problem**: Voice input not working
- Ensure you're using Chrome, Edge, or Safari (Firefox not fully supported)
- Allow microphone permissions when prompted
- Check browser console for errors
- Verify `https` or `localhost` (required for Web Speech API)

**Problem**: Voice recognition not accurate
- Speak clearly and at moderate pace
- Use standard ticker format (e.g., "A P P L" not "Apple")
- Ensure quiet environment with minimal background noise

#### Performance Issues

**Problem**: Slow analysis response
- Large timeframes (365 days) require more processing
- Check internet connection for API calls
- Reduce number of simultaneous analyses
- Consider upgrading to paid API tiers for better rate limits

**Problem**: UI lag or freezing
- Clear browser cache and reload
- Check browser console for JavaScript errors
- Disable browser extensions that may interfere
- Try incognito/private browsing mode

### Getting Help

If you encounter issues not covered here:

1. Check [GitHub Issues](https://github.com/HackWGaveesh/FinSentiment-Pro/issues) for similar problems
2. Review Flask logs in terminal for backend errors
3. Check browser console for frontend errors
4. Create a new issue with:
   - Detailed error description
   - Steps to reproduce
   - Screenshots if applicable
   - System information (OS, browser, versions)

---

## 🗺️ Roadmap

### 🎯 Phase 1: Core Enhancements (Q1 2026)

- [ ] User authentication and authorization
- [ ] Personal watchlists and saved searches
- [ ] Email/SMS alerts for significant sentiment changes
- [ ] Enhanced mobile responsiveness
- [ ] Performance optimizations for large datasets

### 🚀 Phase 2: Advanced Features (Q2 2026)

- [ ] Portfolio tracking with sentiment overlay
- [ ] Comparative analysis (multiple stocks side-by-side)
- [ ] Machine learning predictions based on sentiment trends
- [ ] Social media sentiment integration (Twitter/Reddit)
- [ ] Advanced filtering and custom alerts

### 🌟 Phase 3: Enterprise Features (Q3 2026)

- [ ] Real-time WebSocket updates
- [ ] Custom AI model training
- [ ] API access for third-party integrations
- [ ] White-label solutions
- [ ] Advanced analytics dashboard

### 📱 Phase 4: Platform Expansion (Q4 2026)

- [ ] Mobile app (React Native)
- [ ] Desktop application (Electron)
- [ ] Chrome/Firefox extension
- [ ] Integration with trading platforms
- [ ] Multi-language support

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Contribution Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/FinSentiment-Pro.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Write meaningful commit messages

4. **Test Thoroughly**
   - Test all affected features
   - Ensure no existing functionality breaks
   - Add unit tests where applicable

5. **Commit Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Provide detailed description of changes
   - Reference any related issues
   - Include screenshots for UI changes

### Code Style Guidelines

- **Frontend**: Follow React best practices, use TypeScript strictly
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use conventional commits format
- **Documentation**: Update README for any API changes

### Development Setup

```bash
# Install development dependencies
npm install --include=dev

# Run linting
npm run lint

# Run tests
npm run test

# Format code
npm run format
```

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage
- 🌍 Internationalization

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Gaveesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

This project was made possible thanks to:

- **[ProsusAI](https://huggingface.co/ProsusAI/finbert)** for the FinBERT model
- **[Hugging Face](https://huggingface.co/)** for the Transformers library and model hosting
- **[News API](https://newsapi.org/)** for comprehensive news data
- **[Yahoo Finance](https://finance.yahoo.com/)** for reliable stock market data
- **[Indian Stock API](https://indianapi.in/)** for Indian market trends
- **[Recharts](https://recharts.org/)** for beautiful and responsive charts
- **[Tailwind CSS](https://tailwindcss.com/)** for rapid UI development
- **[Framer Motion](https://www.framer.com/motion/)** for smooth animations
- **[Lucide](https://lucide.dev/)** for the icon library

### Special Thanks

- All open-source contributors who make projects like this possible
- The React and Python communities for excellent documentation
- Beta testers who provided valuable feedback

---

## 📧 Contact

### Developer

**Gaveesh**
- GitHub: [@HackWGaveesh](https://github.com/HackWGaveesh)
- Project: [FinSentiment-Pro](https://github.com/HackWGaveesh/FinSentiment-Pro)

### Support

For questions, suggestions, or issues:

- 🐛 [Report a Bug](https://github.com/HackWGaveesh/FinSentiment-Pro/issues/new?template=bug_report.md)
- 💡 [Request a Feature](https://github.com/HackWGaveesh/FinSentiment-Pro/issues/new?template=feature_request.md)
- 💬 [Start a Discussion](https://github.com/HackWGaveesh/FinSentiment-Pro/discussions)

---

<div align="center">

### 🌟 Star this repo if you find it useful!

Made with ❤️ and AI by [Gaveesh](https://github.com/HackWGaveesh)

**FinSentiment Pro** - *Empowering financial decisions with AI-powered sentiment analysis*

[⬆ Back to Top](#-finsentiment-pro)

</div>
