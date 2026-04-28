# CRM API Documentation

## Base URL
```
https://your-vercel-url.vercel.app/api
```

## Endpoints

### Customers

#### GET /customers
Get all customers
```bash
curl https://your-vercel-url.vercel.app/api/customers
```

**Response:**
```json
[
  {
    "id": 1,
    "email": "customer@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "company": "Acme Inc",
    "status": "active",
    "sentiment_score": 0.5,
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /customers
Create a new customer
```bash
curl -X POST https://your-vercel-url.vercel.app/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new@example.com",
    "name": "Jane Smith",
    "phone": "+1987654321",
    "company": "Tech Corp"
  }'
```

### Conversations

#### GET /conversations
Get all conversations
```bash
curl https://your-vercel-url.vercel.app/api/conversations
```

#### GET /conversations?customerId=1
Get conversations for a specific customer
```bash
curl https://your-vercel-url.vercel.app/api/conversations?customerId=1
```

#### POST /conversations
Create a new conversation
```bash
curl -X POST https://your-vercel-url.vercel.app/api/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "channel": "whatsapp",
    "status": "open"
  }'
```

### Messages

#### GET /messages?conversationId=1
Get messages from a conversation
```bash
curl https://your-vercel-url.vercel.app/api/messages?conversationId=1
```

#### POST /messages
Create a new message
```bash
curl -X POST https://your-vercel-url.vercel.app/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": 1,
    "sender_type": "customer",
    "content": "Hello, I need help",
    "sentiment": "neutral"
  }'
```

### Tickets

#### GET /tickets
Get all tickets
```bash
curl https://your-vercel-url.vercel.app/api/tickets
```

#### GET /tickets?customerId=1
Get tickets for a specific customer
```bash
curl https://your-vercel-url.vercel.app/api/tickets?customerId=1
```

#### POST /tickets
Create a new ticket
```bash
curl -X POST https://your-vercel-url.vercel.app/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "title": "Payment Issue",
    "description": "Customer cannot process payment",
    "priority": "high",
    "category": "billing"
  }'
```

#### PUT /tickets
Update a ticket
```bash
curl -X PUT https://your-vercel-url.vercel.app/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "resolved",
    "priority": "low",
    "assigned_to": "John Agent"
  }'
```

### Reports

#### GET /reports?days=30
Get reports for the last 30 days
```bash
curl https://your-vercel-url.vercel.app/api/reports?days=30
```

**Response:**
```json
{
  "reports": [...],
  "metrics": {
    "total_customers": 10,
    "total_conversations": 25,
    "total_messages": 150,
    "total_tickets": 5,
    "resolved_tickets": 3,
    "high_priority_tickets": 1,
    "avg_sentiment": 0.45
  }
}
```

### Webhooks

#### POST /webhooks/twilio
Receive WhatsApp messages from Twilio

Configure in Twilio Console:
- Webhook URL: `https://your-vercel-url.vercel.app/api/webhooks/twilio`
- Method: POST

**Automatic Operations:**
1. Extract customer phone number
2. Find or create customer
3. Find or create conversation
4. Store incoming message
5. Process with Claude AI
6. Send response via WhatsApp

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

- Free tier: 1,000 requests/hour
- Upgrade for higher limits

## Authentication

Currently no authentication required for local/internal use.

For production, consider adding:
1. API key authentication
2. JWT tokens
3. Rate limiting by IP/API key

## Error Responses

```json
{
  "error": "Descriptive error message"
}
```

## Testing

### Using curl
```bash
# Test API is running
curl https://your-vercel-url.vercel.app/api/customers

# Test database connection
curl https://your-vercel-url.vercel.app/api/reports
```

### Using Postman
1. Import these endpoints
2. Set variables for base URL
3. Test each endpoint

### Using Python
```python
import requests

base_url = "https://your-vercel-url.vercel.app/api"

# Get customers
response = requests.get(f"{base_url}/customers")
print(response.json())

# Create customer
customer_data = {
    "email": "test@example.com",
    "name": "Test User",
    "phone": "+1234567890"
}
response = requests.post(f"{base_url}/customers", json=customer_data)
print(response.json())
```

## Webhook Events

### Twilio WhatsApp Message
Triggered when customer sends WhatsApp message

**Flow:**
1. Message received from Twilio
2. Customer created/found
3. Conversation created/found
4. Message stored
5. AI processes message
6. Response stored
7. Response sent back via WhatsApp

**Example Flow Time:** 1-2 seconds

## Rate Limits by Endpoint

| Endpoint | Limit | Window |
|----------|-------|--------|
| /customers | 100 | 1 min |
| /conversations | 100 | 1 min |
| /messages | 500 | 1 min |
| /tickets | 100 | 1 min |
| /reports | 50 | 1 min |
| /webhooks/* | Unlimited | - |
