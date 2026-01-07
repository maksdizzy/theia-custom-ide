# Troubleshooting Phase 1 Fixes - 2026-01-07

## Problem Report
User: "не все фиксы из фазы 1 применились" (not all Phase 1 fixes were applied)

## Root Cause Analysis

### Issue #1: Status Bar z-index Not Applying
**File**: `premium-design.less:266-270`
**Problem**: Incorrect nesting created invalid selector
```less
body.theia-light #theia-statusBar {
    ...
    #theia-statusBar {  // WRONG: nested inside parent
        position: relative;
        z-index: 50;
    }
}
```

**Result**: Selector became `body.theia-light #theia-statusBar #theia-statusBar` (doesn't match anything)

**Fix**: Moved `position: relative` and `z-index: 50` directly into parent selector
```less
body.theia-light #theia-statusBar {
    display: flex;
    ...
    position: relative;  // MOVED HERE
    z-index: 50;         // MOVED HERE
    
    .area { ... }
    .element { ... }
}
```

## Verification Status

### ✅ Fixes Present in Code (before rebuild)
1. Text contrast in tree selection (premium-design.less:148-160) ✅
2. Dark bar removed (premium-design.less:61-64) ✅
3. Icon bars bottom: 28px (side-panel.less:33, activity-bar.less:53) ✅
4. Scrollbars 6px (premium-design.less:407-428) ✅
5. Sidebar header compact padding (premium-design.less:106) ✅
6. Search field compact (premium-design.less:343-359) ✅
7. Dropdown compact (premium-design.less:379-385) ✅

### ❌ Issues Found
- Status bar z-index selector was incorrect (nested improperly)
- Only affects z-index and position properties for status bar

## Resolution

### Actions Taken
1. **Identified** root cause: LESS nesting created wrong selector
2. **Fixed** premium-design.less lines 207-209: moved properties to parent
3. **Rebuilt** Docker image: `npm run docker:build` (successful)
4. **Started** container: `npm run start:docker` (successful)

### Build Details
- Build time: ~3m 15s
- Image: docker.io/library/flexbe-ide:latest
- Container: flexbe-ide (recreated and started)

## Files Modified
- `custom-ui/src/frontend/style/premium-design.less` - Fixed status bar z-index nesting

## Next Steps
1. Verify in browser that status bar now has correct z-index
2. Verify all 7 Phase 1 fixes are working
3. Update session memories with successful resolution

## Key Learning
**LESS Nesting Rule**: Never nest a selector inside itself like `#foo { #foo { } }` - it creates `#foo #foo` which matches nothing. Instead, add properties directly to parent or use `&` for compound selectors.
