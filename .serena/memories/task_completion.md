# Task Completion Checklist

## Before Completing Any Task

### 1. Build Verification
```bash
npm run build
```
Ensure no compilation errors in any workspace.

### 2. Type Checking
TypeScript compilation happens during build. Watch for:
- Strict null check violations
- Implicit any errors
- Unused locals warnings

### 3. Linting (if available)
ESLint config exists but no explicit lint script in root.
Check custom-ui and browser-app for lint errors if configured.

### 4. Manual Testing
```bash
npm run start  # Start IDE on port 4000
```
Test affected functionality in browser at http://localhost:4000

## Workspace-Specific Verification

### custom-ui Changes
```bash
cd custom-ui
npm run build      # Vite build + dts generation
npm run dts        # Verify declaration files generate
```

### browser-app Changes
```bash
cd browser-app
npm run rebuild    # Rebuild native dependencies
npm run build      # Full production build
```

## Common Issues to Check

### After Adding Filters
- Verify filtered feature is completely removed
- Check no console errors related to missing contributions
- Test that remaining features work correctly

### After Layout Changes
- Test panel drag-and-drop behavior
- Verify collapse/expand functionality
- Check responsive behavior

### After Command Changes
- Verify command palette (Ctrl+Shift+P)
- Test keyboard shortcuts
- Check menu entries

## Documentation Updates
If task affects architecture or workflows:
- Update `claudedocs/PROJECT_INDEX.md`
- Update relevant API docs if needed
