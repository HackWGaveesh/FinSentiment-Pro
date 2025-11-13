# 🚀 Quick Deploy - FinSentiment Pro

## 📺 Video Tutorial
[Watch deployment walkthrough](#) *(coming soon)*

## ⚡ 3-Step Deploy (5 minutes)

### 1️⃣ Deploy Backend (Render)

1. Go to **[render.com/dashboard](https://dashboard.render.com)**
2. Click **New +** → **Web Service**
3. Connect GitHub: `HackWGaveesh/FinSentiment-Pro`
4. Settings:
   ```
   Name: finsentiment-backend
   Runtime: Python 3
   Root Directory: backend
   Build: pip install -r requirements.txt
   Start: gunicorn --bind 0.0.0.0:$PORT --timeout 300 --workers 2 app:app
   ```
5. **Environment Variables** (click "Advanced"):
   ```
   INDIAN_STOCK_API_KEY = [your_key_1]
   INDIAN_STOCK_API_KEY_2 = [your_key_2]
   INDIAN_STOCK_API_KEY_3 = [your_key_3]
   NEWS_API_KEY = [optional]
   ALPHA_VANTAGE_KEY = [optional]
   DEMO_MODE = false
   PYTHON_VERSION = 3.8.18
   ```
6. Click **Create Web Service**
7. Wait 5-10 min (downloads FinBERT model)
8. **Copy URL**: `https://finsentiment-backend-xxxx.onrender.com`

---

### 2️⃣ Deploy Frontend (Vercel)

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Import Git Repository: `FinSentiment-Pro`
3. Framework Preset: **Vite** (auto-detected)
4. **Add Environment Variable**:
   ```
   Name: VITE_API_URL
   Value: https://finsentiment-backend-xxxx.onrender.com
   ```
   *(paste your backend URL from step 1)*
5. Click **Deploy**
6. Wait 2-3 min
7. **Your live URL**: `https://finsentiment-pro-xxxx.vercel.app` 🎉

---

### 3️⃣ Test Everything

Open your Vercel URL and verify:
- ✅ Homepage loads
- ✅ Click "Market Pulse" → Trending stocks appear
- ✅ Search `RELIANCE.NS` → Analyze → Charts display
- ✅ Dark mode toggle works
- ✅ Mobile responsive

---

## 🎯 Where to Get API Keys

| Service | Free Tier | Get Key |
|---------|-----------|---------|
| **Indian Stock API** | 500 requests/month | [indianapi.in](https://indianapi.in) |
| News API | 100 requests/day | [newsapi.org/register](https://newsapi.org/register) |
| Alpha Vantage | 500 requests/day | [alphavantage.co/support](https://www.alphavantage.co/support/#api-key) |

**Pro Tip**: Get 3 Indian Stock API keys for 1,500 requests/month (automatic rotation)

---

## ⚠️ Common Issues

**Backend returns 502/503**  
→ Wait 30 seconds (cold start). Check Render logs.

**Frontend shows "Network Error"**  
→ Verify `VITE_API_URL` in Vercel matches backend URL exactly (with `https://`)

**Trending stocks empty**  
→ Check API keys in Render environment variables

**Build fails**  
→ Ensure `backend` folder is set as Root Directory in Render

---

## 💰 Cost

- **Vercel**: $0/month (free tier)
- **Render**: $0/month (free tier, 512MB RAM)
- **Total**: **$0/month** ✅

**Limitations** (Free Tier):
- Backend sleeps after 15min inactivity (30s cold start)
- 512MB RAM (tight for FinBERT but works)

**Upgrade**: $7/month Render Starter (no sleep, faster)

---

## 📞 Need Help?

- Read full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Report issues: [GitHub Issues](https://github.com/HackWGaveesh/FinSentiment-Pro/issues)
- Render docs: [render.com/docs](https://render.com/docs)
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)

---

## 🎊 Success!

Your app is now live at:
- **Frontend**: `https://finsentiment-pro-xxxx.vercel.app`
- **Backend**: `https://finsentiment-backend-xxxx.onrender.com`

Share the link and start analyzing! 📈🚀
