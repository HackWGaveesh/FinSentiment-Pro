# 🧪 TESTING CHECKLIST - FinSentiment Pro

Use this checklist to verify all features are working correctly.

## Pre-Installation Tests

### ✅ Environment Check
- [ ] Python 3.8+ installed: `python --version`
- [ ] Node.js 18+ installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] pip installed: `pip --version`

## Installation Tests

### ✅ Frontend Installation
```powershell
npm install
```
- [ ] No errors during installation
- [ ] `node_modules` folder created
- [ ] All dependencies installed successfully

### ✅ Backend Installation
```powershell
cd backend
pip install -r requirements.txt
```
- [ ] No errors during installation
- [ ] All Python packages installed
- [ ] FinBERT model downloads successfully (first run)

## Startup Tests

### ✅ Backend Server
```powershell
cd backend
python app.py
```
- [ ] Server starts without errors
- [ ] Shows "Running on http://127.0.0.1:5000"
- [ ] FinBERT model loads successfully
- [ ] No import errors

### ✅ Frontend Server
```powershell
npm run dev
```
- [ ] Vite dev server starts
- [ ] Shows "http://localhost:3000"
- [ ] No compilation errors
- [ ] Opens browser automatically (or manually navigate)

## Feature Tests

### ✅ Page Load & Layout
- [ ] Page loads without errors
- [ ] Header displays with logo and nav
- [ ] Hero section shows with animations
- [ ] Footer displays correctly
- [ ] No console errors in browser

### ✅ Theme System
- [ ] Light theme is default or loads from localStorage
- [ ] Click sun/moon button toggles theme
- [ ] Press 'D' key toggles theme
- [ ] Theme persists after page reload
- [ ] All elements adapt to theme change

### ✅ Search Functionality
- [ ] Search input accepts text
- [ ] Popular tickers display as buttons
- [ ] Recent searches appear after first search
- [ ] Date range selector works (24h, 7d, 30d)
- [ ] Clear button (X) clears input

### ✅ Voice Input
- [ ] Click microphone button
- [ ] Browser requests microphone permission
- [ ] "Listening..." indicator shows
- [ ] Speak a ticker (e.g., "Apple")
- [ ] Ticker is recognized and displayed
- [ ] Confirmation message appears
- [ ] Voice input works in Chrome/Edge/Safari

### ✅ Analysis - AAPL Test
**Enter ticker: AAPL, Click Analyze**

- [ ] Loading skeleton appears
- [ ] Backend processes request
- [ ] Data returns successfully
- [ ] Loading skeleton disappears
- [ ] Results dashboard appears

### ✅ Overall Sentiment Gauge
- [ ] Large circular gauge displays
- [ ] Sentiment score animates from 0
- [ ] Score color matches sentiment (green/yellow/red)
- [ ] Confidence percentage shows
- [ ] Article count displays
- [ ] Ticker and company name show
- [ ] Date range displays

### ✅ Timeline Chart
- [ ] Chart renders successfully
- [ ] Blue line shows sentiment over time
- [ ] Green line shows stock price
- [ ] Toggle buttons work (Sentiment/Price)
- [ ] Hover shows tooltips with exact values
- [ ] Dates format correctly
- [ ] Both Y-axes display (left=sentiment, right=price)

### ✅ Radar Chart
- [ ] Hexagonal radar chart displays
- [ ] Shows 6 dimensions
- [ ] Blue fill appears
- [ ] Dimension labels are readable
- [ ] Explanations show below chart
- [ ] Values make sense

### ✅ Source Comparison
- [ ] Horizontal bar chart displays
- [ ] Shows different news sources
- [ ] Bars colored by sentiment (green/yellow/red)
- [ ] Article counts shown
- [ ] Sources listed below chart
- [ ] Bloomberg, Reuters, CNBC, etc. appear

### ✅ Headlines Feed
- [ ] At least 10-20 headlines display
- [ ] Filter buttons work (All/Positive/Negative/Neutral)
- [ ] Each headline shows:
  - [ ] Sentiment badge (colored)
  - [ ] Title
  - [ ] Source and timestamp
  - [ ] Confidence percentage
  - [ ] Sentiment progress bar
  - [ ] Emotion tags (if present)
- [ ] Click expand button shows summary
- [ ] "Read Full Article" link works
- [ ] Scrollable if many articles

### ✅ Calendar Heatmap
- [ ] Calendar grid displays current month
- [ ] Day headers show (Sun-Sat)
- [ ] Days colored by sentiment
- [ ] Today's date highlighted
- [ ] Hover shows sentiment score
- [ ] Legend displays at bottom
- [ ] Color gradient makes sense

### ✅ AI Insights Panel
- [ ] Purple/indigo gradient border shows
- [ ] Sparkles icon displays
- [ ] 5-6 insight bullet points show
- [ ] Text is readable and makes sense
- [ ] Refresh button present
- [ ] Click refresh triggers animation

### ✅ Correlation Scatter
- [ ] Scatter plot displays
- [ ] Correlation coefficient shows (r = X.XX)
- [ ] Strength label correct (Strong/Moderate/Weak)
- [ ] Points colored by quadrant
- [ ] Reference lines at 0,0
- [ ] Hover shows exact values
- [ ] Legend explains colors

### ✅ Export Panel
- [ ] Four action buttons display
- [ ] Each has colored icon
- [ ] Clicking each shows alert (not implemented)
- [ ] Pro tip box displays at bottom

### ✅ Error Handling
**Test with invalid ticker: INVALIDTICKER**
- [ ] Error message displays
- [ ] Message is user-friendly
- [ ] Loading stops
- [ ] Can try again with different ticker

**Test with empty input:**
- [ ] Error message appears
- [ ] Asks to enter ticker

### ✅ Responsive Design
**Resize browser window or test on different devices:**

**Desktop (>1280px):**
- [ ] 3-column grid layout
- [ ] All features visible
- [ ] Charts readable

**Tablet (768-1280px):**
- [ ] 2-column grid layout
- [ ] Content stacks appropriately
- [ ] Charts resize

**Mobile (<768px):**
- [ ] Single column layout
- [ ] Hamburger menu appears
- [ ] Touch-friendly buttons
- [ ] Charts adjust for small screen
- [ ] Scrolling works smoothly

### ✅ Keyboard Shortcuts
- [ ] Press `/` - Focus moves to search input
- [ ] Press `D` - Theme toggles
- [ ] Press `Esc` - (Modals would close if implemented)

### ✅ Accessibility
- [ ] Tab key navigates through interactive elements
- [ ] Focus indicators visible
- [ ] ARIA labels present on buttons
- [ ] Alt text on images/icons
- [ ] Color contrast sufficient
- [ ] Text readable at different zoom levels

### ✅ Performance
- [ ] Page loads in <3 seconds
- [ ] Animations smooth (60fps)
- [ ] No lag when scrolling
- [ ] Charts render quickly
- [ ] API response in <5 seconds

### ✅ Additional Ticker Tests
Test with different tickers to verify robustness:

**TSLA (Tesla):**
- [ ] Analysis completes successfully
- [ ] Different sentiment than AAPL
- [ ] Charts update with new data

**GOOGL (Google):**
- [ ] Analysis completes successfully
- [ ] Recent searches updates

**MSFT (Microsoft):**
- [ ] Analysis completes successfully
- [ ] Calendar shows different pattern

## Browser Compatibility

### ✅ Chrome
- [ ] All features work
- [ ] Voice input works
- [ ] Charts render correctly
- [ ] No console errors

### ✅ Edge
- [ ] All features work
- [ ] Voice input works
- [ ] Charts render correctly

### ✅ Firefox
- [ ] All features work
- [ ] Voice input may not work (expected)
- [ ] Charts render correctly

### ✅ Safari
- [ ] All features work
- [ ] Voice input works
- [ ] Charts render correctly

## API Tests

### ✅ Backend Health Check
Open: http://localhost:5000/api/health
- [ ] Returns: `{"status": "healthy", "model": "FinBERT loaded"}`

### ✅ Backend API
Test POST to: http://localhost:5000/api/analyze
```json
{
  "ticker": "AAPL",
  "days": 7
}
```
- [ ] Returns complete JSON response
- [ ] Contains: ticker, companyName, overallScore, etc.
- [ ] No errors in response

## Bug Checks

### ✅ Common Issues
- [ ] No memory leaks during extended use
- [ ] Theme toggle doesn't break layout
- [ ] Multiple searches work correctly
- [ ] Back button works (if routing added)
- [ ] Refresh preserves theme preference
- [ ] Recent searches limited to 5
- [ ] Voice input doesn't break on error

## Final Verification

### ✅ Complete User Flow
1. [ ] Open http://localhost:3000
2. [ ] Page loads completely
3. [ ] Click "Start Analyzing Now" button
4. [ ] Scrolls to dashboard
5. [ ] Click microphone (or skip if no mic)
6. [ ] Speak or type "AAPL"
7. [ ] Select "7 Days"
8. [ ] Click "Analyze"
9. [ ] Wait for results
10. [ ] Explore all charts
11. [ ] Expand a headline
12. [ ] Toggle theme
13. [ ] Try another ticker (TSLA)
14. [ ] Verify everything still works

## Success Criteria

✅ **PASS** if:
- All core features work
- No critical errors
- Voice input works (in supported browsers)
- Charts display correctly
- Theme toggle works
- Responsive on mobile/tablet/desktop
- API returns data successfully
- Performance is acceptable

⚠️ **REVIEW** if:
- Minor visual issues
- Some features slow but functional
- Voice input unreliable (browser limitation)
- Some charts need adjustment

❌ **FAIL** if:
- Server won't start
- Critical errors on page load
- API always fails
- Charts don't render
- Major layout issues

## Notes Section

**Issues Found:**
_Record any problems encountered during testing_

**Performance Observations:**
_Note any slow operations or lag_

**Browser-Specific Issues:**
_Note issues that only appear in certain browsers_

**Suggestions for Improvement:**
_Ideas for enhancements_

---

## ✅ FINAL CHECKLIST

- [ ] All dependencies installed correctly
- [ ] Both servers start without errors
- [ ] Can analyze at least 3 different tickers
- [ ] All charts display and update
- [ ] Theme toggle works
- [ ] Voice input works (if browser supports)
- [ ] Responsive on different screen sizes
- [ ] No critical console errors
- [ ] Performance is acceptable
- [ ] Ready for academic evaluation

**Tester Name:** _______________
**Date:** _______________
**Overall Result:** [ ] PASS  [ ] REVIEW  [ ] FAIL

---

**CONGRATULATIONS! If you've checked all boxes, FinSentiment Pro is working perfectly! 🎉**
