# 🚀 QUICK START GUIDE - FinSentiment Pro

## Step-by-Step Installation

### 1. Install Frontend Dependencies
```powershell
npm install
```

This will install:
- React 18.3.1
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Recharts (charts)
- Zustand (state management)
- Axios (API calls)
- Lucide React (icons)
- date-fns (date handling)

### 2. Install Backend Dependencies
```powershell
cd backend
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Flask-CORS (cross-origin requests)
- yfinance (stock data)
- transformers (AI models)
- torch (PyTorch)
- textblob (text processing)
- numpy (numerical computing)

**Note**: First run will download FinBERT model (~450MB). This is one-time only.

### 3. Start the Application

#### Option A: Automated Start (Recommended)
```powershell
.\start.ps1
```

This script will:
1. Check Python and Node.js installations
2. Create Python virtual environment if needed
3. Install dependencies if needed
4. Start backend server on port 5000
5. Start frontend server on port 3000

#### Option B: Manual Start

**Terminal 1 - Backend:**
```powershell
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

Backend API will be running at:
```
http://localhost:5000
```

## 🎯 How to Use

### Basic Usage
1. **Enter a stock ticker**: Type AAPL, TSLA, GOOGL, etc.
2. **Or use voice input**: Click the microphone icon and speak
3. **Select time period**: 24 Hours, 7 Days, or 30 Days
4. **Click Analyze**: Wait for sentiment analysis to complete
5. **Explore results**: View charts, insights, and news headlines

### Features to Try

#### Voice Input
- Click the microphone button
- Say a stock ticker clearly (e.g., "Apple" or "AAPL")
- Confirm the recognized ticker
- Click Analyze

#### Theme Toggle
- Click the sun/moon icon in header
- Or press `D` key
- Theme preference is saved automatically

#### Keyboard Shortcuts
- `/` - Focus search input
- `D` - Toggle dark/light mode
- `V` - Activate voice input
- `Esc` - Close modals

#### Interactive Charts
- **Timeline Chart**: Toggle between sentiment and price views
- **Headlines Feed**: Expand articles to read summaries
- **Calendar Heatmap**: Click days to view that day's sentiment
- **Source Comparison**: See which news sources are most positive/negative

## 🔧 Troubleshooting

### Problem: Port 3000 already in use
**Solution**: Kill the process or change port in `vite.config.ts`

### Problem: Port 5000 already in use
**Solution**: Kill the process or change port in `backend/app.py`

### Problem: Module not found errors
**Solution**: 
```powershell
# Frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
```

### Problem: FinBERT model download failed
**Solution**: Ensure stable internet connection and retry. The model is large (~450MB).

### Problem: Voice input not working
**Solution**: 
- Use Chrome, Edge, or Safari (best support)
- Allow microphone permissions when prompted
- Check browser console for errors

### Problem: No news articles found
**Solution**: 
- Try a popular ticker (AAPL, TSLA, GOOGL)
- Check if News API is accessible
- Verify backend logs for API errors

### Problem: Backend crashes on startup
**Solution**:
```powershell
cd backend
pip install --upgrade transformers torch
python app.py
```

## 📊 Sample Tickers to Try

- **AAPL** - Apple Inc.
- **TSLA** - Tesla
- **GOOGL** - Google/Alphabet
- **MSFT** - Microsoft
- **AMZN** - Amazon
- **NVDA** - NVIDIA
- **META** - Meta/Facebook
- **NFLX** - Netflix

## 🎨 Project Features

### ✅ Implemented
- [x] Voice input with Web Speech API
- [x] Real-time sentiment analysis using FinBERT
- [x] Multi-dimensional sentiment metrics
- [x] Interactive timeline charts
- [x] Radar charts for multi-dimensional view
- [x] News source comparison
- [x] Headlines feed with emotion tags
- [x] Calendar heatmap
- [x] Correlation scatter plots
- [x] AI-generated insights
- [x] Dark/light theme with persistence
- [x] Responsive design (mobile/tablet/desktop)
- [x] Export panel (PDF/CSV/Email/Alerts)
- [x] Loading skeletons
- [x] Error handling
- [x] Keyboard shortcuts

### 🔮 Future Enhancements (Not Implemented Yet)
- Real-time alerts via email
- PDF report generation
- CSV data export
- Advanced filters modal
- Historical data comparison
- Portfolio tracking
- Multiple ticker comparison

## 🎓 Academic Project Features

This project demonstrates:

1. **NLP & Machine Learning**
   - FinBERT for financial sentiment analysis
   - Emotion classification using transformers
   - Multi-dimensional text analysis

2. **Data Visualization**
   - Real-time interactive charts
   - Multiple chart types (line, radar, scatter, heatmap)
   - Responsive and accessible design

3. **Full-Stack Development**
   - RESTful API design
   - State management with Zustand
   - Modern React with TypeScript
   - Flask backend with AI models

4. **UI/UX Design**
   - Smooth animations with Framer Motion
   - Dark/light theme
   - Accessibility features (WCAG 2.1 AA)
   - Responsive layout

## 📝 API Endpoints

### POST /api/analyze
Analyze sentiment for a stock ticker.

**Request:**
```json
{
  "ticker": "AAPL",
  "days": 7
}
```

**Response:** Complete sentiment analysis data

### GET /api/health
Health check endpoint to verify backend is running.

## 🔑 API Keys (Pre-configured)

The following API keys are already configured:
- **News API**: For fetching news articles
- **Alpha Vantage**: For stock data (backup)
- **Hugging Face**: For AI models
- **Yahoo Finance**: Via yfinance library (no key needed)

## 💡 Tips for Best Results

1. **Use popular tickers**: More news coverage = better analysis
2. **Try different time periods**: See how sentiment changes over time
3. **Expand headlines**: Read full summaries for context
4. **Check correlations**: See if sentiment predicts price movements
5. **Compare sources**: Different news outlets have different biases

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start both servers
3. ✅ Open browser to localhost:3000
4. ✅ Try analyzing AAPL or TSLA
5. ✅ Explore all features
6. ✅ Toggle dark mode
7. ✅ Try voice input
8. ✅ Read AI insights

## 📧 Support

If you encounter issues:
1. Check this guide first
2. Review the main README.md
3. Check console logs (browser & terminal)
4. Verify all dependencies are installed
5. Ensure Python 3.8+ and Node.js 18+ are installed

---

**Happy Analyzing! 📈**

*FinSentiment Pro - AI-Powered Financial Sentiment Analysis*
