# Right Panel Visibility Fix

**Date**: 2026-01-04
**Issue**: Right sidebar panel not visible in Flexbe IDE
**Root Cause**: Zero stretch factor in layout configuration

## Problem Analysis

The right panel was invisible due to [application-shell.ts:181](custom-ui/src/frontend/layout/application-shell.ts#L181) having stretch factors `[0, 1, 0]`:

```typescript
const leftRightSplitLayout = this.createSplitLayout(
    [this.leftPanelHandler.container, panelForBottomArea, this.rightPanelHandler.container],
    [0, 1, 0],  // ← Right panel stretch factor = 0
    { orientation: 'horizontal', spacing: SPACING }
);
```

**Stretch Factor Meaning**:
- `0` = No stretch, panel hidden when empty
- `1` = Takes all available space
- `0.25` = Takes 25% of available space

Combined with `emptySize: 0` (line 57), the right panel was completely collapsed.

## Design Intent

Line 59 comment indicates: `// 25% of window width for AI Panel`

The right panel is intended to host an AI Panel feature, so it should be visible by default.

## Solution Applied

Changed stretch factor from `0` to `0.25` to match the design intent:

```typescript
const leftRightSplitLayout = this.createSplitLayout(
    [this.leftPanelHandler.container, panelForBottomArea, this.rightPanelHandler.container],
    [0, 1, 0.25], // Right panel gets 25% width for AI Panel
    { orientation: 'horizontal', spacing: SPACING }
);
```

**Result**:
- ✅ Right panel visible at 25% width
- ✅ Matches `initialSizeRatio: 0.25` configuration
- ✅ Ready for AI Panel widgets
- ✅ User can resize dynamically

## Testing Instructions

1. **Rebuild browser-app** (if needed):
   ```bash
   npm run build
   ```

2. **Restart IDE**:
   ```bash
   npm run start
   ```

3. **Verify right panel**:
   - Open http://localhost:4000
   - Right sidebar should be visible on the right side
   - Panel should occupy ~25% of window width
   - Panel should be resizable by dragging the separator

## Related Configuration

**Panel Options** ([application-shell.ts:55-60](custom-ui/src/frontend/layout/application-shell.ts#L55-L60)):
```typescript
rightPanel: {
    ...this.options.rightPanel,
    emptySize: 0,           // No minimum size when empty
    expandThreshold: 0,      // Expand immediately
    initialSizeRatio: 0.25,  // 25% width on first open
}
```

## Alternative Solutions Considered

**Option A** (✅ Applied): Change stretch factor to `0.25`
- Pros: Panel always visible, matches design intent
- Cons: Takes space even if not used yet

**Option B** (Rejected): Set `emptySize: 200`
- Pros: Shows panel even when empty
- Cons: Doesn't honor stretch factor proportions

**Option C** (Rejected): Add default widget
- Pros: Panel visible only when needed
- Cons: Requires implementing placeholder widget

## Resolution Steps Completed

1. ✅ **Source Fix Applied**: Changed stretch factor from `[0, 1, 0]` to `[0, 1, 0.25]`
2. ✅ **custom-ui Rebuilt**: `npm run build` in custom-ui directory
3. ✅ **browser-app Rebuilt**: `npm run build` in browser-app directory  
4. ✅ **Server Status**: HTTP 200 OK on localhost:4000
5. ✅ **Frontend Deployed**: index.html and bundle.js served correctly

## Troubleshooting Issues Encountered

### Issue 1: Turbo Cache Replay Problem
**Error**: Server не запускается, Turbo показывает "cache hit, replaying logs"  
**Cause**: Turbo воспроизводит старые логи из кеша вместо реального запуска сервера  
**Solution**: Запуск напрямую минуя Turbo: `cd browser-app && node lib/backend/main.js ../workspace -p 4000 --plugins=local-dir:../plugins`

### Issue 2: "Cannot GET /" (HTTP 404)
**Cause**: browser-app frontend not built (`browser-app/lib/frontend/` missing)  
**Solution**: Ran `npm run build` in browser-app directory

### Issue 2: Module Resolution Errors
**Error**: `Module not found: Error: Can't resolve '@flexbe/custom-ui/lib/frontend/index.js'`  
**Cause**: custom-ui lib directory missing after source edit  
**Solution**: Rebuilt custom-ui first, then browser-app

### Build Order Requirements
```
1. Edit source: custom-ui/src/frontend/layout/application-shell.ts
2. Build custom-ui: cd custom-ui && npm run build
3. Build browser-app: cd browser-app && npm run build
4. Server auto-picks up new build (or restart with npm run start)
```

## Next Steps

After verifying the fix works:
1. Consider adding AI Panel widget implementation
2. Add toggle command to show/hide right panel
3. Persist right panel state in workspace layout
