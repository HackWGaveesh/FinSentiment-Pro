# Quick Start Guide

## Running the Application

### Backend (Flask)
```bash
cd /home/BTECH_7TH_SEM/Downloads/nlp/backend
/home/BTECH_7TH_SEM/Downloads/nlp/.venv/bin/python app.py
```

Expected output:
```
Loaded 2796 stocks from database
Loading FinBERT model...
* Running on http://127.0.0.1:5000
```

### Frontend (Vite + React)
```bash
cd /home/BTECH_7TH_SEM/Downloads/nlp
npm run dev
```

Expected output:
```
VITE ready in XXX ms
Local: http://localhost:3000/
```

### Or Run Both with Background Process
```bash
# Backend (detached)
cd /home/BTECH_7TH_SEM/Downloads/nlp/backend
nohup /home/BTECH_7TH_SEM/Downloads/nlp/.venv/bin/python app.py > /tmp/flask_backend.log 2>&1 &

# Frontend (new terminal)
cd /home/BTECH_7TH_SEM/Downloads/nlp
npm run dev
```

## Testing the Search Feature

### Test Search API
```bash
# Search by company name
curl "http://localhost:5000/api/search?q=Apple&limit=3"

# Search by ticker
curl "http://localhost:5000/api/search?q=AAPL"

# Search Indian stocks
curl "http://localhost:5000/api/search?q=reliance&limit=5"

# Health check
curl "http://localhost:5000/api/health"
```

### Test in Browser
1. Open http://localhost:3000
2. Type "tesla" in the search box
3. See autocomplete suggestions appear
4. Click "Tesla, Inc. (TSLA)"
5. Click "Analyze" button
6. View sentiment analysis results

## Quick Troubleshooting

### Port Already in Use
```bash
# Kill existing Flask process
pkill -f "python.*app.py"

# Kill existing Vite process
pkill -f "vite"
```

### Check What's Running
```bash
# Check Flask (port 5000)
lsof -i :5000

# Check Vite (port 3000)
lsof -i :3000

# View backend logs
tail -f /tmp/flask_backend.log
```

### Restart Everything
```bash
# 1. Stop everything
pkill -f "python.*app.py"
pkill -f "vite"

# 2. Start backend
cd /home/BTECH_7TH_SEM/Downloads/nlp/backend
nohup /home/BTECH_7TH_SEM/Downloads/nlp/.venv/bin/python app.py > /tmp/flask_backend.log 2>&1 &

# 3. Wait for backend to load models (10-15 seconds)
sleep 15

# 4. Start frontend
cd /home/BTECH_7TH_SEM/Downloads/nlp
npm run dev
```

## URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Search API**: http://localhost:5000/api/search?q=QUERY

## Key Features

✅ Search 2,796+ stocks by name or ticker
✅ Real-time autocomplete suggestions
✅ Sentiment analysis with FinBERT
✅ News article aggregation
✅ Yahoo Finance integration
✅ Multi-dimensional sentiment metrics
✅ Beautiful visualizations

## Example Searches

Try these in the app:
- "apple" → Apple Inc. (AAPL)
- "tesla" → Tesla, Inc. (TSLA)
- "microsoft" → Microsoft Corporation (MSFT)
- "reliance" → Reliance Industries (RELIANCE.NS)
- "tcs" → Tata Consultancy Services (TCS.NS)
- "GOOGL" → Alphabet Inc. (GOOGL)

Enjoy! 🚀
