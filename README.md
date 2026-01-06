# Flexbe IDE

Custom Theia-based browser IDE with AI integrations (Claude Code, Gemini, ChatGPT).

## Quick Start

### Docker (Recommended)

```bash
# Start IDE
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

IDE will be available at **http://localhost:4000**

### Local Development

```bash
# Install dependencies
npm install

# Download and patch plugins
npm run download:plugins

# Start IDE
npm run start
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run start` | Start IDE with build checks |
| `npm run start:quick` | Quick restart (skip checks) |
| `npm run start:docker` | Start via Docker |
| `npm run build` | Build all packages |
| `npm run watch` | Watch mode for development |
| `npm run download:plugins` | Download and patch plugins |

### Docker Commands

| Command | Description |
|---------|-------------|
| `npm run docker:build` | Build Docker image |
| `npm run docker:rebuild` | Full rebuild (no cache) |
| `npm run docker:down` | Stop container |
| `npm run docker:logs` | View container logs |

## Configuration

Copy `.env.example` to `.env` to customize:

```bash
PORT=4000              # Server port
HOST=0.0.0.0           # Server host
WORKSPACE_PATH=/workspace  # Workspace directory
PLUGINS_DIR=./plugins  # Plugins directory
```

## Project Structure

```
├── browser-app/       # Main Theia application
├── custom-ui/         # Custom UI extension
├── plugins/           # VS Code extensions
├── scripts/           # Build and start scripts
├── workspace/         # User workspace (gitignored)
├── Dockerfile         # Multi-stage Docker build
└── docker-compose.yml # Container configuration
```

## Development

### Watch Mode

Terminal 1:
```bash
npm run watch --workspace=custom-ui
```

Terminal 2:
```bash
npm run start:quick
```

### After Code Changes

```bash
# Local
npm run build && npm run start:quick

# Docker
docker compose build && docker compose up -d
```

## Included Plugins

- **AI Assistants**: Claude Code, Gemini, ChatGPT, Composio
- **Languages**: JavaScript, TypeScript, JSON, CSS, HTML, Markdown
- **Themes**: Material Theme, Material Icons

## Requirements

- Node.js >= 20
- npm >= 10
- Docker (for containerized deployment)
