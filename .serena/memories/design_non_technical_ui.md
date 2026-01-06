# Design: Non-Technical User UI

## Summary
Complete design specification created for transforming Flexbe IDE for non-technical users.

## Key Design Decisions

### Theme
- Light theme as default
- Colors: white (#ffffff) background, blue (#3b82f6) accent
- Menu bar completely hidden via `window.menuBarVisibility: hidden`

### AI Panel (Right Sidebar)
- Custom ReactWidget with model dropdown (Claude, ChatGPT, Gemini)
- Chat interface with quick commands (/edit, /run, /workflow)
- Toggle button when collapsed
- File: `custom-ui/src/frontend/ai-panel/`

### Activity Bar (Left)
- 4 items only: Files, Integrations, Search, Settings
- Uses existing horizontal layout from SidePanelHandler

### Integrations Panel
- Composio plugin integration
- Connected/Available sections with expandable categories
- File: `custom-ui/src/frontend/integrations/`

### Status Bar
- Simplified: project name + connection status only
- Hide git, encoding, cursor position, etc.

## Implementation Phases
1. Light theme + hide menu (2-3 days)
2. AI Panel widget (4-5 days)
3. Activity Bar + Integrations (3-4 days)
4. Status Bar simplification (1-2 days)

## Document Location
Full spec: claudedocs/DESIGN_SPEC_NON_TECHNICAL_UI.md
