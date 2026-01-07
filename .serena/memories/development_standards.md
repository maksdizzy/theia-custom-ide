# Development Standards & Best Practices

## Core Principle

**MANDATORY**: При редактировании файлов и добавлении фич/изменений всегда проверять на соответствие best practices и industry standards используя Context7 MCP.

## Workflow Integration

### Before Making Changes
1. **Identify Technology Stack**: Определить какие технологии/фреймворки затрагиваются
2. **Query Context7**: Получить актуальную документацию и best practices
3. **Validate Approach**: Убедиться что подход соответствует industry standards

### Context7 Usage Pattern
```
1. mcp__MCP_DOCKER__resolve-library-id → получить library ID
2. mcp__MCP_DOCKER__get-library-docs → получить документацию и patterns
3. Применить best practices к реализации
```

### Key Technologies for This Project
| Technology | Context7 Query | Focus Areas |
|------------|----------------|-------------|
| **Theia** | `@theia/core` | Widget patterns, DI, ColorContribution |
| **TypeScript** | `typescript` | Type safety, strict mode patterns |
| **InversifyJS** | `inversify` | DI patterns, rebind, decorators |
| **Lumino** | `@lumino/widgets` | Layout, panels, widgets |
| **Less/CSS** | `less` | Variables, mixins, nesting |

## Validation Checklist

### TypeScript Files
- [ ] Strict type annotations
- [ ] Proper error handling
- [ ] InversifyJS DI patterns
- [ ] Theia contribution patterns

### CSS/Less Files
- [ ] NO hard-coded colors (use `var(--theia-*)`)
- [ ] NO `!important` flags unless absolutely necessary
- [ ] Proper selector specificity
- [ ] Follow Theia theming guidelines

### Theia Extensions
- [ ] Use ColorContribution for colors (NOT CSS variables)
- [ ] Follow widget lifecycle patterns
- [ ] Proper command registration
- [ ] Menu/keybinding contribution patterns

## Example Workflow

```markdown
### Task: Add new sidebar widget

1. **Query Context7**:
   - resolve-library-id: "@theia/core"
   - get-library-docs: topic="widgets"
   
2. **Extract Best Practices**:
   - Widget must extend ReactWidget or BaseWidget
   - Register via WidgetFactory
   - Use @injectable() decorator
   - Implement proper lifecycle methods

3. **Implement Following Standards**:
   - Apply patterns from Context7 docs
   - Validate against Theia examples
   - Test integration
```

## Anti-Patterns to Avoid

### CSS Anti-Patterns (Learned from premium-design.less removal)
- ❌ Hard-coded hex colors
- ❌ Multiple `!important` flags
- ❌ Duplicate selectors across files
- ❌ Deep nesting (>3 levels)

### TypeScript Anti-Patterns
- ❌ `any` type usage
- ❌ Missing error handling
- ❌ Direct instantiation (use DI)
- ❌ Tight coupling

## Enforcement

This standard is **MANDATORY** for:
- All new features
- All bug fixes
- All refactoring
- All style changes

**Rationale**: Session 2026-01-07 demonstrated that violating Theia patterns (premium-design.less) caused 478 lines of technical debt requiring complete removal.
