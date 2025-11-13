# 🚀 Deployment Guide - Vercel + Render

This guide will help you deploy **FinSentiment Pro** to production using:
- **Vercel** (Frontend) - Free tier with automatic HTTPS
- **Render** (Backend) - Free tier with 512MB RAM

## 📋 Prerequisites

- GitHub account
- Vercel account ([sign up free](https://vercel.com))
- Render account ([sign up free](https://render.com))
- Your API keys (Indian Stock API, News API, etc.)

---

## 🎯 Quick Deploy (5 minutes)

### Step 1: Push to GitHub (if not already done)

```bash
git add .
git commit -m "feat: add deployment configs for Vercel and Render"
git push origin main
```

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `FinSentiment-Pro` repository
4. Vercel will auto-detect Vite configuration
5. **Important**: Add environment variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-name.onrender.com` (we'll get this in Step 3)
6. Click **"Deploy"**
7. Wait 2-3 minutes for build
8. Copy your Vercel URL (e.g., `https://finsentiment-pro.vercel.app`)

### Step 3: Deploy Backend to Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `finsentiment-backend` (or your choice)
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT --timeout 300 --workers 2 app:app`
   - **Root Directory**: `backend`
5. Add environment variables (click **"Advanced"** → **"Add Environment Variable"**):
   ```
   INDIAN_STOCK_API_KEY=your_key_1_here
   INDIAN_STOCK_API_KEY_2=your_key_2_here
   INDIAN_STOCK_API_KEY_3=your_key_3_here
   NEWS_API_KEY=your_newsapi_key_here
   ALPHA_VANTAGE_KEY=your_alphavantage_key_here
   DEMO_MODE=false
   PYTHON_VERSION=3.8.18
   ```
6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment (FinBERT model download ~500MB)
8. Copy your Render URL (e.g., `https://finsentiment-backend.onrender.com`)

#### Option B: Using render.yaml (Automatic)

The `render.yaml` file is already configured. Just:

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create services automatically
5. Add your environment variables in the dashboard

### Step 4: Update Frontend Environment Variable

1. Go back to Vercel dashboard
2. Navigate to your project → **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to your Render backend URL:
   ```
   https://finsentiment-backend.onrender.com
   ```
4. Go to **Deployments** → Click the 3-dot menu → **Redeploy**

---

## ✅ Verify Deployment

### Test Backend

```bash
curl https://your-backend-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "model": "FinBERT loaded"
}
```

### Test Frontend

1. Visit your Vercel URL: `https://finsentiment-pro.vercel.app`
2. Click "Market Pulse" section
3. Click **Refresh** - should load trending stocks
4. Search for `RELIANCE.NS` and click **Analyze Sentiment**
5. Verify charts and data display correctly

---

## 🔧 Configuration Details

### Frontend Environment Variables (Vercel)

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://your-backend.onrender.com` | ✅ Yes |

### Backend Environment Variables (Render)

| Variable | Description | Required |
|----------|-------------|----------|
| `INDIAN_STOCK_API_KEY` | Primary Indian Stock API key | ✅ Yes |
| `INDIAN_STOCK_API_KEY_2` | Secondary key (rotation) | ⚠️ Recommended |
| `INDIAN_STOCK_API_KEY_3` | Tertiary key (rotation) | ⚠️ Recommended |
| `NEWS_API_KEY` | News API key | ⚠️ Optional |
| `ALPHA_VANTAGE_KEY` | Alpha Vantage key | ⚠️ Optional |
| `DEMO_MODE` | `false` for production | ✅ Yes |
| `PYTHON_VERSION` | `3.8.18` | ✅ Yes |

---

## 💰 Cost Breakdown

### Vercel (Frontend)
- ✅ **Free tier**: 100 GB bandwidth, unlimited deployments
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- **Cost**: $0/month

### Render (Backend)
- ✅ **Free tier**: 512MB RAM, 750 hours/month
- ⚠️ **Limitation**: Spins down after 15min inactivity (30s cold start)
- ⚠️ **Model size**: FinBERT ~500MB fits in 512MB RAM (tight)
- **Cost**: $0/month

**Total**: $0/month ✅

---

## ⚠️ Important Notes

### Cold Starts (Render Free Tier)
- Backend spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- **Solution**: Use a keep-alive service like [cron-job.org](https://cron-job.org) to ping `/api/health` every 10 minutes

### Model Loading
- FinBERT downloads on first deployment (~500MB)
- Subsequent deploys use cached model
- Initial deployment takes 5-10 minutes

### API Rate Limits
- Indian Stock API: 500 requests/month per key
- With 3 keys: 1,500 requests/month total
- Backend automatically rotates keys

### CORS Configuration
- Backend allows: `*.vercel.app`, `*.render.com`, `localhost:3000`
- If you use a custom domain, update `backend/app.py` CORS config

---

## 🐛 Troubleshooting

### Frontend shows "Network Error"

**Problem**: Backend URL not configured or incorrect

**Solution**:
1. Verify `VITE_API_URL` in Vercel environment variables
2. Ensure it matches your Render backend URL exactly (including `https://`)
3. Redeploy frontend after updating env vars

### Backend returns 502/503 errors

**Problem**: Backend is starting up (cold start) or crashed

**Solution**:
1. Check Render logs: Dashboard → Service → Logs
2. Wait 30 seconds and retry
3. Verify all environment variables are set correctly

### Trending stocks show "No data available"

**Problem**: Indian Stock API keys missing or exhausted

**Solution**:
1. Verify API keys are set in Render environment variables
2. Check API quota at [indianapi.in](https://indianapi.in)
3. Add additional keys for rotation

### FinBERT model fails to load

**Problem**: Insufficient memory (512MB on free tier)

**Solution**:
1. Upgrade Render to paid tier ($7/month for 512MB → 2GB)
2. Or use a lighter sentiment model (modify `backend/app.py`)

---

## 📈 Upgrade Options

If you need better performance:

### Render Paid Plans
- **Starter** ($7/month): 512MB RAM, no sleep
- **Standard** ($25/month): 2GB RAM, faster CPU
- **Pro** ($85/month): 4GB RAM, priority support

### Alternative Hosting
- **Railway**: $5/month free credit, then $0.000463/GB-hour
- **Fly.io**: 3GB RAM free tier
- **Heroku**: Eco dynos $5/month

---

## 🔐 Security Best Practices

1. **Never commit API keys** to GitHub
2. Use environment variables for all secrets
3. Rotate API keys periodically
4. Monitor usage in Render/Vercel dashboards
5. Enable two-factor authentication on both platforms

---

## 🎉 Post-Deployment Checklist

- [ ] Backend health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] Trending stocks fetch and display
- [ ] Stock analysis works (test with RELIANCE.NS)
- [ ] Charts render correctly
- [ ] Voice input works (if using HTTPS)
- [ ] Dark mode toggles properly
- [ ] Mobile responsive layout works

---

## 📞 Support

- **Render Issues**: [render.com/docs](https://render.com/docs)
- **Vercel Issues**: [vercel.com/docs](https://vercel.com/docs)
- **Project Issues**: [GitHub Issues](https://github.com/HackWGaveesh/FinSentiment-Pro/issues)

---

## 🚀 Next Steps

1. **Custom Domain**: Add your domain in Vercel settings
2. **Analytics**: Add Vercel Analytics for traffic insights
3. **Monitoring**: Set up Sentry or LogRocket for error tracking
4. **Keep-Alive**: Configure cron job to prevent backend sleep

---

**Deployed!** 🎊

Your live URLs:
- Frontend: `https://finsentiment-pro.vercel.app`
- Backend: `https://finsentiment-backend.onrender.com`

Share your app and gather feedback! 📈
