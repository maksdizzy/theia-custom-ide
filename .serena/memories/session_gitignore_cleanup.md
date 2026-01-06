# Session: Git Cleanup & Plugin Automation

## Date: 2026-01-05

## Completed Tasks

### 1. Build Artifacts Cleanup ✅
Removed previously committed build artifacts from git tracking:
- `browser-app/lib/` (~495 files, 511K lines deleted)
- `browser-app/src-gen/`
- `browser-app/gen-webpack*.js`
- `browser-app/.turbo/`
- `custom-ui/lib/`
- `custom-ui/.turbo/`

### 2. AI Plugin Automation ✅
Set up automatic download and patching for AI extensions:

**Plugins added to theiaPlugins:**
- Claude Code 2.0.75 (open-vsx.org)
- Gemini Code Assist 2.64.0 (open-vsx.org)
- ChatGPT 0.5.56 (open-vsx.org)
- Composio Skills 0.1.0 (github.com/maksdizzy/composio-skills-extension)

**Created:** `scripts/patch-ai-plugins.js`
- Patches viewsContainers from `activitybar`/`secondarySidebar` to `right`
- Runs after `npm run download:plugins`
- Ensures AI panels appear in right sidebar (Theia requirement)

### 3. Gitignore Updates ✅
Added to `.gitignore`:
- `**/.turbo/` (all workspaces)
- `.playwright-mcp/`
- AI plugin directories (downloaded automatically)

## Key Insights

### Theia Plugin System
- `theiaPlugins` in package.json defines download URLs
- Plugins downloaded to `plugins/` directory
- `--plugins=local-dir:../plugins` in start script loads them
- Theia uses `left`/`right`/`bottom` for viewsContainers (not VS Code's `activitybar`)

### Plugin Sizes (why not commit)
- Claude: 221MB
- Gemini: 269MB
- ChatGPT: 352MB
- Total: 842MB (too large for git)

## New Workflow
```bash
npm install                # dependencies
npm run download:plugins   # downloads + patches AI plugins
npm run build              # build
npm start                  # run on port 4000
```

## Commits
- `6a9b1e1`: Remove build artifacts from git tracking
- `53ab813`: Setup automatic AI plugin download and patching
