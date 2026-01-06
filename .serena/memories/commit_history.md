# Git Commit History - Flexbe IDE

## Latest Commits

### Commit 6a906cd (2026-01-05)
**Type**: feat  
**Title**: Fix right panel visibility and add development automation

**Changes Summary**:
- 8 files changed, 878 insertions(+), 2 deletions(-)
- 6 new files created (3 scripts + 3 docs)
- 2 files modified (application-shell.ts, package.json)

**Key Modifications**:

1. **custom-ui/src/frontend/layout/application-shell.ts** (+1/-1)
   - Line 181: Changed stretch factors from `[0, 1, 0]` to `[0, 1, 0.25]`
   - Enables right panel to expand to 25% width for AI plugins

2. **package.json** (+3/-1)
   - Added `full-start`, `quick-start`, `rebuild` npm scripts
   - Scripts point to new automation files in scripts/

**New Files Created**:

1. **QUICKSTART.md** (109 lines)
   - Quick reference for daily development workflow
   - Common commands and troubleshooting shortcuts

2. **TROUBLESHOOTING.md** (276 lines)
   - Comprehensive troubleshooting guide
   - 6 common issues with detailed solutions
   - Diagnostic commands and procedures

3. **scripts/README.md** (264 lines)
   - Complete automation script documentation
   - Usage examples and workflow patterns
   - Technical implementation details

4. **scripts/full-start.sh** (145 lines)
   - Intelligent start with comprehensive validation
   - Automatic rebuild detection (timestamp-based)
   - Port conflict resolution and interactive prompts

5. **scripts/quick-start.sh** (25 lines)
   - Fast start bypassing Turbo cache
   - Direct server execution for reliability

6. **scripts/rebuild-all.sh** (54 lines)
   - Complete rebuild automation
   - Enforces correct build order (custom-ui → browser-app)

**Technical Achievements**:
- ✅ Fixed right panel visibility (24.5% width when expanded)
- ✅ Resolved Turbo cache replay issue
- ✅ Created comprehensive development automation
- ✅ Added extensive documentation (649 lines)
- ✅ All scripts executable with proper error handling

**Impact**:
- Right panel now functional for AI plugins integration
- Development workflow significantly streamlined
- Common issues documented with solutions
- Reduced onboarding time for new developers

---

### Previous Commits

**Commit 58476b4**: Merge branch 'feature/premium-ui-redesign'  
**Commit 53ab813**: chore: setup automatic AI plugin download and patching

---

## Commit Convention

Format: `type(scope): subject`

**Types Used**:
- `feat:` - New features
- `chore:` - Infrastructure and tooling
- `fix:` - Bug fixes
- `docs:` - Documentation only

**Signature**:
All commits include:
```
🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
