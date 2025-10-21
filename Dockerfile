FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache gettext

WORKDIR /app

# Install pnpm globally
RUN npm i -g pnpm@latest

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application files
COPY app ./app
COPY templates ./templates
COPY tsconfig.json ./

# Build TypeScript
RUN pnpm build

# Set environment variables (will be overridden by docker-compose)
ENV NODE_ENV=development
ENV PORT=55099
ENV BASE_URL_SERVICE=http://0.0.0.0:55099

# Create required directories
RUN mkdir -p /app/wsdl-templates /app/wsdl

# Copy WSDL templates
COPY templates/*.wsdl /app/wsdl-templates/

# Expose port
EXPOSE 55099

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:55099/Service?wsdl || exit 1

# Start application
CMD ["node", "dist/server.js"]