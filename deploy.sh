#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         FinSentiment Pro - Deployment Assistant           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "This script will guide you through deploying to Vercel + Render"
echo ""

# Check if git repo is up to date
echo "📦 Checking repository status..."
if git diff-index --quiet HEAD --; then
    echo "✅ Repository is clean"
else
    echo "⚠️  You have uncommitted changes"
    read -p "Do you want to commit and push? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add -A
        read -p "Enter commit message: " commit_msg
        git commit -m "$commit_msg"
        git push origin main
        echo "✅ Changes pushed to GitHub"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Step 1: Deploy Backend to Render"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://dashboard.render.com/select-repo"
echo "2. Select repository: FinSentiment-Pro"
echo "3. Configure:"
echo "   - Name: finsentiment-backend"
echo "   - Runtime: Python 3"
echo "   - Root Directory: backend"
echo "   - Build Command: pip install -r requirements.txt"
echo "   - Start Command: gunicorn --bind 0.0.0.0:\$PORT --timeout 300 --workers 2 app:app"
echo ""
echo "4. Add Environment Variables:"
echo "   INDIAN_STOCK_API_KEY = [your-key-1]"
echo "   INDIAN_STOCK_API_KEY_2 = [your-key-2]"
echo "   INDIAN_STOCK_API_KEY_3 = [your-key-3]"
echo "   DEMO_MODE = false"
echo "   PYTHON_VERSION = 3.8.18"
echo ""
read -p "Press Enter when backend is deployed..."

echo ""
read -p "Enter your Render backend URL (e.g., https://finsentiment-backend.onrender.com): " BACKEND_URL

echo ""
echo "Testing backend..."
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/health")

if [ "$HEALTH_CHECK" == "200" ]; then
    echo "✅ Backend is healthy!"
else
    echo "⚠️  Backend returned HTTP $HEALTH_CHECK"
    echo "   Wait 30 seconds and try again (cold start)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Step 2: Deploy Frontend to Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Open: https://vercel.com/new"
echo "2. Import repository: FinSentiment-Pro"
echo "3. Framework Preset: Vite (auto-detected)"
echo "4. Add Environment Variable:"
echo "   Name: VITE_API_URL"
echo "   Value: $BACKEND_URL"
echo ""
echo "5. Click 'Deploy'"
echo ""
read -p "Press Enter when frontend is deployed..."

echo ""
read -p "Enter your Vercel URL (e.g., https://finsentiment-pro.vercel.app): " FRONTEND_URL

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                  🎉 Deployment Complete!                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Your live URLs:"
echo "  Frontend: $FRONTEND_URL"
echo "  Backend:  $BACKEND_URL"
echo ""
echo "Next steps:"
echo "  1. Visit $FRONTEND_URL"
echo "  2. Test trending stocks (Market Pulse section)"
echo "  3. Search and analyze RELIANCE.NS"
echo "  4. Share your live app! 🚀"
echo ""
echo "Need help? Check DEPLOYMENT.md for troubleshooting"
echo ""
