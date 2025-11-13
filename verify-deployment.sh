#!/bin/bash

# Quick deployment verification script

echo "🔍 Testing Deployment..."
echo ""

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./verify-deployment.sh <backend-url>"
    echo "Example: ./verify-deployment.sh https://finsentiment-backend.onrender.com"
    exit 1
fi

BACKEND_URL=$1

echo "📡 Testing Backend Health..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "${BACKEND_URL}/api/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" == "200" ]; then
    echo "✅ Backend is healthy!"
    echo "   Response: $BODY"
else
    echo "❌ Backend health check failed (HTTP $HTTP_CODE)"
    echo "   Response: $BODY"
    exit 1
fi

echo ""
echo "📊 Testing Trending Endpoint..."
TRENDING_RESPONSE=$(curl -s -w "\n%{http_code}" "${BACKEND_URL}/api/trending")
HTTP_CODE=$(echo "$TRENDING_RESPONSE" | tail -n1)

if [ "$HTTP_CODE" == "200" ]; then
    echo "✅ Trending endpoint working!"
    COUNT=$(echo "$TRENDING_RESPONSE" | head -n-1 | grep -o '"count":[0-9]*' | grep -o '[0-9]*')
    echo "   Found $COUNT trending stocks"
else
    echo "❌ Trending endpoint failed (HTTP $HTTP_CODE)"
    exit 1
fi

echo ""
echo "🎉 All backend tests passed!"
echo ""
echo "Next steps:"
echo "1. Update Vercel environment variable VITE_API_URL to: $BACKEND_URL"
echo "2. Redeploy frontend on Vercel"
echo "3. Test the full application in your browser"
