#!/bin/bash

# CRM Dashboard Setup Script
# This script sets up the CRM dashboard for local development or deployment

set -e

echo "======================================"
echo "CRM Dashboard Setup"
echo "======================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install || pnpm install || yarn install

# Create .env.local
echo ""
echo "📝 Creating .env.local file..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update with your credentials"
else
    echo "✅ .env.local already exists"
fi

# Build the project
echo ""
echo "🔨 Building Next.js project..."
npm run build

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "Environment variables needed:"
echo "  - NEON_DATABASE_URL"
echo "  - ANTHROPIC_API_KEY"
echo "  - TWILIO_ACCOUNT_SID"
echo "  - TWILIO_AUTH_TOKEN"
echo "  - TWILIO_WHATSAPP_SANDBOX_NUMBER"
echo "  - TWILIO_USER_PHONE_NUMBER"
echo ""
