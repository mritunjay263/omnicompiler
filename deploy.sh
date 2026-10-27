#!/usr/bin/env bash
set -e

# OmniCompiler Unified Production Deployment Script
# Usage: ./deploy.sh [local|docker|compose|cloud]

COMMAND=${1:-"compose"}

echo "================================================"
echo "  🚀 OmniCompiler Production Deployment Tool"
echo "  Universal Polyglot IDE & Isolated Sandbox"
echo "================================================"
echo ""

case "$COMMAND" in
  "local")
    echo "📦 Building standalone Next.js bundle..."
    npm run build
    echo "⚡ Launching native production server..."
    NODE_ENV=production PORT=3000 node server.js 2>/dev/null || npm run start
    ;;

  "docker")
    echo "🐳 Building isolated Docker image..."
    docker build -t omnicompiler:latest .
    echo "🚀 Starting standalone isolated container on port 3001..."
    docker run -d --name omnicompiler-app -p 3001:3000 \
      -v omnicompiler_data:/app/.data \
      --restart unless-stopped \
      omnicompiler:latest
    echo "✅ Container running at: http://localhost:3001"
    ;;

  "compose")
    echo "🐳 Launching via Docker Compose with persistent storage..."
    docker compose up -d --build
    echo ""
    echo "🔍 Verifying container health..."
    sleep 3
    docker compose ps
    echo ""
    echo "✅ OmniCompiler is live at: http://localhost:3000"
    ;;

  "cloud")
    echo "☁️ Cloud Deployment Targets:"
    echo "  - Fly.io: Run 'fly launch' or 'fly deploy'"
    echo "  - Render: Connect repository using render.yaml blueprint"
    echo "  - Railway: Run 'railway up' using railway.json"
    echo "  - AWS / DigitalOcean / VPS: Run 'docker compose up -d'"
    ;;

  *)
    echo "Unknown option: $COMMAND"
    echo "Usage: ./deploy.sh [local|docker|compose|cloud]"
    exit 1
    ;;
esac
