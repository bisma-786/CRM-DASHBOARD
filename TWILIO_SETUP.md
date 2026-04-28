# Twilio WhatsApp Sandbox Setup Guide

## 🎯 What You Need to Do (Manual Steps)

### Step 1: Create Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up with your email
3. Verify your email address
4. Complete account setup (name, company, etc.)

### Step 2: Get Your Twilio Credentials
1. Go to Twilio Console: https://console.twilio.com/
2. In the left sidebar, click **Messaging > Services** OR go to **Account > API keys & tokens**
3. You'll see:
   - **Account SID**: Looks like `AC...` (save this)
   - **Auth Token**: Long string below Account SID (save this)
4. Keep these safe! Don't commit them to Git.

### Step 3: Set Up WhatsApp Sandbox
1. In Twilio Console, go to **Messaging > Try it out > Send an SMS** or **Messaging > Try WhatsApp**
2. Click **Get Started with WhatsApp**
3. You'll see a **Sandbox Number** (e.g., `+1 415 523 8886`)
4. You'll also see a **Join Code** (e.g., `join my-code-here`)
5. **Save the Sandbox Phone Number**

### Step 4: Connect Your Phone to Sandbox
1. Open WhatsApp on your phone
2. Send a message to the **Sandbox Number** with the **Join Code**
   - Example: Message `+1 415 523 8886` with text `join my-code-here`
3. You'll get a confirmation message from Twilio
4. Now your phone is connected to the Twilio sandbox!

### Step 5: Get Your Phone Number
1. In the WhatsApp Sandbox setup page, copy your **actual phone number** (where you sent the join message)
2. **Save this phone number** (with country code, e.g., `+1234567890`)

### Step 6: Create a Messaging Service (Optional but Recommended)
1. Go to **Messaging > Services**
2. Click **Create Messaging Service**
3. Name it: `crm-messaging-service`
4. Select **Messaging Service Type: Transactional**
5. Click **Create**
6. In the service, click **Sender Pools > Add Senders**
7. Add your WhatsApp Sandbox Number
8. **Save the Service SID** (looks like `MG...`)

---

## 📝 Environment Variables to Add

After completing the above steps, add these to your `.env.local` and Vercel project settings:

```env
# Twilio Credentials
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_SANDBOX_NUMBER=+1415523xxxx
TWILIO_USER_PHONE_NUMBER=+1234567890

# Optional (if using Messaging Service)
TWILIO_MESSAGING_SERVICE_SID=MG...

# Other APIs
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
NEON_DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname
```

---

## 🚀 How to Add to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings > Environment Variables**
4. Add each variable above as a new entry
5. Click **Save**
6. Redeploy your project (it will use the new env vars)

---

## ✅ Testing Your Setup

Once deployed, the CRM will:
1. Send test WhatsApp messages to your phone (TWILIO_USER_PHONE_NUMBER)
2. Receive messages from your phone to the sandbox
3. Process them through the AI agent

**Test by sending a WhatsApp message to the Sandbox Number with:**
- `Hello, I have a problem with order 123`
- The system will respond with AI-generated customer service

---

## 🆘 Troubleshooting

### "Sandbox expired" error
- Sandbox sessions expire if no messages sent/received in 24 hours
- Solution: Send `join my-code-here` again to re-activate

### "Invalid phone number" error
- Make sure you're using international format: `+[country code][number]`
- Example: `+12125551234` (not `2125551234`)

### "Auth failed" error
- Double-check Account SID and Auth Token
- Make sure there are no extra spaces
- Regenerate tokens if needed

### Messages not sending
- Verify phone number is connected to sandbox
- Check Twilio Console Logs: **Monitoring > Logs > Messages**

---

## 💡 Free Tier Limits

- **WhatsApp Sandbox**: Free, unlimited messages to verified users
- **Sending to unverified numbers**: Requires WhatsApp Business Account ($5/month)
- **For hackathon**: Sandbox is perfect - you can test unlimited with your own phone

---

## Next Steps

Once you've completed these steps:
1. Add the environment variables to `.env.local` (for local testing)
2. Add them to Vercel project settings (for production)
3. The CRM dashboard will automatically send/receive WhatsApp messages
