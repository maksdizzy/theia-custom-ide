terraform {
  required_providers {
    coder = {
      source = "coder/coder"
    }
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

# -----------------------------------------------------------------------------
# Providers
# -----------------------------------------------------------------------------

provider "coder" {}

provider "docker" {}

# -----------------------------------------------------------------------------
# Data Sources
# -----------------------------------------------------------------------------

data "coder_provisioner" "me" {}

data "coder_workspace" "me" {}

data "coder_workspace_owner" "me" {}

# -----------------------------------------------------------------------------
# Local Variables
# -----------------------------------------------------------------------------

locals {
  username       = data.coder_workspace_owner.me.name
  workspace_name = lower(data.coder_workspace.me.name)
  container_name = "coder-${local.username}-${local.workspace_name}"
  image_name     = var.docker_image
}

# -----------------------------------------------------------------------------
# Coder Agent
# -----------------------------------------------------------------------------

resource "coder_agent" "main" {
  arch = data.coder_provisioner.me.arch
  os   = "linux"
  dir  = "/workspace"

  env = {
    GIT_AUTHOR_NAME     = data.coder_workspace_owner.me.full_name
    GIT_AUTHOR_EMAIL    = data.coder_workspace_owner.me.email
    GIT_COMMITTER_NAME  = data.coder_workspace_owner.me.full_name
    GIT_COMMITTER_EMAIL = data.coder_workspace_owner.me.email
  }

  metadata {
    display_name = "CPU Usage"
    key          = "cpu_usage"
    script       = "coder stat cpu"
    interval     = 10
    timeout      = 1
  }

  metadata {
    display_name = "Memory Usage"
    key          = "mem_usage"
    script       = "coder stat mem"
    interval     = 10
    timeout      = 1
  }

  metadata {
    display_name = "Disk Usage"
    key          = "disk_usage"
    script       = "coder stat disk --path /workspace"
    interval     = 60
    timeout      = 3
  }
}

# -----------------------------------------------------------------------------
# Coder Script - Startup Tasks
# -----------------------------------------------------------------------------

resource "coder_script" "startup" {
  agent_id     = coder_agent.main.id
  display_name = "Startup"
  icon         = "/icon/coder.svg"
  run_on_start = true
  timeout      = 300

  script = <<-EOT
    #!/bin/bash
    set -e

    echo "Starting AI Workspace..."

    # Clone git repository if URL is provided
    if [ -n "${data.coder_parameter.git_repo.value}" ]; then
      echo "Cloning repository: ${data.coder_parameter.git_repo.value}"
      if [ ! -d "/workspace/project/.git" ]; then
        git clone "${data.coder_parameter.git_repo.value}" /workspace/project
        echo "Repository cloned successfully"
      else
        echo "Repository already exists, pulling latest changes..."
        cd /workspace/project && git pull || true
      fi
    fi

    echo "AI Workspace is ready!"
  EOT
}

# -----------------------------------------------------------------------------
# Coder App - AI Workspace IDE
# -----------------------------------------------------------------------------

resource "coder_app" "ai_workspace" {
  agent_id     = coder_agent.main.id
  slug         = "ide"
  display_name = "AI Workspace"
  url          = "http://localhost:4000"
  icon         = "/icon/code.svg"
  subdomain    = true
  share        = "owner"

  healthcheck {
    url       = "http://localhost:4000/"
    interval  = 5
    threshold = 6
  }
}

# -----------------------------------------------------------------------------
# Docker Volume - Persistent Workspace Storage
# -----------------------------------------------------------------------------

resource "docker_volume" "workspace" {
  name = "coder-${data.coder_workspace.me.id}-workspace"

  # Protect the volume from being deleted due to changes in attributes
  lifecycle {
    ignore_changes = all
  }
}

# -----------------------------------------------------------------------------
# Docker Image
# -----------------------------------------------------------------------------

resource "docker_image" "ai_workspace" {
  name = local.image_name
}

# -----------------------------------------------------------------------------
# Docker Container
# -----------------------------------------------------------------------------

resource "docker_container" "workspace" {
  count = data.coder_workspace.me.start_count

  image    = docker_image.ai_workspace.image_id
  name     = local.container_name
  hostname = data.coder_workspace.me.name

  # Use the docker gateway if the access URL is 127.0.0.1
  entrypoint = ["sh", "-c", replace(coder_agent.main.init_script, "/localhost|127\\.0\\.0\\.1/", "host.docker.internal")]

  env = [
    "CODER_AGENT_TOKEN=${coder_agent.main.token}",
    "PORT=4000",
    "HOST=0.0.0.0",
    "WORKSPACE_PATH=/workspace",
    "NODE_ENV=production",
  ]

  # Resource limits
  memory = data.coder_parameter.memory_gb.value * 1024

  # Volume mount for persistent workspace
  volumes {
    container_path = "/workspace"
    volume_name    = docker_volume.workspace.name
    read_only      = false
  }

  # Host gateway for localhost access
  host {
    host = "host.docker.internal"
    ip   = "host-gateway"
  }

  # Labels for tracking and management
  labels {
    label = "coder.owner"
    value = data.coder_workspace_owner.me.name
  }

  labels {
    label = "coder.owner_id"
    value = data.coder_workspace_owner.me.id
  }

  labels {
    label = "coder.workspace_id"
    value = data.coder_workspace.me.id
  }

  labels {
    label = "coder.workspace_name"
    value = data.coder_workspace.me.name
  }
}

# -----------------------------------------------------------------------------
# Coder Metadata - Dashboard Display
# -----------------------------------------------------------------------------

resource "coder_metadata" "workspace_info" {
  count       = data.coder_workspace.me.start_count
  resource_id = docker_container.workspace[0].id

  item {
    key   = "image"
    value = local.image_name
  }

  item {
    key   = "memory"
    value = "${data.coder_parameter.memory_gb.value} GB"
  }

  item {
    key   = "git_repo"
    value = data.coder_parameter.git_repo.value != "" ? data.coder_parameter.git_repo.value : "None"
  }
}
