# EGREGORE Live Preview Setup

This demo shows live pattern detection zones on SOL to demonstrate EGREGORE's capabilities.

## Features

- **Real-time zone detection** for SOL on 4H timeframe
- **Auto-refreshes** every 10 seconds
- **Demo mode fallback** if server unavailable
- **Beautiful UI** matching Kerberos aesthetic

## Setup for Live Data

### Option 1: Update API URL

Edit `portfolio/demo.html` and change line 184:

```javascript
const API_BASE = 'https://your-egregore-server.onrender.com/api';
```

Replace with your actual EGREGORE server URL.

### Option 2: Deploy with Vercel

1. **Add demo.html to your Vercel deployment**
   - Already included if you deploy the `portfolio/` directory

2. **Deploy your EGREGORE server** (if not already):
   - Deploy `server.py` to a hosting service (Render, Railway, etc.)
   - Make sure `/api/zones` and `/api/ohlcv` endpoints are accessible

3. **Update the API_BASE** in `demo.html`

4. **Deploy to Vercel:**
   ```bash
   git add portfolio/
   git commit -m "Add EGREGORE live preview"
   git push
   ```

### Option 3: Use as Demo-Only (No Backend Required)

The demo works out of the box with mock data if no server is configured. Perfect for showing the concept without deploying backend.

## What It Shows

- **Current SOL price** (live or demo)
- **Top 9 detected zones** sorted by strength
- **Zone details:** Type, role (support/resistance), label
- **Strength percentage** for each zone

## Integration

Already added to main portfolio site with a **"🔴 Live Preview"** button on the EGREGORE product card.

Visitors click to see zones updating in real-time on SOL!

## Demo Mode

If the API endpoint is not accessible, it automatically shows:
- Sample zones with typical EGREGORE patterns
- Demo price (~$202.13)
- Notice that it's in demo mode

This lets people understand the system even if the server isn't running.

