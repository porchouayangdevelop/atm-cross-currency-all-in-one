#!/bin/bash

# ATM Cross Currency Service Deployment Script
# Usage: ./deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
COMPOSE_FILE="docker-compose.prod.yaml"

echo "================================================"
echo "ATM Cross Currency Service Deployment"
echo "Environment: $ENVIRONMENT"
echo "================================================"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."

    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi

    if [ ! -f ".env.prod" ]; then
        log_error ".env.prod file not found"
        exit 1
    fi

    log_info "Prerequisites check passed"
}

# Backup current deployment
backup_current() {
    log_info "Creating backup..."

    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"

    if docker ps | grep -q "atm-cross-currency-prod"; then
        docker exec atm-cross-currency-prod tar czf /tmp/backup.tar.gz /app 2>/dev/null || true
        docker cp atm-cross-currency-prod:/tmp/backup.tar.gz "$BACKUP_DIR/" 2>/dev/null || true
        log_info "Backup created at $BACKUP_DIR"
    else
        log_warn "No running container to backup"
    fi
}

# Stop existing services
stop_services() {
    log_info "Stopping existing services..."
    docker-compose -f "$COMPOSE_FILE" down || true
}

# Build images
build_images() {
    log_info "Building Docker images..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache
}

# Start services
start_services() {
    log_info "Starting services..."
    docker-compose -f "$COMPOSE_FILE" up -d
}

# Wait for services to be healthy
wait_for_health() {
    log_info "Waiting for services to be healthy..."

    MAX_ATTEMPTS=30
    ATTEMPT=0

    while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
        if docker-compose -f "$COMPOSE_FILE" ps | grep -q "healthy"; then
            log_info "Services are healthy"
            return 0
        fi

        ATTEMPT=$((ATTEMPT + 1))
        echo -n "."
        sleep 2
    done

    log_error "Services failed to become healthy"
    return 1
}

# Test endpoints
test_endpoints() {
    log_info "Testing SOAP endpoints..."

    ENDPOINTS=(
        "http://localhost:55099/Service?wsdl"
        "http://localhost:55099/APBServiceCenter/CimcusmControllerService?wsdl"
        "http://localhost:55099/QueryAccName?wsdl"
    )

    for endpoint in "${ENDPOINTS[@]}"; do
        if curl -f -s "$endpoint" > /dev/null; then
            log_info "✓ $endpoint"
        else
            log_warn "✗ $endpoint"
        fi
    done
}

# Show logs
show_logs() {
    log_info "Recent logs:"
    docker-compose -f "$COMPOSE_FILE" logs --tail=50
}

# Main deployment flow
main() {
    check_prerequisites
    backup_current
    stop_services
    build_images
    start_services

    if wait_for_health; then
        test_endpoints
        log_info "================================================"
        log_info "Deployment completed successfully!"
        log_info "================================================"

        echo ""
        log_info "Service URLs:"
        log_info "  - Main Service: http://localhost:55099/Service?wsdl"
        log_info "  - CIF Service: http://localhost:55099/APBServiceCenter/CimcusmControllerService?wsdl"
        log_info "  - Query Service: http://localhost:55099/QueryAccName?wsdl"
        echo ""
        log_info "To view logs: docker-compose -f $COMPOSE_FILE logs -f"
        log_info "To stop services: docker-compose -f $COMPOSE_FILE down"
    else
        log_error "Deployment failed!"
        show_logs
        exit 1
    fi
}

# Run deployment
main