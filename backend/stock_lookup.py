import json
import os
import re
import difflib
import requests


def _load_local_db():
    path = os.path.join(os.path.dirname(__file__), 'stock_database.json')
    if os.path.exists(path):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # Expecting an array of objects with at least `symbol` and `name` keys
                if isinstance(data, dict):
                    # sometimes file may be a dict mapping symbol->meta
                    items = []
                    for k, v in data.items():
                        name = v.get('name') if isinstance(v, dict) else None
                        items.append({'symbol': k, 'name': name or str(v)})
                    return items
                return data
        except Exception:
            return None
    return None


def _is_symbol_like(q: str) -> bool:
    if not q:
        return False
    q = q.strip()
    if q.startswith('$'):
        q = q[1:]
    # Allow dots/hyphens (for some tickers) and length up to 8
    return re.fullmatch(r'[A-Za-z0-9\.-]{1,8}', q) is not None


def _search_local(q: str, db, max_results=8):
    ql = q.lower()
    results = []

    # Exact symbol or name
    for item in db:
        sym = (item.get('symbol') or '').strip()
        name = (item.get('name') or '').strip()
        if not sym and not name:
            continue
        if sym.lower() == ql or name.lower() == ql:
            results.insert(0, {'symbol': sym, 'name': name})

    # Substring matches
    for item in db:
        if len(results) >= max_results:
            break
        sym = (item.get('symbol') or '').strip()
        name = (item.get('name') or '').strip()
        if ql in sym.lower() or ql in name.lower():
            entry = {'symbol': sym, 'name': name}
            if entry not in results:
                results.append(entry)

    # Fuzzy match by name
    if len(results) < max_results:
        names = [item.get('name') or '' for item in db]
        close = difflib.get_close_matches(q, names, n=max_results, cutoff=0.6)
        for cname in close:
            for item in db:
                if item.get('name') == cname:
                    entry = {'symbol': item.get('symbol'), 'name': cname}
                    if entry not in results:
                        results.append(entry)
                        break

    return results[:max_results]


def _alpha_vantage_search(query: str, api_key: str, max_results=8):
    try:
        url = 'https://www.alphavantage.co/query'
        params = {'function': 'SYMBOL_SEARCH', 'keywords': query, 'apikey': api_key}
        r = requests.get(url, params=params, timeout=8)
        data = r.json()
        matches = data.get('bestMatches', [])
        out = []
        for m in matches[:max_results]:
            out.append({
                'symbol': m.get('1. symbol'),
                'name': m.get('2. name'),
                'region': m.get('4. region')
            })
        return out
    except Exception:
        return []


def resolve_ticker(query: str, alpha_key: str = None, max_results: int = 6):
    """
    Resolve a free-text query into possible tickers.
    Priority:
      1) If query looks like a ticker (e.g. AAPL or $AAPL) return that.
      2) If local `stock_database.json` exists, search it (exact, substring, fuzzy).
      3) If Alpha Vantage key provided, call SYMBOL_SEARCH and return results.

    Returns a list of dicts: {'symbol': 'AAPL', 'name': 'Apple Inc.'}
    """
    if not query:
        return []

    q = query.strip()
    # symbol-like quick path
    if _is_symbol_like(q):
        if q.startswith('$'):
            q = q[1:]
        return [{'symbol': q.upper(), 'name': None}]

    # try local db
    db = _load_local_db()
    if db:
        local = _search_local(q, db, max_results=max_results)
        if local:
            return local

    # fallback to Alpha Vantage
    if alpha_key:
        remote = _alpha_vantage_search(q, alpha_key, max_results=max_results)
        if remote:
            return remote

    return []


def get_company_info(ticker: str):
    """Return basic company info from yfinance for a ticker (best-effort)."""
    try:
        import yfinance as yf
        t = yf.Ticker(ticker)
        info = {}
        try:
            info = t.info or {}
        except Exception:
            # some yfinance versions raise when accessing .info; try fast_info
            try:
                fi = getattr(t, 'fast_info', None)
                if fi:
                    info = fi
            except Exception:
                info = {}

        return {
            'symbol': ticker,
            'companyName': info.get('longName') or info.get('shortName') or ticker,
            'sector': info.get('sector'),
            'industry': info.get('industry'),
            'logo': info.get('logo_url') or info.get('logo'),
            'summary': info.get('longBusinessSummary')
        }
    except Exception:
        return {'symbol': ticker}
