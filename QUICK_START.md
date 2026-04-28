# ⚡ Quick Start - What You Need to Do

## 🎯 TL;DR

1. **Create 4 accounts** (30 min total)
2. **Get 5 API keys** (copy-paste into `.env.local`)
3. **Deploy to Vercel** (1 click)
4. **Done!** 🎉

---

## 📋 Checklist (In Order)

### Phase 1: Create Accounts (30 minutes)

#### ✅ Neon PostgreSQL (5 min)
- [ ] Go to https://neon.tech
- [ ] Sign up with GitHub
- [ ] Create project `crm-dashboard`
- [ ] **COPY**: Connection string → `NEON_DATABASE_URL`
- [ ] Open: `https://console.neon.tech` to verify

#### ✅ Anthropic Claude (2 min)
- [ ] Go to https://console.anthropic.com
- [ ] Sign up (requires credit card, but you get $5 free)
- [ ] Create API key
- [ ] **COPY**: Full API key → `ANTHROPIC_API_KEY`
- [ ] Keep safe (you can only see it once!)

#### ✅ Twilio WhatsApp (15 min)
**Follow detailed guide**: `TWILIO_SETUP.md`
- [ ] Create account: https://www.twilio.com/try-twilio
- [ ] Get Account SID → `TWILIO_ACCOUNT_SID`
- [ ] Get Auth Token → `TWILIO_AUTH_TOKEN`
- [ ] Set up WhatsApp Sandbox
- [ ] **COPY**: Sandbox number → `TWILIO_WHATSAPP_SANDBOX_NUMBER`
- [ ] Connect your phone to sandbox (send join code)
- [ ] **COPY**: Your phone number → `TWILIO_USER_PHONE_NUMBER`

#### ✅ Google Cloud OAuth (10 min)
- [ ] Go to https://console.cloud.google.com
- [ ] Create project `CRM Dashboard`
- [ ] Enable Gmail API
- [ ] Create OAuth 2.0 credentials
- [ ] **COPY**: Client ID → `GOOGLE_CLIENT_ID`
- [ ] **COPY**: Client Secret → `GOOGLE_CLIENT_SECRET`
- [ ] Add authorized redirect URI:
  - `http://localhost:3000/api/auth/google/callback` (for local testing)
  - `https://your-vercel-domain.vercel.app/api/auth/google/callback` (for production, replace domain)

---

### Phase 2: Setup Local Development (10 minutes)

#### ✅ Create `.env.local` File

Create file: `/vercel/share/v0-project/.env.local`

```env
# Copy-paste your values from Phase 1 above

# Database
NEON_DATABASE_URL=postgresql://user:pass@ep-xxxxx.neon.tech/dbname?sslmode=require

# AI
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_WHATSAPP_SANDBOX_NUMBER=+14155238886
TWILIO_USER_PHONE_NUMBER=+1234567890

# Google
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

#### ✅ Install & Run Locally

```bash
cd /vercel/share/v0-project

# Install dependencies
npm install

# Setup database (creates tables)
npm run db:setup

# Start development server
npm run dev

# Should see: ✓ Ready in XXXms
# Visit http://localhost:3000
```

#### ✅ Test It Works
- [ ] Visit http://localhost:3000
- [ ] Dashboard loads without errors
- [ ] Click "Send Test Message" → message sent to your WhatsApp
- [ ] Reply to WhatsApp message → appears in dashboard

---

### Phase 3: Deploy to Vercel (5 minutes)

#### ✅ Connect GitHub
- [ ] Push code to GitHub repo
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Import Project"
- [ ] Select your GitHub repo
- [ ] Click "Import"

#### ✅ Add Environment Variables to Vercel
1. In Vercel Dashboard, select your project
2. Go to **Settings → Environment Variables**
3. Add each variable from Phase 2:

| Variable | Value | Environment |
|----------|-------|-------------|
| NEON_DATABASE_URL | `postgresql://...` | Production + Preview |
| ANTHROPIC_API_KEY | `sk-ant-...` | Production + Preview |
| TWILIO_ACCOUNT_SID | `AC...` | Production + Preview |
| TWILIO_AUTH_TOKEN | `...` | Production + Preview |
| TWILIO_WHATSAPP_SANDBOX_NUMBER | `+14155238886` | Production + Preview |
| TWILIO_USER_PHONE_NUMBER | `+1234567890` | Production + Preview |
| GOOGLE_CLIENT_ID | `xxxxx.apps.googleusercontent.com` | Production + Preview |
| GOOGLE_CLIENT_SECRET | `xxxxx` | Production + Preview |
| NEXT_PUBLIC_APP_URL | `https://your-vercel-domain.vercel.app` | Production |
| NODE_ENV | `production` | Production |

#### ✅ Update Google OAuth Redirect URI
- [ ] Go back to https://console.cloud.google.com
- [ ] Find your OAuth credentials
- [ ] Add to **Authorized redirect URIs**:
  ```
  https://your-vercel-domain.vercel.app/api/auth/google/callback
  ```
  (Replace `your-vercel-domain` with actual domain from Vercel)

#### ✅ Deploy
- [ ] Vercel auto-deploys when you push to GitHub
- [ ] Or manually trigger in Vercel Dashboard
- [ ] Wait for deployment to complete
- [ ] Visit your Vercel domain
- [ ] Test WhatsApp messages work on production

---

## 🚀 You're Done!

Your CRM dashboard is now:
- ✅ Running locally
- ✅ Deployed to production on Vercel
- ✅ Connected to all APIs
- ✅ Ready to receive WhatsApp messages
- ✅ Processing with AI agent

---

## 🆘 If Something Goes Wrong

### "Connection refused" - Database error
```bash
# Check your DATABASE_URL
echo $NEON_DATABASE_URL

# Try connecting directly
psql $NEON_DATABASE_URL -c "SELECT 1;"
```
→ See `MANUAL_SETUP_GUIDE.md` Neon Troubleshooting

### "API key invalid" - Anthropic error
- Check ANTHROPIC_API_KEY has no typos
- Make sure you copied the FULL key
- Check the key hasn't expired

### WhatsApp not receiving messages
- Did you complete TWILIO_SETUP.md steps?
- Did you connect your phone to sandbox?
- Check phone number format: `+1234567890` (with +)
→ See `TWILIO_SETUP.md` Troubleshooting

### Google OAuth not working
- Make sure redirect URI matches EXACTLY (http vs https)
- Check CLIENT_ID and CLIENT_SECRET in env vars
- Verify you're using correct domain from Vercel
→ See `MANUAL_SETUP_GUIDE.md` Google Troubleshooting

---

## 📚 Documentation

- **Full Setup Guide**: `MANUAL_SETUP_GUIDE.md` (step-by-step for each service)
- **Twilio Details**: `TWILIO_SETUP.md` (WhatsApp sandbox setup)
- **Overall README**: `README.md` (features, architecture, etc.)
- **Project Guide**: `HACKATHON_REQUIREMENTS.md` (what you're building)

---

## ⏱️ Time Breakdown

| Phase | Task | Time |
|-------|------|------|
| 1 | Neon account | 5 min |
| 1 | Anthropic account | 2 min |
| 1 | Twilio WhatsApp setup | 15 min |
| 1 | Google OAuth setup | 10 min |
| 2 | Create .env.local | 5 min |
| 2 | npm install & test locally | 5 min |
| 3 | Connect GitHub & Deploy | 3 min |
| 3 | Add env vars to Vercel | 2 min |
| **TOTAL** | | **~47 minutes** |

---

## ✨ Next Steps

1. **Start with Phase 1** → Create accounts (grab your config.yaml file!)
2. **Move to Phase 2** → Setup local env vars and test
3. **Deploy in Phase 3** → Push to Vercel

Questions? Check the troubleshooting sections or look at the detailed guides linked above.

**Questions?**
- Neon issues → MANUAL_SETUP_GUIDE.md
- Twilio issues → TWILIO_SETUP.md  
- Google issues → MANUAL_SETUP_GUIDE.md
- General → README.md

---

## 🎉 Celebrate When...

- [ ] Phase 1: All 4 accounts created
- [ ] Phase 2: `npm run dev` works locally
- [ ] Phase 2: You receive a WhatsApp test message
- [ ] Phase 3: Production deployment succeeds
- [ ] Phase 3: Vercel domain receives WhatsApp messages

**You're ready to build! 🚀**
