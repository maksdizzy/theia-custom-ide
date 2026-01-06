# Build Configuration and Known Issues

## Python Version for node-gyp

**Issue**: Native module compilation fails with Python 3.14+
**Cause**: Python 3.14 removed the deprecated `distutils` module that node-gyp still requires
**Solution**: Configure npm to use Python 3.10 which has distutils support

### Configuration File: `.npmrc`
```
python=/opt/homebrew/bin/python3.10
```

### Environment Variable Alternative
```bash
npm_config_python=/opt/homebrew/bin/python3.10 npm install
```

### Verification
```bash
# Check Python version being used
npm config get python

# After configuration change, clean and reinstall
rm -rf node_modules
npm install
```

## Known Dependency Warnings (Non-Breaking)

The following deprecation warnings are expected and do not affect functionality:
- `inflight@1.0.6` - Theia dependency, memory leak warning
- `rimraf` versions < 4 - Multiple transitive dependencies
- `xterm` packages - Theia uses older versions, newer `@xterm/*` packages exist
- `glob` versions < 9 - Multiple transitive dependencies
- Various other deprecated packages in Theia's dependency tree

## Security Vulnerabilities

Current status (as of 2026-01-04):
- 47 vulnerabilities (19 low, 2 moderate, 25 high, 1 critical)
- These are in Theia's dependency tree, not project code
- Review with `npm audit` before production deployment
- Use `npm audit fix` cautiously as it may break Theia compatibility

## VS Code Extensions (Plugins)

**Issue**: Downloaded VSIX packages missing dependencies and compiled files
**Cause**: `npm run download:plugins` downloads source packages, not pre-built extensions

### Plugin Dependency Installation
Material Icon Theme and One Dark Pro theme require npm dependencies:

```bash
# Material Icon Theme
cd plugins/PKief.material-icon-theme/extension
npm install --omit=dev --ignore-scripts

# One Dark Pro Theme
cd plugins/zhuangtongfa.material-theme/extension
npm install --omit=dev --ignore-scripts
```

### Material Icon Theme Build Issue
The downloaded VSIX lacks compiled `dist/` directory. Solution:
```bash
# Download and extract proper VSIX with dist/
curl -sL "https://open-vsx.org/api/PKief/material-icon-theme/5.23.0/file/PKief.material-icon-theme-5.23.0.vsix" -o material-icons.vsix
unzip -q material-icons.vsix -d material-icons-extracted
cp -r material-icons-extracted/extension/dist plugins/PKief.material-icon-theme/extension/
```

## Workspace Configuration

**Issue**: Default workspace path `/project/workspace` is read-only
**Solution**: Changed to local `../workspace` directory

Modified `browser-app/package.json`:
```json
"start": "theia start ../workspace -p 4000 --plugins=local-dir:../plugins"
```

Created workspace directory:
```bash
mkdir -p workspace
```

## Native Module Dependencies

**drivelist**: Requires native compilation via node-gyp
- Purpose: File system drive enumeration for Theia file explorer
- Build requirements: Python 3.10-3.13, C++ compiler toolchain
- Platform: macOS ARM64 (darwin/arm64)
