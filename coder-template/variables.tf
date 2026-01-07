# -----------------------------------------------------------------------------
# Template Variables
# -----------------------------------------------------------------------------

variable "docker_image" {
  description = "Docker image for AI Workspace"
  type        = string
  default     = "ghcr.io/maksdizzy/theia-custom-ide:latest"
}

# -----------------------------------------------------------------------------
# User-Configurable Parameters
# -----------------------------------------------------------------------------

data "coder_parameter" "memory_gb" {
  name         = "memory_gb"
  display_name = "Memory (GB)"
  description  = "Amount of memory allocated to the workspace container"
  type         = "number"
  default      = "4"
  mutable      = true
  icon         = "/icon/memory.svg"
  order        = 1

  option {
    name  = "2 GB"
    value = "2"
  }

  option {
    name  = "4 GB (Recommended)"
    value = "4"
  }

  option {
    name  = "8 GB"
    value = "8"
  }

  option {
    name  = "16 GB"
    value = "16"
  }
}

data "coder_parameter" "git_repo" {
  name         = "git_repo"
  display_name = "Git Repository URL"
  description  = "Optional: Clone this repository when the workspace starts"
  type         = "string"
  default      = ""
  mutable      = true
  icon         = "/icon/git.svg"
  order        = 2
}

data "coder_parameter" "dotfiles_uri" {
  name         = "dotfiles_uri"
  display_name = "Dotfiles Repository"
  description  = "Optional: URI of your dotfiles repository (e.g., https://github.com/user/dotfiles)"
  type         = "string"
  default      = ""
  mutable      = true
  icon         = "/icon/dotfiles.svg"
  order        = 3
}
