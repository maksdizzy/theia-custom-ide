# Session Summary - 2026-01-07 (Docker & Claude Code Fixes)

## Completed Tasks

### 1. Claude Code CLI Installation in Docker
**Added to Dockerfile (line 66-67):**
```dockerfile
RUN npm install -g @anthropic-ai/claude-code && npm cache clean --force
```

### 2. Claude Code Native Binary Fix (Critical Bug Fix)
**Problem**: Claude Code panel showed empty because native binary (glibc) can't run on Alpine (musl).
**Error**: `spawn /app/plugins/.../native-binary/claude ENOENT`

**Solution (Dockerfile lines 89-92):**
```dockerfile
RUN rm -f /app/plugins/Anthropic.claude-code/extension/resources/native-binary/claude && \
    ln -sf /usr/local/bin/claude /app/plugins/Anthropic.claude-code/extension/resources/native-binary/claude
```

### 3. Git Installation
**Added to runtime dependencies (line 64):**
```dockerfile
RUN apk add --no-cache libsecret curl git
```

### 4. Application Rename: Flexbe IDE → AI Workspace
**Changed in browser-app/package.json:**
- Line 42: `"applicationName": "AI Workspace"`
- Line 137: `"window.title": "AI Workspace - ${activeEditorShort}"`

### 5. Office Viewer Extension
**Added to package.json theiaPlugins:**
```json
"cweijan.vscode-office": "https://open-vsx.org/api/cweijan/vscode-office/3.4.8/file/cweijan.vscode-office-3.4.8.vsix"
```

### 6. Default Workspace Settings
**Created workspace/.theia-ide/settings.json:**
```json
{
    "files.exclude": { "**/.*": true },
    "workbench.editorAssociations": {
        "*.xlsx": "cweijan.officeViewer",
        "*.docx": "cweijan.officeViewer",
        "*.pdf": "cweijan.officeViewer",
        "*.md": "cweijan.markdownViewer"
    }
}
```

**Added to Dockerfile (lines 97-100):**
```dockerfile
RUN mkdir -p /workspace
COPY workspace/.theia-ide /workspace/.theia-ide
RUN chown -R flexbe:flexbe /app /workspace
```

**Updated .dockerignore:**
```
workspace/
!workspace/.theia-ide/
```

## Key Learnings

1. **Alpine + glibc binaries**: Native binaries compiled for glibc don't work on Alpine (musl). Solution: symlink to npm-installed CLI.

2. **Theia workspace settings**: 
   - `.code-workspace` and `.theia-workspace` both supported
   - Settings folder: `.theia-ide/` in workspace root
   - Priority: Default → User → Workspace → Folder

3. **Docker volumes vs image defaults**: First run copies image contents to empty volume. Subsequent runs use volume data, ignoring image defaults.

## Files Modified
- Dockerfile (Claude CLI, git, symlink fix, workspace settings)
- browser-app/package.json (app name, window title)
- package.json (vscode-office plugin)
- .dockerignore (allow .theia-ide)
- workspace/.theia-ide/settings.json (new file)
