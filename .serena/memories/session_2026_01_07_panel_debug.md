# Session: Side Panel Debug - 2026-01-07

## Проблемы Обнаруженные

### 1. Правая панель не отображается
- **Причина**: `tabCount: 0` — нет виджетов в правой панели
- **Классы**: `lm-mod-hidden theia-mod-collapsed`
- AI плагины (Claude, Gemini, ChatGPT) **не загрузились** — нет `package.json`

### 2. AI Плагины Повреждены
```
ERROR: Failed to load plugin dependencies from 'plugins/Anthropic.claude-code'
Error: ENOENT: no such file or directory, open '.../package.json'
```
- Claude, Gemini, ChatGPT плагины распакованы, но **без package.json** в extension/
- Composio работает (единственный рабочий AI плагин)

### 3. Composio в ЛЕВОЙ панели
- Несмотря на `"viewsContainers": { "right": [...] }` в package.json
- Theia помещает его в LEFT панель
- Возможно Theia не поддерживает `"right"` напрямую

### 4. Левая панель - дублирование табов
```javascript
leftTabs: [
  "Files", "Search", "Composio: Integrations",
  "Files", "Search", "Composio: Integrations",  // дубликаты!
  "Files", "Composio: Integrations", "Search"
]
```

## Изменения Внесённые в Этой Сессии

### 1. side-panel-handler.ts
- Toggle только для right panel (`this.side === 'right'`)
- Заменил `this.refresh()` на `this.expand(title.owner.id)`

### 2. side-panel.less  
- Добавил `#theia-left-content-panel` prefix к `.theia-app-sides`
- Убрал `!important` с min-width

### 3. activity-bar.less
- Добавил CSS reset для `.theia-app-sides` в right panel

### 4. scripts/full-start.sh
- Улучшена проверка сборки (lib/backend + lib/frontend)
- Использует `find -newer` для точного сравнения

---

## План Дальнейших Действий

### Этап 1: Очистка и Откат (если нужно)
```bash
# Откатить изменения панелей если они ухудшают ситуацию
git diff custom-ui/src/frontend/
git checkout custom-ui/src/frontend/layout/side-panel-handler.ts
git checkout custom-ui/src/frontend/style/side-panel.less
git checkout custom-ui/src/frontend/style/activity-bar.less
```

### Этап 2: Исправление AI Плагинов
1. **Пересобрать плагины** - скачать заново с правильной структурой
2. **Или вручную скопировать package.json** в каждый плагин
3. **Запустить patch-ai-plugins.js** после исправления

### Этап 3: Исследование Theia viewsContainers
1. Проверить как Theia обрабатывает `"right"` viewContainer
2. Возможно нужен другой подход (не через package.json)
3. Рассмотреть WidgetFactory override

### Этап 4: Дебаг Левой Панели
1. Исследовать дублирование табов
2. Проверить shell-init-contribution.ts
3. Возможно проблема в multiple renders

---

## Ключевые Файлы

| Файл | Назначение |
|------|------------|
| `custom-ui/src/frontend/layout/side-panel-handler.ts` | Toggle логика панелей |
| `custom-ui/src/frontend/layout/application-shell.ts` | Layout с stretch factors |
| `custom-ui/src/frontend/style/activity-bar.less` | CSS для right panel icons |
| `custom-ui/src/frontend/style/side-panel.less` | CSS для left panel tabs |
| `scripts/patch-ai-plugins.js` | Патч для AI плагинов → right |

---

## Полезные Команды для Дебага

```bash
# Проверить структуру плагинов
ls -la plugins/*/extension/package.json

# Запустить патч
node scripts/patch-ai-plugins.js

# Пересобрать
npm run build --workspace=custom-ui
npm run build --workspace=browser-app

# Проверить логи
grep -i "error\|failed" /tmp/theia-logs/*
```

---

## Открытые Вопросы

1. Почему Theia игнорирует `"right"` viewContainer?
2. Откуда дублирование табов в левой панели?
3. Как правильно скачать AI плагины с package.json?
