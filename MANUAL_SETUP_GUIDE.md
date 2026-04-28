# CRM Dashboard - Complete Manual Setup Guide

> **TL;DR**: Create accounts on 5 services, get API keys, add to Vercel env vars, deploy. Total time: 30-45 minutes.

---

## 📋 Services You Need (Free Tier)

| Service | Purpose | Free Tier | Setup Time |
|---------|---------|-----------|-----------|
| **Neon** | PostgreSQL Database | 10 GB storage, 1 project | 5 min |
| **Anthropic** | Claude AI | $5 free credit | 2 min |
| **Twilio** | WhatsApp Messages | Sandbox, unlimited to verified numbers | 15 min |
| **Google Cloud** | Gmail Integration | OAuth, free tier | 10 min |
| **Vercel** | Hosting & Cron Jobs | Unlimited deployments | Already have it |

---

## ✅ Step 1: Neon PostgreSQL Database (5 minutes)

### 1.1 Create Neon Account
1. Go to https://neon.tech
2. Click **Sign Up**
3. Sign in with GitHub (recommended) or email
4. Click **Create a project**
5. Name it: `crm-dashboard`
6. Keep default settings (PostgreSQL 16, US East)
7. Click **Create project**

### 1.2 Get Database URL
1. Your database is now created
2. You'll see a **Connection String** that looks like:
   ```
   postgresql://user:password@ep-xxxxx.neon.tech/dbname?sslmode=require
   ```
3. **Copy this entire URL** - this is your `NEON_DATABASE_URL`

### 1.3 Test Connection (Optional)
```bash
# Install psql if you don't have it, then:
psql "postgresql://user:password@ep-xxxxx.neon.tech/dbname?sslmode=require" -c "SELECT 1;"
```

✅ **Saved**: `NEON_DATABASE_URL`

---

## ✅ Step 2: Anthropic Claude API Key (2 minutes)

### 2.1 Create Anthropic Account
1. Go to https://console.anthropic.com
2. Click **Sign Up**
3. Complete email verification
4. Add billing method (you get $5 free credit first)

### 2.2 Get API Key
1. Go to https://console.anthropic.com/account/keys
2. Click **Create Key**
3. Name it: `crm-dashboard`
4. **Copy the key** - looks like `sk-ant-...`
5. Store it safely (you can only see it once)

✅ **Saved**: `ANTHROPIC_API_KEY=sk-ant-...`

---

## ✅ Step 3: Twilio WhatsApp Sandbox (15 minutes)

**See `/TWILIO_SETUP.md` for detailed step-by-step instructions**

Quick summary:
1. Create Twilio account at https://www.twilio.com/try-twilio
2. Get Account SID & Auth Token from console
3. Set up WhatsApp Sandbox
4. Connect your phone to sandbox
5. Get your phone number

✅ **Saved**:
- `TWILIO_ACCOUNT_SID=AC...`
- `TWILIO_AUTH_TOKEN=...`
- `TWILIO_WHATSAPP_SANDBOX_NUMBER=+14155238886`
- `TWILIO_USER_PHONE_NUMBER=+1234567890` (your phone)

---

## ✅ Step 4: Google Cloud OAuth (Gmail Integration) (10 minutes)

### 4.1 Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. Click **Create Project**
4. Name it: `CRM Dashboard`
5. Click **Create**
6. Wait 30 seconds for creation

### 4.2 Enable Gmail API
1. In the search bar, search for **"Gmail API"**
2. Click **Gmail API**
3. Click **Enable**
4. You'll see a message "Create credentials to get started"

### 4.3 Create OAuth Credentials
1. Click **Create Credentials** (blue button)
2. Choose:
   - **Application type**: Web application
   - **Name**: `CRM Dashboard OAuth`
3. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:3000/api/auth/google/callback
   https://your-vercel-domain.vercel.app/api/auth/google/callback
   ```
   (Replace `your-vercel-domain` with your actual Vercel deployment domain)
4. Click **Create**
5. You'll see a popup with:
   - **Client ID**: Copy this
   - **Client Secret**: Copy this
6. Click **Download JSON** to save backup

✅ **Saved**:
- `GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com`
- `GOOGLE_CLIENT_SECRET=xxxxx`

### 4.4 Enable Required APIs
1. Go back to Cloud Console
2. Search for **"Gmail API"** and enable it
3. Search for **"Google Drive API"** and enable it (for attachments)
4. Search for **"Gmail Send API"** (it's part of Gmail API)

---

## 📝 All Environment Variables

Create a file `.env.local` in your project root with all these:

```env
# Database
NEON_DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname?sslmode=require

# AI
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_SANDBOX_NUMBER=+14155238886
TWILIO_USER_PHONE_NUMBER=+1234567890

# Google OAuth (Gmail)
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🚀 Adding to Vercel

### Step 1: Connect GitHub (if not already)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings > Git**
4. Connect your GitHub repo if needed

### Step 2: Add Environment Variables
1. In Vercel Dashboard, go to **Settings > Environment Variables**
2. For each variable above, click **Add**
3. Paste the name and value
4. Make sure to add to **Production** and **Preview** environments

### Step 3: Deploy
1. Push your code to GitHub (or Vercel syncs automatically)
2. Vercel will automatically deploy
3. Grab your deployed URL (e.g., `https://crm-dashboard.vercel.app`)

### Step 4: Update Google OAuth Redirect URI
1. Go back to Google Cloud Console
2. Go to **Credentials**
3. Edit the OAuth credentials
4. Add your Vercel domain:
   ```
   https://your-vercel-domain.vercel.app/api/auth/google/callback
   ```

---

## 🔧 Initial Database Setup

Once deployed, run the database setup script:

```bash
# Local development
npm run db:setup

# Or if using Vercel Functions:
# Database will auto-initialize on first API call
```

The system will automatically create all tables:
- `customers` - Customer profiles
- `conversations` - Chat sessions
- `messages` - Individual messages
- `tickets` - Support tickets
- `escalations` - Escalated cases
- `ai_interactions` - AI agent logs
- `sentiment_analysis` - Message sentiment
- `reports` - Daily/weekly reports

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# 1. Test Database Connection
psql $NEON_DATABASE_URL -c "SELECT 1;"

# 2. Test Local Development
npm install
npm run dev
# Visit http://localhost:3000

# 3. Test AI Integration
# Send a message in the dashboard, should get AI response

# 4. Test WhatsApp
# Send message to WhatsApp sandbox number, should receive response

# 5. Test Email Integration
# Visit /api/test/email endpoint, should send test email
```

---

## 📊 Cost Breakdown (Free Tier)

| Service | Free Tier | Paid (if needed) |
|---------|-----------|-----------------|
| Neon | 10 GB storage | $20/month |
| Anthropic | $5 credit | $0.80 per 1M input tokens |
| Twilio | Sandbox unlimited | $0.004 per message |
| Google | Free tier | $0 (Gmail is free) |
| Vercel | Unlimited deploys | $20/month (Pro) |
| **Total** | **$0/month** | **~$100/month at scale** |

---

## 🎯 Next Steps

1. ✅ Complete manual setup above
2. ✅ Add all env vars to `.env.local`
3. ✅ Run `npm install && npm run dev`
4. ✅ Test the dashboard at http://localhost:3000
5. ✅ Verify WhatsApp messages work
6. ✅ Push to GitHub
7. ✅ Deploy to Vercel
8. ✅ Add env vars to Vercel
9. ✅ Test production

---

## 🆘 Need Help?

### Neon Issues
- **Connection refused**: Make sure firewall allows Neon IPs
- **Auth failed**: Check DATABASE_URL has no typos
- https://neon.tech/docs

### Anthropic Issues
- **API key invalid**: Make sure you copied the whole key
- **Rate limited**: Free tier has limits, wait a bit
- https://console.anthropic.com/docs

### Twilio Issues
- **See TWILIO_SETUP.md** for detailed troubleshooting

### Google OAuth Issues
- **Redirect URI mismatch**: Make sure URL in Google Cloud matches your deployed domain
- **OAuth consent screen**: Make sure you added test users
- https://cloud.google.com/docs/authentication

---

## 💡 Pro Tips

1. **Use .env.local for local dev** - Never commit real keys
2. **Use Vercel Dashboard for prod env vars** - More secure
3. **Test locally first** - Before deploying to Vercel
4. **Keep API keys safe** - Rotate Twilio tokens if you accidentally commit
5. **Monitor costs** - Check Anthropic usage regularly (free credit runs out)
