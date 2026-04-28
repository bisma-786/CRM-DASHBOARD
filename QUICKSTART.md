# Quick Start Guide

Get the CRM Digital FTE Factory running in 5 minutes!

## 🚀 Quick Setup

### 1. Clone and Install

```bash
git clone https://github.com/bisma-786/Hackathon-5-CRM.git
cd Hackathon-5-CRM
pnpm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Start Services

**Option A: Using Docker Compose (Recommended)**

```bash
docker-compose up -d
```

**Option B: Manual Start**

```bash
# Terminal 1: Start backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 2: Start frontend
pnpm dev
```

### 4. Initialize Database

```bash
psql $DATABASE_URL < scripts/001-create-schema.sql
psql $DATABASE_URL < scripts/002-seed-data.sql
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Support Form**: http://localhost:3000/support

## 🎯 Test the Web Support Form

1. Navigate to http://localhost:3000/support
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. Click "Submit Request"
4. You should see a success message with a conversation ID

## 📝 Required Environment Variables

Minimum required variables to get started:

```env
# Database (Required)
DATABASE_URL=postgresql://user:pass@host/db

# OpenAI (Required for AI features)
OPENAI_API_KEY=sk-...

# Kafka (Optional for local dev)
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
```

## 🔧 Troubleshooting

### Backend won't start
- Check DATABASE_URL is correct
- Ensure Python 3.10+ is installed
- Verify all dependencies installed: `pip list`

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check Node.js version: `node --version` (should be 18+)

### Database connection fails
- Verify DATABASE_URL format
- Check network connectivity to Neon
- Ensure database exists

### Kafka errors
- Start Kafka: `docker-compose up -d kafka zookeeper`
- Check Kafka is running: `docker ps | grep kafka`

## 📚 Next Steps

1. **Configure Integrations**
   - Set up Gmail API credentials
   - Configure Twilio for WhatsApp
   - Add knowledge base entries

2. **Explore the Dashboard**
   - View conversations at `/conversations`
   - Manage tickets at `/tickets`
   - Check analytics at `/analytics`

3. **Test Multi-Channel**
   - Send test email
   - Send WhatsApp message
   - Submit web form

4. **Deploy to Production**
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide

## 🆘 Need Help?

- Check [README.md](README.md) for detailed documentation
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Open an issue on GitHub

## 🎉 You're Ready!

The CRM Digital FTE Factory is now running. Start by testing the Web Support Form at http://localhost:3000/support
