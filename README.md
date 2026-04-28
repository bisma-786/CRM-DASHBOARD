# CRM Digital FTE Factory

A 24/7 AI-powered Customer Success agent system for multi-channel customer support. Built for the Hackathon 5 competition.

## 🚀 Features

- **Multi-Channel Support**: Email (Gmail), WhatsApp (Twilio), and Web Form
- **AI-Powered Responses**: OpenAI Agents SDK for intelligent customer interactions
- **Unified CRM**: PostgreSQL-based customer relationship management
- **Event-Driven Architecture**: Kafka for asynchronous message processing
- **Real-Time Dashboard**: Next.js dashboard with live metrics and conversation tracking
- **Scalable Deployment**: Kubernetes for backend, Vercel for frontend

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **UI Library**: Radix UI + Tailwind CSS
- **Data Fetching**: SWR for real-time updates
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (Neon)
- **Event Streaming**: Apache Kafka
- **AI Engine**: OpenAI Agents SDK
- **Deployment**: Kubernetes

### Integrations
- **Email**: Gmail API with OAuth 2.0
- **WhatsApp**: Twilio API
- **AI**: OpenAI GPT-4

## 🏗️ Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/              # API routes
│   └── support/          # Support form page
├── backend/               # FastAPI backend
│   ├── api/              # REST endpoints
│   ├── database/         # Database repositories
│   ├── handlers/         # Channel handlers
│   ├── integrations/     # External API clients
│   ├── kafka/            # Kafka producers/consumers
│   ├── models/           # Pydantic models
│   └── services/         # Business logic
├── components/            # React components
│   ├── support/          # Web Support Form
│   └── ui/               # UI components
├── lib/                   # Utilities
└── scripts/              # Database scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.10+
- PostgreSQL (or Neon account)
- Kafka cluster
- API keys for:
  - OpenAI
  - Gmail (OAuth credentials)
  - Twilio
  - Neon Database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bisma-786/Hackathon-5-CRM.git
   cd Hackathon-5-CRM
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

5. **Initialize the database**
   ```bash
   psql $DATABASE_URL < scripts/001-create-schema.sql
   psql $DATABASE_URL < scripts/002-seed-data.sql
   ```

### Running Locally

1. **Start the backend**
   ```bash
   cd backend
   python main.py
   ```
   Backend will run on `http://localhost:8000`

2. **Start the frontend**
   ```bash
   pnpm dev
   ```
   Frontend will run on `http://localhost:3000`

3. **Start Kafka** (if running locally)
   ```bash
   # Using Docker Compose
   docker-compose up -d kafka zookeeper
   ```

## 📝 Environment Variables

See `.env.example` for all required environment variables.

### Required Variables

- `DATABASE_URL`: PostgreSQL connection string (Neon)
- `OPENAI_API_KEY`: OpenAI API key
- `TWILIO_ACCOUNT_SID`: Twilio account SID
- `TWILIO_AUTH_TOKEN`: Twilio auth token
- `GMAIL_CREDENTIALS_PATH`: Path to Gmail OAuth credentials JSON
- `KAFKA_BOOTSTRAP_SERVERS`: Kafka broker addresses

## 🎯 Key Components

### Web Support Form (REQUIRED Deliverable)

The Web Support Form is a fully functional React component located at:
- **Component**: `components/support/web-support-form.tsx`
- **Page**: `app/(dashboard)/support/page.tsx`
- **Features**:
  - Form validation with Zod
  - Real-time error handling
  - Success/error notifications
  - Responsive design with Radix UI

### Multi-Channel Handlers

- **Email Handler**: Polls Gmail API for new messages
- **WhatsApp Handler**: Receives Twilio webhooks
- **Web Form Handler**: Processes form submissions

### AI Agent Service

- Processes customer inquiries using OpenAI Agents SDK
- Maintains conversation context
- Queries knowledge base for relevant information
- Calculates sentiment scores
- Handles escalations

## 🚀 Deployment

### Frontend (Vercel)

```bash
vercel deploy
```

### Backend (Kubernetes)

```bash
kubectl apply -f k8s/
```

See `k8s/` directory for Kubernetes manifests.

## 📊 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Key Endpoints

- `POST /api/support/submit` - Submit web form
- `GET /api/conversations` - List conversations
- `GET /api/tickets` - List tickets
- `GET /api/customers` - List customers
- `POST /webhooks/gmail` - Gmail webhook
- `POST /webhooks/twilio` - Twilio webhook
- `GET /health` - Health check

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
pnpm test
```

## 📈 Monitoring

- **Health Check**: `GET /health`
- **Metrics**: `GET /metrics` (Prometheus format)
- **Logs**: JSON structured logging to stdout

## 🤝 Contributing

This is a hackathon project. For questions or issues, please open a GitHub issue.

## 📄 License

MIT License - see LICENSE file for details

## 🏆 Hackathon Information

- **Event**: Hackathon 5 - CRM Digital FTE Factory
- **Team**: [Your Team Name]
- **Repository**: https://github.com/bisma-786/Hackathon-5-CRM

## 📞 Support

For support, email: [your-email@example.com]

## 🙏 Acknowledgments

- OpenAI for the Agents SDK
- Twilio for WhatsApp integration
- Neon for PostgreSQL hosting
- Vercel for frontend hosting
