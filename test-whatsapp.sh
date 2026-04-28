#!/bin/bash

# WhatsApp Webhook Test Script
# Tests the Twilio WhatsApp integration

echo "=========================================="
echo "WhatsApp Webhook Test"
echo "=========================================="

# Configuration
WEBHOOK_URL="http://localhost:3000/api/webhooks/twilio"
FROM_NUMBER="+1234567890"
MESSAGE="Hello! I need help with my order."

echo ""
echo "Testing WhatsApp webhook..."
echo "URL: $WEBHOOK_URL"
echo "From: $FROM_NUMBER"
echo "Message: $MESSAGE"
echo ""

# Simulate Twilio webhook
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=whatsapp:$FROM_NUMBER" \
  -d "Body=$MESSAGE" \
  -d "MessageSid=SM1234567890abcdef" \
  -v

echo ""
echo "=========================================="
echo "Test Complete"
echo "=========================================="
echo ""
echo "Check the terminal running 'npm run dev'"
echo "You should see [v0] debug logs"
