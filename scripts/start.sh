#!/bin/bash
# =============================================================================
# Flexbe IDE - Unified Start Script
# =============================================================================
# Replaces: full-start.sh, quick-start.sh, rebuild-all.sh
#
# Usage:
#   ./scripts/start.sh              # Full start with build checks
#   ./scripts/start.sh --quick      # Quick restart (skip checks)
#   ./scripts/start.sh --build      # Force rebuild before start
#   ./scripts/start.sh --docker     # Start via Docker Compose
# =============================================================================

set -e

# =============================================================================
# Configuration
# =============================================================================

# Load .env if exists
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

# Defaults (can be overridden by .env)
PORT="${PORT:-4000}"
HOST="${HOST:-0.0.0.0}"
WORKSPACE_PATH="${WORKSPACE_PATH:-./workspace}"
PLUGINS_DIR="${PLUGINS_DIR:-./plugins}"

# =============================================================================
# Colors and Output
# =============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warning() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "${RED}[ERROR]${NC} $1"; }

# =============================================================================
# Parse Arguments
# =============================================================================
QUICK_MODE=false
BUILD_MODE=false
DOCKER_MODE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --quick|-q)
            QUICK_MODE=true
            shift
            ;;
        --build|-b)
            BUILD_MODE=true
            shift
            ;;
        --docker|-d)
            DOCKER_MODE=true
            shift
            ;;
        --help|-h)
            echo "Flexbe IDE Start Script"
            echo ""
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --quick, -q    Quick start (skip build checks)"
            echo "  --build, -b    Force rebuild before starting"
            echo "  --docker, -d   Start using Docker Compose"
            echo "  --help, -h     Show this help message"
            echo ""
            echo "Environment variables (can be set in .env):"
            echo "  PORT           Server port (default: 4000)"
            echo "  HOST           Server host (default: 0.0.0.0)"
            echo "  WORKSPACE_PATH Workspace directory (default: ./workspace)"
            echo "  PLUGINS_DIR    Plugins directory (default: ./plugins)"
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# =============================================================================
# Docker Mode
# =============================================================================
if [ "$DOCKER_MODE" = true ]; then
    info "Starting with Docker Compose..."

    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
        exit 1
    fi

    docker compose up -d

    success "Flexbe IDE started in Docker"
    echo ""
    echo "  URL: http://localhost:${PORT}"
    echo ""
    echo "Commands:"
    echo "  docker compose logs -f    # View logs"
    echo "  docker compose down       # Stop IDE"
    echo "  docker compose restart    # Restart IDE"
    exit 0
fi

# =============================================================================
# Local Mode - Validation
# =============================================================================

# Check we're in project root
if [ ! -f "package.json" ]; then
    error "Run this script from the project root directory"
    exit 1
fi

# =============================================================================
# Stop Existing Process
# =============================================================================
if lsof -Pi :${PORT} -sTCP:LISTEN -t >/dev/null 2>&1; then
    warning "Port ${PORT} is in use, stopping existing process..."
    lsof -ti :${PORT} | xargs kill 2>/dev/null || true
    sleep 2
    success "Previous process stopped"
fi

# =============================================================================
# Quick Mode - Skip All Checks
# =============================================================================
if [ "$QUICK_MODE" = true ]; then
    info "Quick start mode - skipping checks"

    if [ ! -f "browser-app/lib/backend/main.js" ]; then
        error "Browser app not built. Run without --quick first."
        exit 1
    fi

    success "Starting Flexbe IDE on http://localhost:${PORT}"
    cd browser-app
    exec node lib/backend/main.js "../${WORKSPACE_PATH}" -p "${PORT}" --hostname "${HOST}" --plugins=local-dir:../"${PLUGINS_DIR}"
fi

# =============================================================================
# Full Mode - Checks and Build
# =============================================================================

# Check dependencies
if [ ! -d "node_modules" ]; then
    info "Installing dependencies..."
    npm install
    success "Dependencies installed"
fi

# Build custom-ui if needed
if [ ! -d "custom-ui/lib/backend" ] || [ "$BUILD_MODE" = true ]; then
    info "Building custom-ui..."
    npm run build --workspace=custom-ui
    success "custom-ui built"
fi

# Build browser-app if needed
if [ ! -f "browser-app/lib/backend/main.js" ] || [ "$BUILD_MODE" = true ]; then
    info "Building browser-app..."
    npm run build --workspace=browser-app
    success "browser-app built"
fi

# Check plugins
if [ ! -d "${PLUGINS_DIR}" ] || [ -z "$(ls -A ${PLUGINS_DIR} 2>/dev/null)" ]; then
    warning "Plugins directory is empty or missing"
    read -p "Download plugins? (y/n): " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        info "Downloading plugins..."
        npm run download:plugins
        success "Plugins downloaded and patched"
    fi
fi

# Create workspace if needed
if [ ! -d "${WORKSPACE_PATH}" ]; then
    mkdir -p "${WORKSPACE_PATH}"
    info "Created workspace directory: ${WORKSPACE_PATH}"
fi

# =============================================================================
# Start the IDE
# =============================================================================
echo ""
success "Starting Flexbe IDE"
echo ""
echo "  URL: http://localhost:${PORT}"
echo "  Workspace: ${WORKSPACE_PATH}"
echo "  Plugins: ${PLUGINS_DIR}"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd browser-app
exec node lib/backend/main.js "../${WORKSPACE_PATH}" -p "${PORT}" --hostname "${HOST}" --plugins=local-dir:../"${PLUGINS_DIR}"
