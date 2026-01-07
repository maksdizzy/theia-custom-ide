# Session: Panel Icon Fixes - 2026-01-07

## User Issues Identified

From screenshot analysis:
1. **Right panel (AI agents)**: Icons at 48px - too large, needed 36px
2. **Left panel (FILES, Search, Git)**: 
   - Horizontal layout with text labels (wrong format)
   - Icons cropped/cut off
   - Strange background fill
   - Should match right panel vertical icon-only style
3. **Both panels**: Box-shadow creating gradient darkening at bottom
4. **premium-design.less**: Many conflicting styles interfering with icon layout

## Solutions Implemented ✅

### 1. Reduced Icon Sizes (48px → 36px)

**File**: `application-shell.less`

Changed CSS variables:
```less
--theia-private-sidebar-tab-width: 48px → 36px
--theia-private-sidebar-tab-height: 48px → 36px
--theia-private-sidebar-tabicon-width: 48px → 36px
--theia-private-sidebar-icon-size: 24px → 20px
--theia-private-sidebar-tab-padding-top-and-bottom: 10px → 8px
--theia-private-sidebar-tab-padding-left-and-right: 10px → 8px
```

Added separate variables for left panel:
```less
--theia-private-left-sidebar-tab-width: 36px
--theia-private-left-sidebar-icon-size: 20px
```

### 2. Converted Left Panel to Vertical Layout

**File**: `side-panel.less` (complete rewrite)

**Before**: Horizontal tabs with text labels
```less
flex-direction: row;
.lm-TabBar-tabLabel { display: inline-flex; }
```

**After**: Vertical icon-only (matching right panel)
```less
flex-direction: column !important;
flex: 0 0 var(--theia-private-left-sidebar-tab-width);
.lm-TabBar-tabLabel { display: none; }  // Hide labels
```

Key changes:
- Position absolute left edge (like right panel uses absolute right edge)
- Vertical flex layout
- Icon-only display (no text labels)
- Active indicator: right border (instead of left for right panel)
- Proper z-index layering (100)

### 3. Removed Box-Shadow Darkening

**File**: `premium-design.less`

**Removed** (lines 42-52):
```less
#theia-left-content-panel {
    box-shadow: var(--flexbe-shadow-md);  // ❌ Created gradient darkening
}
#theia-right-content-panel {
    box-shadow: var(--flexbe-shadow-md);  // ❌ Created gradient darkening
}
```

### 4. Fixed premium-design.less Conflicts

**File**: `premium-design.less`

**Disabled conflicting styles** (lines 124-126, 159-172):

```less
// BEFORE (conflicted with vertical layout):
.lm-TabBar.theia-app-sides .lm-TabBar-content {
    padding: var(--flexbe-space-2) var(--flexbe-space-3);  // ❌ Broke icon alignment
}
.lm-TabBar.theia-app-sides .lm-TabBar-tab {
    &:hover {
        transform: translateY(-1px);  // ❌ Wrong axis for vertical layout
    }
}

// AFTER (commented out):
// These styles conflict with vertical icon layout
// ...
```

**Why these caused problems**:
- Padding on `.lm-TabBar-content` pushed icons away from edge
- `translateY(-1px)` is for horizontal tabs (should be translateX for vertical)
- Generic `.theia-app-sides` selector applied to BOTH left and right panels

## Architecture Decision: Separate Left/Right Styles

**Problem**: premium-design.less had generic `.theia-app-sides` selectors affecting both panels

**Solution**:
- Left panel: Specific selectors `.lm-TabBar.theia-app-left`
- Right panel: Specific selectors `.lm-TabBar.theia-app-right`  
- NO generic `.theia-app-sides` styling that breaks layout

## Files Modified

1. **application-shell.less** (+2 variables, modified 6 values)
2. **side-panel.less** (complete rewrite - 118 lines)
3. **premium-design.less** (-box-shadow, disabled 2 conflicting style blocks)

## Testing Status

**Build required**:
```bash
npm run clean
npm run docker:build
npm run start:docker
```

**Expected result**:
- Left panel: Vertical 36px icons (FILES, Search, Git) - icon-only
- Right panel: Vertical 36px icons (Claude, Gemini, ChatGPT, Composio)
- No gradient darkening at panel bottoms
- Icons fully visible, not cropped
- Consistent style left/right

## Technical Notes

### CSS Class Structure (Theia)

**Left panel**:
```
#theia-left-content-panel
  .lm-TabBar.theia-app-sides  // Generic wrapper
  .lm-TabBar.theia-app-left   // Specific class for left
    .lm-TabBar-tab
      .lm-TabBar-tabIcon
      .lm-TabBar-tabLabel
```

**Right panel**:
```
#theia-right-content-panel
  .lm-TabBar.theia-app-sides  // Generic wrapper
  .lm-TabBar.theia-app-right  // Specific class for right
    .lm-TabBar-tab
      .lm-TabBar-tabIcon
      .lm-TabBar-tabLabel
```

### Specificity Strategy

Use highest specificity for overrides:
```less
// ✅ GOOD (specific)
#theia-left-content-panel .lm-TabBar.theia-app-left .lm-TabBar-tab {
    // Styles only for left panel
}

// ❌ BAD (too generic, affects both panels)
.lm-TabBar.theia-app-sides .lm-TabBar-tab {
    // Affects BOTH left and right - causes conflicts
}
```

## Lessons Learned

1. **Generic selectors are dangerous**: `.theia-app-sides` affected both panels unexpectedly
2. **premium-design.less needs review**: Many "premium" styles actually break layouts
3. **Theia uses both generic + specific classes**: Must target specific classes to avoid conflicts
4. **Box-shadow can create gradients**: Multi-directional shadows appear as darkening
5. **Icon-only is cleaner**: Text labels cause alignment issues and cropping

## Next Steps

After testing, if successful:
1. Consider removing more "premium" styles that add complexity without value
2. Document CSS architecture for future developers
3. Add comments explaining why certain styles are disabled
