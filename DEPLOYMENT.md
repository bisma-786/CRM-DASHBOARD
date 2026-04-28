# Deployment Guide

This guide covers deploying the CRM Digital FTE Factory to production.

## Prerequisites

- Vercel account (for frontend)
- Kubernetes cluster (for backend)
- Neon PostgreSQL database
- Kafka cluster (managed or self-hosted)
- API credentials (OpenAI, Gmail, Twilio)

## Frontend Deployment (Vercel)

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the root directory

### 2. Configure Environment Variables

Add these environment variables in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
DATABASE_URL=your-neon-connection-string
```

### 3. Deploy

```bash
vercel deploy --prod
```

## Backend Deployment (Kubernetes)

### 1. Create Secrets

```bash
kubectl create secret generic crm-secrets \
  --from-literal=database-url='your-neon-url' \
  --from-literal=openai-api-key='your-openai-key' \
  --from-literal=twilio-account-sid='your-twilio-sid' \
  --from-literal=twilio-auth-token='your-twilio-token'
```

### 2. Apply Kubernetes Manifests

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/hpa.yaml
```

### 3. Deploy Kafka (if not using managed service)

```bash
kubectl apply -f k8s/kafka.yaml
kubectl apply -f k8s/kafka-topics.yaml
```

### 4. Verify Deployment

```bash
kubectl get pods
kubectl get services
kubectl logs -f deployment/crm-backend
```

## Database Setup

### 1. Run Migrations

```bash
psql $DATABASE_URL < scripts/001-create-schema.sql
psql $DATABASE_URL < scripts/002-seed-data.sql
```

### 2. Verify Tables

```bash
psql $DATABASE_URL -c "\dt"
```

## Post-Deployment

### 1. Configure Webhooks

**Gmail Push Notifications:**
- Set up Gmail API push notifications
- Point webhook to: `https://your-api.com/webhooks/gmail`

**Twilio WhatsApp:**
- Configure Twilio webhook URL
- Point to: `https://your-api.com/webhooks/twilio`

### 2. Test Endpoints

```bash
# Health check
curl https://your-api.com/health

# Submit test form
curl -X POST https://your-api.com/api/support/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### 3. Monitor

- Check logs: `kubectl logs -f deployment/crm-backend`
- Check metrics: `https://your-api.com/metrics`
- Monitor Vercel dashboard for frontend

## Scaling

### Horizontal Pod Autoscaling

The HPA is configured to scale based on CPU usage:
- Min replicas: 3
- Max replicas: 10
- Target CPU: 70%

### Manual Scaling

```bash
kubectl scale deployment crm-backend --replicas=5
```

## Troubleshooting

### Backend Not Starting

1. Check logs: `kubectl logs deployment/crm-backend`
2. Verify secrets: `kubectl get secrets`
3. Check database connectivity

### Frontend Build Errors

1. Check Vercel build logs
2. Verify environment variables
3. Test build locally: `pnpm build`

### Kafka Connection Issues

1. Verify Kafka is running: `kubectl get pods | grep kafka`
2. Check Kafka logs
3. Verify bootstrap servers in ConfigMap

## Rollback

### Vercel

```bash
vercel rollback
```

### Kubernetes

```bash
kubectl rollout undo deployment/crm-backend
```

## Monitoring

### Logs

```bash
# Backend logs
kubectl logs -f deployment/crm-backend

# Kafka logs
kubectl logs -f kafka-0
```

### Metrics

- Prometheus: `https://your-api.com/metrics`
- Vercel Analytics: Vercel Dashboard

## Backup

### Database

```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restore

```bash
psql $DATABASE_URL < backup.sql
```

## Support

For deployment issues, check:
1. Kubernetes events: `kubectl get events`
2. Pod status: `kubectl describe pod <pod-name>`
3. Service endpoints: `kubectl get endpoints`
