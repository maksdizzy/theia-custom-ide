# Documentation Index

## Location
All documentation is in: `claudedocs/`

## Files Generated

### 1. claudedocs/README.md
- Documentation index and quick start
- Project structure quick reference
- Common tasks and workflows
- External resources compilation
- **Use for**: New developer onboarding, quick reference

### 2. claudedocs/PROJECT_INDEX.md
- Complete project overview and architecture
- Workspace structure (browser-app, custom-ui, plugins)
- Component relationships with ASCII diagrams
- Development workflows and build pipeline
- Configuration file cross-references
- **Use for**: Understanding project architecture, finding components

### 3. claudedocs/API_REFERENCE.md
- Frontend API (commands, filters, layout, widgets)
- Backend API (WebSocket endpoints)
- Frontend Preload API
- Extension points and lifecycle hooks
- Type definitions and usage examples
- **Use for**: Technical implementation, API lookup, examples

### 4. claudedocs/CUSTOMIZATION_GUIDE.md
- InversifyJS dependency injection patterns
- Contribution filtering strategies
- Widget and layout customization
- Lumino framework patterns
- Advanced techniques and best practices
- Based on DZone Deep Dive series
- **Use for**: Implementing customizations, learning patterns

## Cross-References

### Source Code → Documentation
- [custom-ui/src/frontend/index.ts](../custom-ui/src/frontend/index.ts) → Main container module
- [custom-ui/src/frontend/contribution-filters/](../custom-ui/src/frontend/contribution-filters/) → Filtering patterns
- [custom-ui/src/frontend/layout/](../custom-ui/src/frontend/layout/) → Shell customization
- [browser-app/package.json](../browser-app/package.json) → Configuration reference

### Documentation → Source Code
All docs use format: `[filename.ts:line](../path/filename.ts#Lline)`
- Clickable in VSCode and GitHub
- Permanent references to implementations

## External Resources Integrated
1. DZone: Theia Deep Dive Part 1 - Build Your Own IDE
2. DZone: Theia Deep Dive Part 2 - Mastering Customization

## Maintenance
- Update when architecture changes
- Sync with source code modifications
- Review after Theia version upgrades
- Keep examples current with codebase
