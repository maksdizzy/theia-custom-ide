# AI Workspace - Coder Template

Coder template for deploying AI Workspace (Theia-based IDE) on self-hosted Docker infrastructure.

## Features

- **AI-Powered IDE**: Theia-based IDE with integrated AI assistants (Claude Code, Gemini, ChatGPT)
- **Persistent Storage**: Workspace data persists across restarts
- **Git Integration**: Automatic repository cloning on workspace start
- **Resource Control**: Configurable memory limits
- **Fast Startup**: Uses pre-built Docker image from GHCR

## Prerequisites

1. **Coder Server** installed and running
2. **Docker** installed on the Coder host
3. **Access to GHCR** (for private images, see Authentication section)

## Quick Start

### 1. Create the template

```bash
cd coder-template
coder templates create ai-workspace
```

### 2. Create a workspace

```bash
coder create my-workspace -t ai-workspace
```

### 3. Open the IDE

Click on "AI Workspace" button in the Coder dashboard, or use:

```bash
coder open my-workspace --app ide
```

## Parameters

| Parameter | Description | Default | Options |
|-----------|-------------|---------|---------|
| `memory_gb` | Memory allocated to container | 4 GB | 2, 4, 8, 16 GB |
| `git_repo` | Git repository URL to clone | (empty) | Any valid git URL |
| `dotfiles_uri` | Dotfiles repository URI | (empty) | Any valid git URL |

## Authentication for Private Images

If using a private GHCR image, configure Docker authentication on the Coder host:

### Option 1: Docker login (recommended for single host)

```bash
# Create a GitHub PAT with read:packages permission
# Then run on Coder host:
docker login ghcr.io -u YOUR_GITHUB_USERNAME -p YOUR_PAT
```

### Option 2: Coder external auth

Configure GHCR as an external authentication provider in Coder settings.

## Customization

### Change Docker Image

Edit `variables.tf` and update the default image:

```hcl
variable "docker_image" {
  default = "your-registry/your-image:tag"
}
```

Or override when creating the template:

```bash
coder templates create ai-workspace -var docker_image=your-image:tag
```

### Add More Parameters

Edit `variables.tf` to add custom parameters. Available types:
- `string` - Text input
- `number` - Numeric input with optional min/max
- `bool` - Checkbox

## File Structure

```
coder-template/
├── main.tf        # Main Terraform configuration
├── variables.tf   # User parameters and variables
└── README.md      # This file
```

## Troubleshooting

### Workspace won't start

1. Check Docker is running: `docker ps`
2. Check image is available: `docker pull ghcr.io/maksdizzy/theia-custom-ide:latest`
3. Check Coder logs: `coder server --log-filter=provisioner`

### IDE not loading

1. Wait 30-60 seconds for IDE to initialize
2. Check container logs: `docker logs coder-<username>-<workspace>`
3. Verify port 4000 is accessible inside container

### Git clone fails

1. Verify repository URL is correct
2. For private repos, ensure SSH keys or tokens are configured
3. Check network connectivity from container

## Development

To build the Docker image locally:

```bash
# From project root
docker build -t ai-workspace:dev .

# Update template to use local image
coder templates push ai-workspace -var docker_image=ai-workspace:dev
```

## Support

- [Coder Documentation](https://coder.com/docs)
- [Theia IDE Documentation](https://theia-ide.org/docs/)
