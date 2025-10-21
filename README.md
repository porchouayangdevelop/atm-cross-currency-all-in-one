# Docker & Nginx Deployment Guide

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Server with minimum 2GB RAM
- Domain name (for production)
- SSL certificates (for HTTPS)

## Deployment Steps

### 1. Prepare Environment Files

Create `.env.prod` file in the project root:

```bash
# Server Config
HOST=0.0.0.0
PORT=55099

# Core Database
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=your-db-name

# ODS Database
ODS_DB_HOST=your-ods-host
ODS_DB_PORT=3306
ODS_DB_USER=your-ods-user
ODS_DB_PASS=your-ods-password
ODS_DB_NAME=your-ods-name

# Internal Database
S_DB_HOST=your-internal-host
S_DB_PORT=3306
S_DB_USER=your-internal-user
S_DB_PASS=your-internal-password
S_DB_NAME=your-cardzone-db
S_UPI_NAME=your-upi-db

# RabbitMQ
RABBIT_HOST=your-rabbitmq-host
RABBIT_PORT=5672
RABBIT_USER=your-rabbitmq-user
RABBIT_PASSWORD=your-rabbitmq-password

# External API
ATM_CLIENT_URL=your-external-api-url

# Slack Configuration
SLACK_TOKEN=your-slack-token
SLACK_ID=your-slack-id
SLACK_CLIENT_ID=your-client-id
SLACK_CLIENT_SECRET=your-client-secret
SLACL_SIGING_SECRET=your-signing-secret
SLACK_VERIFY_TOKEN=your-verify-token
SLACK_BOT_AUTH_TOKEN=your-bot-auth-token
ATM_CROSS_CURRENCY_WEBHOOK_URL=your-webhook-url
```

### 2. SSL Certificates Setup

#### Option A: Using Let's Encrypt (Recommended)

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Generate certificates
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates
sudo mkdir -p nginx/ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/
```

#### Option B: Self-Signed (Development)

```bash
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/privkey.pem \
  -out nginx/ssl/fullchain.pem
```

### 3. Update Configuration

Update `nginx/prod.conf`:
- Replace `your-domain.com` with your actual domain
- Adjust rate limiting as needed

Update `docker-compose.prod.yaml`:
- Set `BASE_URL_SERVICE` to your domain

### 4. Build and Deploy

```bash
# Build the Docker image
docker-compose -f docker-compose.prod.yaml build

# Start services
docker-compose -f docker-compose.prod.yaml up -d

# Check logs
docker-compose -f docker-compose.prod.yaml logs -f

# Check container status
docker-compose -f docker-compose.prod.yaml ps
```

### 5. Verify Deployment

Test SOAP endpoints:

```bash
# Test Service endpoint
curl https://your-domain.com/Service?wsdl

# Test CIF Service
curl https://your-domain.com/APBServiceCenter/CimcusmControllerService?wsdl

# Test Query Account
curl https://your-domain.com/QueryAccName?wsdl
```

## Scaling

### Horizontal Scaling

Update `docker-compose.prod.yaml` to add more replicas:

```yaml
services:
  app:
    deploy:
      replicas: 3
```

Update Nginx upstream:

```nginx
upstream app_backend {
    least_conn;
    server app_1:55099 max_fails=3 fail_timeout=30s;
    server app_2:55099 max_fails=3 fail_timeout=30s;
    server app_3:55099 max_fails=3 fail_timeout=30s;
    keepalive 32;
}
```

## Maintenance Commands

```bash
# Stop services
docker-compose -f docker-compose.prod.yaml down

# Restart services
docker-compose -f docker-compose.prod.yaml restart

# View logs
docker-compose -f docker-compose.prod.yaml logs -f app
docker-compose -f docker-compose.prod.yaml logs -f nginx

# Update application
docker-compose -f docker-compose.prod.yaml pull
docker-compose -f docker-compose.prod.yaml up -d

# Clean up
docker system prune -a

# Database backup (if needed)
docker exec -it atm-cross-currency-prod sh
```

## Monitoring

### Health Checks

```bash
# Application health
curl https://your-domain.com/health

# Container health
docker-compose -f docker-compose.prod.yaml ps
```

### Logs

```bash
# Application logs
docker-compose -f docker-compose.prod.yaml logs -f app

# Nginx access logs
docker exec nginx-reverse-proxy tail -f /var/log/nginx/access.log

# Nginx error logs
docker exec nginx-reverse-proxy tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Common Issues

#### 1. Connection Refused
```bash
# Check if containers are running
docker ps

# Check container logs
docker logs atm-cross-currency-prod

# Verify network connectivity
docker network inspect docker-compose_app-network
```

#### 2. Database Connection Issues
```bash
# Test database connectivity from container
docker exec -it atm-cross-currency-prod sh
# Inside container:
nc -zv $DB_HOST $DB_PORT
```

#### 3. SSL Certificate Issues
```bash
# Verify certificate files
ls -la nginx/ssl/

# Check Nginx configuration
docker exec nginx-reverse-proxy nginx -t

# Reload Nginx
docker exec nginx-reverse-proxy nginx -s reload
```

#### 4. High Memory Usage
```bash
# Check resource usage
docker stats

# Limit container resources in docker-compose.prod.yaml:
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Performance Tuning

### Nginx Optimization

```nginx
# In nginx.conf, adjust worker settings
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 4096;
    use epoll;
}
```

### Application Optimization

Add to Dockerfile:
```dockerfile
# Enable production optimizations
ENV NODE_OPTIONS="--max-old-space-size=1024"
```

## Security Best Practices

1. **Use Environment Variables**: Never hardcode credentials
2. **Restrict Access**: Use firewall rules to limit access
3. **Regular Updates**: Keep Docker images and dependencies updated
4. **SSL/TLS**: Always use HTTPS in production
5. **Rate Limiting**: Configure appropriate rate limits
6. **Monitoring**: Set up monitoring and alerting

## Backup Strategy

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec atm-cross-currency-prod tar czf /tmp/backup_$DATE.tar.gz /app
docker cp atm-cross-currency-prod:/tmp/backup_$DATE.tar.gz ./backups/
```

## Rollback Procedure

```bash
# Tag current image
docker tag your-image:latest your-image:backup

# Pull previous version
docker pull your-image:previous-version

# Deploy previous version
docker-compose -f docker-compose.prod.yaml up -d
```