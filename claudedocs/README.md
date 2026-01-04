# Theia Custom IDE Documentation

> **Project**: Flexbe IDE - Custom Theia Browser IDE
> **Generated**: 2026-01-04
> **Status**: ✅ Complete

## 📚 Documentation Index

This directory contains comprehensive documentation for the Theia Custom IDE project. All documentation is generated from codebase analysis and industry best practices.

### Core Documentation

1. **[PROJECT_INDEX.md](PROJECT_INDEX.md)** - Start Here! 🎯
   - Complete project overview and architecture
   - Workspace structure and component relationships
   - Development workflows and commands
   - Quick reference for navigation

2. **[API_REFERENCE.md](API_REFERENCE.md)** - Technical Reference 📖
   - Frontend, backend, and preload API documentation
   - Extension points and integration patterns
   - TypeScript type definitions
   - Usage examples and code samples

3. **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)** - Advanced Techniques 🛠️
   - Proven customization patterns from production implementations
   - InversifyJS dependency injection strategies
   - Contribution filtering and widget customization
   - Lumino framework patterns and layout management
   - Based on DZone Deep Dive article series

---

## Quick Start

### For New Developers

1. **Read**: [PROJECT_INDEX.md](PROJECT_INDEX.md) → Architecture & Structure
2. **Explore**: Run `npm run start` → Open http://localhost:4000
3. **Understand**: Review [custom-ui/src/frontend/index.ts](../custom-ui/src/frontend/index.ts)
4. **Customize**: Follow [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) patterns

### For Customization Work

1. **Reference**: [API_REFERENCE.md](API_REFERENCE.md) → Find extension points
2. **Pattern Match**: [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) → Apply proven techniques
3. **Implement**: Create modules in `custom-ui/src/frontend/`
4. **Test**: `npm run watch` in `custom-ui/` + `npm run start` in `browser-app/`

---

## Documentation Standards

### Maintenance
- **Auto-Generated**: Core structure from codebase analysis
- **Living Documents**: Update when architecture changes
- **Cross-Referenced**: Links between docs and source code
- **Version Tracked**: Maintained in git with source code

### File References
All documentation uses relative links to source files with line numbers:
- Format: `[filename.ts:42](../path/filename.ts#L42)`
- Clickable in VSCode and GitHub
- Permanent references to specific implementations

### Symbols
- 🎯 Important concept
- ⚠️ Warning/caution
- ✅ Recommended approach
- ❌ Anti-pattern
- 📖 External reference
- 🛠️ Technical detail

---

## Project Structure Quick Reference

```
theia-custom-ide/
├── browser-app/          # Main Theia application
│   ├── package.json     # App config, preferences, plugins
│   └── resources/       # Preload HTML, assets
│
├── custom-ui/           # Custom UI extension (@flexbe/custom-ui)
│   ├── src/
│   │   ├── frontend/    # UI customizations
│   │   │   ├── commands/           # Command management
│   │   │   ├── contribution-filters/ # Module filtering
│   │   │   ├── layout/             # Shell & panel layout
│   │   │   ├── navigator/          # Explorer customization
│   │   │   ├── output/             # Output panel customization
│   │   │   ├── search/             # Search customization
│   │   │   └── index.ts            # Main container module
│   │   ├── backend/     # Backend services
│   │   └── frontendPreload/ # Preload initialization
│   ├── lib/             # Build output (gitignored)
│   └── package.json     # Extension config
│
├── plugins/             # VS Code plugins (downloaded)
│   ├── vscode.typescript/
│   ├── vscode.javascript/
│   └── zhuangtongfa.material-theme/
│
├── theia-api/          # (Legacy/experimental)
│
├── claudedocs/         # 📚 This documentation
│   ├── README.md       # This file
│   ├── PROJECT_INDEX.md
│   ├── API_REFERENCE.md
│   └── CUSTOMIZATION_GUIDE.md
│
└── package.json        # Workspace root
```

---

## Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Theia** | IDE Framework | 1.62.2 |
| **Lumino** | UI Widgets & Layouts | Built-in |
| **InversifyJS** | Dependency Injection | Built-in |
| **TypeScript** | Language | 5.8.3 |
| **Vite** | Custom UI Build | 6.3.5 |
| **Turbo** | Monorepo Management | 2.5.4 |

---

## Common Tasks

### Development
```bash
# Install dependencies
npm install

# Download VS Code plugins
npm run download:plugins

# Start development (watch mode)
npm run watch

# Build for production
npm run build

# Start IDE (port 4000)
npm run start

# Clean everything
npm run clean
```

### Customization Workflow
```bash
# 1. Watch custom-ui for changes
cd custom-ui && npm run watch

# 2. In another terminal, run browser-app
cd browser-app && npm run start

# 3. Open http://localhost:4000

# 4. Make changes in custom-ui/src/frontend/

# 5. Refresh browser to see changes

# 6. Run "Reset Workbench Layout" if needed
```

---

## External Resources

### Official Documentation
- [Eclipse Theia Docs](https://theia-ide.org/docs/)
- [Theia Extension Development](https://theia-ide.org/docs/composing_applications/)
- [Lumino Framework](https://lumino.readthedocs.io/)
- [InversifyJS Guide](https://inversify.io/)

### Tutorial Series
- [DZone: Build Your Own IDE](https://dzone.com/articles/theia-deep-dive-build-your-own-ide) - Part 1
- [DZone: Mastering Customization](https://dzone.com/articles/theia-deep-dive-mastering-customization) - Part 2

### Source Code
- [Theia GitHub Repository](https://github.com/eclipse-theia/theia)
- [Theia API Documentation](https://eclipse-theia.github.io/theia/docs/next/)

---

## Support & Contact

### Project Issues
- Check [custom-ui/TODO.md](../custom-ui/TODO.md) for known tasks
- Review git commit history for context
- Consult DZone articles for advanced patterns

### Community Support
- [Theia Discussions](https://github.com/eclipse-theia/theia/discussions)
- [Theia Spectrum Chat](https://spectrum.chat/theia)

---

## Documentation Changelog

### v1.0.0 - 2026-01-04
- ✅ Initial comprehensive documentation
- ✅ Project index with architecture diagrams
- ✅ Complete API reference with examples
- ✅ Advanced customization guide from DZone series
- ✅ Cross-referenced source code links
- ✅ Development workflows documented

---

**Documentation Maintained By**: Claude Code
**Last Updated**: 2026-01-04
**Documentation Version**: 1.0.0
