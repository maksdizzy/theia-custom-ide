# Coder Template Setup - 2026-01-07

## Created Files

### coder-template/
- `main.tf` - Main Terraform configuration with:
  - Coder and Docker providers
  - Coder agent with startup script (git clone support)
  - Docker volume for persistent storage
  - Docker container with resource limits
  - Coder app for web IDE access (port 4000)
  - Metadata for dashboard display

- `variables.tf` - User parameters:
  - `memory_gb`: 2/4/8/16 GB (default: 4)
  - `git_repo`: Optional git repository URL
  - `dotfiles_uri`: Optional dotfiles repository
  - `docker_image` variable: default `ghcr.io/maksdizzy/theia-custom-ide:latest`

- `README.md` - Documentation with:
  - Quick start guide
  - Parameter descriptions
  - Authentication setup for private GHCR images
  - Troubleshooting section

### .github/workflows/
- `docker-publish.yml` - GitHub Actions workflow:
  - Triggers on push to main, tags, and PRs
  - Builds and pushes to GHCR
  - Uses Docker Buildx with caching
  - Auto-tags: latest, branch name, semver, SHA

## Usage Instructions

1. Push to GitHub to trigger image build
2. On Coder server: `docker login ghcr.io` (for private image)
3. Create template: `cd coder-template && coder templates create ai-workspace`
4. Create workspace: `coder create my-workspace -t ai-workspace`

## Key Configuration

- Image: `ghcr.io/maksdizzy/theia-custom-ide:latest`
- Port: 4000 (internal)
- Persistent volume: `/workspace`
- Health check: HTTP GET on port 4000

## Notes

- Image inherits repository visibility (private repo = private image)
- For private images, PAT with `read:packages` scope required on Coder host
- Memory is configurable at workspace creation time
