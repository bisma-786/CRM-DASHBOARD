# Webhook Setup Guide

## WhatsApp Integration (Twilio)

### 1. Verify Twilio Credentials
Ensure these are in your `.env.local`:
```
TWILIO_ACCOUNT_SID=AC9adce2f9c9fbb841a3c930fe6e9d41aa
TWILIO_AUTH_TOKEN=f701e4099fac8b43cd0384206727f448
TWILIO_WHATSAPP_SANDBOX_NUMBER=+14155238886
TWILIO_USER_PHONE_NUMBER=+1234567890
```

### 2. Configure Twilio Webhook
After deploying to Vercel:

1. Go to https://console.twilio.com/
2. Navigate to **Messaging → WhatsApp → Sandbox Settings**
3. Under "When a message comes in", set:
   - **URL**: `https://your-vercel-url.vercel.app/api/webhooks/twilio`
   - **Method**: POST
4. Click Save

### 3. Test WhatsApp
1. Send a WhatsApp message to `+14155238886` from your phone
2. Check Vercel logs for webhook activity
3. You should receive an AI-powered response

### 4. Troubleshooting WhatsApp

**Issue**: No response received
- Check Vercel logs: `vercel logs --tail`
- Verify Twilio credentials in env vars
- Confirm webhook URL is correct in Twilio console
- Make sure phone number format is correct (start with +)

**Issue**: Error in logs
- Check ANTHROPIC_API_KEY is set
- Verify TWILIO_ACCOUNT_SID and AUTH_TOKEN are correct
- Ensure message content is not empty

**Enable Debug Logging**:
The webhook logs all activity with `[v0]` prefix. Watch the logs:
```bash
vercel logs -f
```

---

## Email Integration

### 1. Email Webhook Endpoint
URL: `https://your-vercel-url.vercel.app/api/webhooks/email`

This endpoint accepts POST requests with email data:
```json
{
  "from": "customer@example.com",
  "to": "support@yourcompany.com",
  "subject": "Help with my order",
  "text": "I need help with my recent order",
  "html": "<p>I need help with my recent order</p>",
  "messageId": "msg123"
}
```

### 2. Connect Gmail (Optional - Future Enhancement)
To automatically receive emails:

1. Set up Gmail filters to forward support emails
2. Use a service like Zapier or SendGrid to webhook incoming emails
3. Point to: `https://your-vercel-url.vercel.app/api/webhooks/email`

### 3. Test Email Webhook
Using curl:
```bash
curl -X POST https://your-vercel-url.vercel.app/api/webhooks/email \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@example.com",
    "to": "support@example.com",
    "subject": "Test",
    "text": "Hello, I need help",
    "messageId": "test123"
  }'
```

---

## Webhook Architecture

### WhatsApp Flow
```
Customer sends WhatsApp message
         ↓
Twilio receives message
         ↓
Twilio sends POST to /api/webhooks/twilio
         ↓
Code gets AI response from Claude
         ↓
Code sends AI response back via Twilio
         ↓
Customer receives AI response
```

### Email Flow
```
Customer sends email (via Gmail, SendGrid, etc.)
         ↓
Service sends POST to /api/webhooks/email
         ↓
Code gets AI response from Claude
         ↓
In production: Email response sent back
         ↓
Customer receives AI response
```

---

## Monitoring & Debugging

### View Logs
```bash
# Stream live logs
vercel logs --tail

# View specific function logs
vercel logs --function=webhooks-twilio
```

### Check Webhook Status
Logs include:
- `[v0] ===== TWILIO WEBHOOK RECEIVED =====` - Webhook received
- `[v0] Extracted phone:` - Phone number extracted
- `[v0] Getting AI response...` - AI processing started
- `[v0] Claude response:` - AI response received
- `[v0] Sending WhatsApp response...` - Sending to user
- `[v0] WhatsApp sent:` - Message sent successfully

### Common Issues

| Issue | Solution |
|-------|----------|
| 403 Unauthorized | Check Twilio credentials |
| Empty responses | Check ANTHROPIC_API_KEY |
| Messages not arriving | Verify webhook URL in Twilio console |
| Timeout errors | Claude API might be slow, check rate limits |
| Phone number format | Ensure format is `+1234567890` |

---

## Environment Variables Required

For WhatsApp:
- `TWILIO_ACCOUNT_SID` - From Twilio console
- `TWILIO_AUTH_TOKEN` - From Twilio console
- `TWILIO_WHATSAPP_SANDBOX_NUMBER` - +14155238886 (sandbox)
- `TWILIO_USER_PHONE_NUMBER` - Your phone for testing

For AI:
- `ANTHROPIC_API_KEY` - From Anthropic console

---

## Production Checklist

- [ ] Twilio webhook URL updated in console
- [ ] All env vars set in Vercel project
- [ ] Webhook endpoints returning 200 OK
- [ ] Logs showing successful message flow
- [ ] AI responses are intelligent and helpful
- [ ] Error handling in place
- [ ] Rate limiting considered
- [ ] Phone numbers validated

---

## Next Steps

1. Deploy to Vercel: `git push origin master`
2. Update Twilio webhook URL
3. Send test WhatsApp message
4. Monitor logs for successful flow
5. For email: Set up forwarding service (optional)

Questions? Check the logs with `vercel logs --tail`
