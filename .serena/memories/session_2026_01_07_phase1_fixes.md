# ФАЗА 1 Исправлений - 2026-01-07

## Критические баги исправлены ✅

### 1. Контраст текста при выделении в дереве файлов
**Файл**: `premium-design.less:149-161`  
**Исправление**: Добавлен явный цвет текста для `.theia-mod-selected`
```less
color: var(--theia-foreground) !important;
```
Также для дочерних элементов `.theia-TreeNodeSegment`, `.theia-TreeNodeSegmentGrow`.

### 2. Тёмная полоса снизу
**Файл**: `premium-design.less:61-64`  
**Исправление**: Удалён `box-shadow` с `#theia-bottom-content-panel`

### 3. Наезжание боковых иконок на status bar
**Файлы**: 
- `side-panel.less:33` - Left icon bar
- `activity-bar.less:53` - Right icon bar  
**Исправление**: Изменён `bottom: 0` на `bottom: 28px` (оставлено место для status bar)

**Файл**: `premium-design.less:266-270`
**Дополнительно**: Добавлен `z-index: 50` для `#theia-statusBar`

### 4. Широкие scrollbars
**Файл**: `premium-design.less:380-395`  
**Исправление**:
- `width: 6px` (было 8px)
- `background: rgba(100, 116, 139, 0.2)` (было 0.3)
- `border-radius: 3px` (было 4px)

### 5. Большие отступы в шапках сайдбаров  
**Файл**: `premium-design.less:106`  
**Исправление**: `padding: var(--flexbe-space-1) var(--flexbe-space-3)` (было space-3 space-4)

### 6. Огромное поле Search
**Файл**: `premium-design.less:342-359`  
**Исправление**: Создан отдельный селектор для `input[type="search"]` с компактным padding:
- `padding: var(--flexbe-space-1) var(--flexbe-space-2)` (4px 8px)
- `border-radius: 6px` (вместо 8px)

### 7. Огромный Dropdown на Output
**Файл**: `premium-design.less:378-385`  
**Исправление**: Добавлен специфичный селектор для toolbar dropdowns:
```less
.lm-TabBar-toolbar .theia-select-component,
#theia-bottom-content-panel .theia-select-component {
    padding: 2px var(--flexbe-space-1);  /* 2px 4px */
    min-height: 22px;
    font-size: 12px;
}
```

## Изменённые файлы

1. `custom-ui/src/frontend/style/premium-design.less` - основные исправления
2. `custom-ui/src/frontend/style/side-panel.less` - left icon bar bottom
3. `custom-ui/src/frontend/style/activity-bar.less` - right icon bar bottom

## Следующие шаги

Пересобрать Docker контейнер для применения изменений:
```bash
npm run clean
npm run docker:build
npm run start:docker
```
