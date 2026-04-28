#!/bin/bash

# Email Webhook Test Script
# Tests the email integration

echo "=========================================="
echo "Email Webhook Test"
echo "=========================================="

# Configuration
WEBHOOK_URL="http://localhost:3000/api/webhooks/email"
FROM_EMAIL="customer@example.com"
TO_EMAIL="support@crm.local"
SUBJECT="Need help with my account"
BODY="I can't access my account and need assistance."

echo ""
echo "Testing email webhook..."
echo "URL: $WEBHOOK_URL"
echo "From: $FROM_EMAIL"
echo "To: $TO_EMAIL"
echo "Subject: $SUBJECT"
echo "Body: $BODY"
echo ""

# Simulate email webhook
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"from\": \"$FROM_EMAIL\",
    \"to\": \"$TO_EMAIL\",
    \"subject\": \"$SUBJECT\",
    \"text\": \"$BODY\",
    \"messageId\": \"msg-$(date +%s)\"
  }" \
  -v

echo ""
echo "=========================================="
echo "Test Complete"
echo "=========================================="
echo ""
echo "Check the terminal running 'npm run dev'"
echo "You should see [v0] debug logs"
