# ⚡ Quick Deploy Guide (10 minutes)

## TL;DR

```bash
# 1. Push to GitHub (2 min)
git add . && git commit -m "CRM ready" && git push origin main

# 2. Deploy on Vercel.com (3 min)
# - Go to https://vercel.com/new
# - Import your GitHub repo
# - Add env vars (copy from .env.local)
# - Click Deploy

# 3. Configure Twilio (2 min)
# - Update webhook URL to your Vercel URL
# - Test WhatsApp message

# 4. Verify (3 min)
# - Open https://your-app.vercel.app
# - Test API: curl https://your-app.vercel.app/api/customers
# - Send WhatsApp test message
```

Done! Your CRM is live. 🚀

---

## Step-by-Step

### 1️⃣ Prepare Code (2 minutes)

```bash
# Ensure you have a GitHub account
# Create new repository: crm-dashboard

# From project directory
git init
git add .
git commit -m "CRM dashboard - production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crm-dashboard.git
git push -u origin main
```

✅ **Verify:** Repository visible on GitHub

---

### 2️⃣ Deploy to Vercel (3 minutes)

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Select repository
4. Click "Import"

**Configuration Screen:**
- Framework: Next.js ✓ (auto-detected)
- Root Directory: ./ ✓ (default)

**Environment Variables:**
Add these (from your `.env.local`):
```
NEON_DATABASE_URL = postgresql://...
ANTHROPIC_API_KEY = sk-ant-...
TWILIO_ACCOUNT_SID = AC...
TWILIO_AUTH_TOKEN = ...
TWILIO_WHATSAPP_SANDBOX_NUMBER = +14155238886
TWILIO_USER_PHONE_NUMBER = +1234567890
```

5. Click "Deploy"
6. Wait 2-3 minutes

✅ **Verify:** See "Deployment Complete" message

---

### 3️⃣ Configure Twilio (2 minutes)

1. Go to Twilio Console
2. Messaging → Try it out → Send a message
3. Scroll to "Webhook URL"
4. Replace URL:
   ```
   From: http://localhost:3000/api/webhooks/twilio
   To:   https://your-app-xxx.vercel.app/api/webhooks/twilio
   ```
5. Save

✅ **Verify:** Webhook URL shows your Vercel domain

---

### 4️⃣ Verify Everything (3 minutes)

**Check 1: Dashboard**
```
Open: https://your-app-xxx.vercel.app
Expected: Dashboard loads with metrics
```

**Check 2: API**
```bash
curl https://your-app-xxx.vercel.app/api/customers
# Should return: [] (empty array or customer list)
```

**Check 3: Twilio**
```
Send WhatsApp message to sandbox number
Wait 2-3 seconds
Expected: AI response received
```

✅ **Verify:** All three checks pass

---

## Your URLs

After deployment, you'll have:

| Component | URL |
|-----------|-----|
| Dashboard | https://crm-dashboard-xxxxx.vercel.app |
| API | https://crm-dashboard-xxxxx.vercel.app/api |
| Customers | https://crm-dashboard-xxxxx.vercel.app/customers |
| Tickets | https://crm-dashboard-xxxxx.vercel.app/tickets |
| Webhook | https://crm-dashboard-xxxxx.vercel.app/api/webhooks/twilio |

---

## Environment Variables Checklist

Before clicking Deploy in Vercel, have these ready:

- [ ] NEON_DATABASE_URL
- [ ] ANTHROPIC_API_KEY
- [ ] TWILIO_ACCOUNT_SID
- [ ] TWILIO_AUTH_TOKEN
- [ ] TWILIO_WHATSAPP_SANDBOX_NUMBER
- [ ] TWILIO_USER_PHONE_NUMBER

**Find missing ones?**
- Neon: https://console.neon.tech
- Anthropic: https://console.anthropic.com
- Twilio: https://www.twilio.com/console

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Vercel logs, verify env vars |
| Dashboard blank | Check browser console, check API endpoint |
| API returns error | Verify database URL in env vars |
| Twilio no response | Check webhook URL in Twilio console |
| AI responses empty | Verify ANTHROPIC_API_KEY is set |

**Check logs:**
```bash
vercel logs --tail
```

---

## After Deployment

### Monitor
- Vercel Dashboard: Usage, errors, deployments
- Neon Console: Database health, usage
- Twilio Console: Message logs, webhook status
- Anthropic Console: API usage, credits

### Next Features
- Email integration
- Web form channel
- Custom workflows
- Team management

---

## Cost Check (First Month)

✅ All free tiers:
- Vercel: Free (100GB bandwidth)
- Neon: Free (3 projects, 10GB storage)
- Anthropic: Free credits (new account)
- Twilio: Free sandbox (limited use)

**Estimated cost: $0**

---

## Support

**If something doesn't work:**

1. Check [FINAL_CHECKLIST.md](./FINAL_CHECKLIST.md)
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Check [API.md](./API.md)
4. Check [PROJECT_README.md](./PROJECT_README.md)

---

## Done! 🎉

Your AI-powered CRM is now live on Vercel!

**Next:** Send a WhatsApp message to test the AI agent in action.

---

**Time spent:** ~10 minutes
**Result:** Production-ready CRM with AI
**Cost:** ~$0/month (MVP)
**Savings:** $72,960/year vs hiring FTE
