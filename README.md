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

<div align="center">

# FinSentiment Pro

AI-powered sentiment analytics for Indian stocks. Real-time trends, multi-dimensional insights, and beautiful charts.

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwindcss)
![Flask](https://img.shields.io/badge/Flask-3-000000?style=for-the-badge&logo=flask)
![Python](https://img.shields.io/badge/Python-3.8%2B-3776AB?style=for-the-badge&logo=python)

<br/>

[🐛 Issues](https://github.com/HackWGaveesh/FinSentiment-Pro/issues) • [✨ Feature requests](https://github.com/HackWGaveesh/FinSentiment-Pro/issues) 

</div>

---

## Overview

FinSentiment Pro is a production-ready financial sentiment platform focused on the Indian market (NSE tickers like RELIANCE.NS, TCS.NS). It blends FinBERT-based NLP with real-time market data, delivering actionable sentiment and intuitive visualizations.

Highlights:
- Real-time Trending Stocks with live prices and AI sentiment
- One-click deep analysis for any ticker (news + sentiment + insights)
- Clean, modern UI with glassmorphism and dark mode
- Efficient API key rotation and yfinance fallback resilience

---

## Table of contents

- Features
- Architecture
- Tech stack
- Project structure
- Getting started (install, configure, run)
- API reference
- Troubleshooting
- Roadmap and contributing
- License

---

## Features

- FinBERT sentiment scoring (-100 to +100) with confidence
- Trending stocks: gainers/losers + quick sentiment overlay
- Visualizations: overall gauge, timeline, radar, heatmap, scatter, source comparison
- Source-level sentiment and article counts
- Search with popular Indian tickers (e.g., RELIANCE.NS, TCS.NS, INFY.NS)
- Manual refresh (no silent auto-refresh) to stay within API limits
- Responsive design, keyboard shortcuts, smooth animations

---

## Architecture

```mermaid
flowchart LR
  U[User] --> FE[React + Vite + Tailwind]
  FE -->|/api/*| BE[Flask API]
  BE -->|Indian Stock API (trending)| INDA[stock.indianapi.in]
  BE -->|Fallback| YF[Yahoo Finance]
  BE -->|NLP| FB[FinBERT (Transformers)]
  BE --> Cache[(In-memory cache)]
```

Resilience: If the Indian Stock API rate-limits or returns empty, the backend rotates API keys (3-key pool). If still unavailable, it falls back to live prices via yfinance and finally to curated sample data.

---

## Tech stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, Zustand
- Backend: Python 3.8+, Flask, Transformers (FinBERT), yfinance, NumPy
- Tooling: ESLint/Prettier, tsconfig, vite config

---

## Project structure

```
FinSentiment-Pro/
├── backend/
│   ├── app.py                # Flask API
│   ├── requirements.txt      # Python deps
│   ├── stock_database.json   # Local ticker db
│   └── .env                  # Environment vars
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── TrendingStocks.tsx
│   │   ├── Hero.tsx, Header.tsx, Footer.tsx, Features.tsx, Contact.tsx, About.tsx
│   │   └── dashboard/
│   │       ├── SearchSection.tsx, OverallSentimentGauge.tsx, TimelineChart.tsx
│   │       ├── RadarChart.tsx, SourceComparison.tsx, CalendarHeatmap.tsx
│   │       ├── CorrelationScatter.tsx, AIInsights.tsx, ExportPanel.tsx
│   ├── store/useStore.ts
│   ├── types/index.ts
│   ├── App.tsx, main.tsx, index.css
│   └── index.html
├── package.json, tsconfig.json, tailwind.config.js, vite.config.ts
└── README.md, LICENSE
```

---

## Getting started

### Prerequisites
- Node.js 18+
- Python 3.8+

### 1) Install frontend
```bash
npm install
```

### 2) Install backend
```bash
cd backend
pip install -r requirements.txt
```

### 3) Configure environment (backend/.env)
Copy `.env.example` to `.env` and set keys:
```env
# Indian Stock API – trending and quotes (supports rotation)
INDIAN_STOCK_API_KEY=sk_live_key_1
INDIAN_STOCK_API_KEY_2=sk_live_key_2
INDIAN_STOCK_API_KEY_3=sk_live_key_3

# Optional for enriched features
NEWS_API_KEY=your_newsapi_key
ALPHA_VANTAGE_KEY=your_alpha_vantage_key

# Demo mode (true|false)
DEMO_MODE=false
```

### 4) Run
Backend (port 5000):
```bash
cd backend
python app.py
```

Frontend (port 3000):
```bash
npm run dev
```

---

## API reference

Base URL: `http://localhost:5000`

- GET `/api/health` — health and FinBERT status
- GET `/api/trending` — real-time trending stocks (gainers/losers) with quick sentiment
- POST `/api/analyze` — deep analysis for a ticker

Example: analyze
```http
POST /api/analyze
Content-Type: application/json

{
  "ticker": "RELIANCE.NS",
  "days": 7
}
```

Notes:
- The backend prioritizes `ric` field from the Indian Stock API for tickers (e.g., `BAJE.NS`).
- Trending endpoint normalizes varied response shapes and caps to top 15 entries for speed.
- If the upstream API returns empty, yfinance fallback is used automatically.

---

## Troubleshooting

- First backend start downloads FinBERT; subsequent runs use cache.
- If port 3000 is busy, change `vite.config.ts` port to 3001.
- If trending is empty, verify Indian Stock API keys and network connectivity.
- For slow installs, clear caches and reinstall deps.

---

## Contributing and roadmap

Contributions welcome! Open an issue or PR.

Roadmap ideas:
- Watchlists and alerts
- Comparative analysis (multi-ticker)
- WebSocket live updates
- Social sentiment (Twitter/Reddit)

---

## License

MIT © Gaveesh. See [LICENSE](./LICENSE).

---

If this project helps you, star the repo. Happy analyzing 📈

