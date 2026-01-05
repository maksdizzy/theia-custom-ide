#!/usr/bin/env node
/**
 * Patches AI extension package.json files to use 'right' sidebar instead of 'activitybar'.
 * Theia uses 'left', 'right', 'bottom' for viewsContainers (not VS Code's 'activitybar'/'secondarySidebar').
 *
 * Run after: npm run download:plugins
 */

const fs = require('fs');
const path = require('path');

const PLUGINS_DIR = path.join(__dirname, '..', 'plugins');

// AI plugins that need patching
const AI_PLUGINS = [
  'Anthropic.claude-code',
  'Google.geminicodeassist',
  'openai.chatgpt',
  'empathy-consulting.composio-skills'
];

// Keys to move from activitybar/secondarySidebar to right
const CONTAINER_KEYS_TO_MOVE = ['activitybar', 'secondarySidebar', 'panel'];

function patchPlugin(pluginName) {
  const packagePath = path.join(PLUGINS_DIR, pluginName, 'extension', 'package.json');

  if (!fs.existsSync(packagePath)) {
    console.log(`⏭️  Skipping ${pluginName} - not found`);
    return false;
  }

  const content = fs.readFileSync(packagePath, 'utf8');
  const pkg = JSON.parse(content);

  if (!pkg.contributes?.viewsContainers) {
    console.log(`⏭️  Skipping ${pluginName} - no viewsContainers`);
    return false;
  }

  let modified = false;
  const viewsContainers = pkg.contributes.viewsContainers;

  // Move containers from activitybar/secondarySidebar to right
  for (const key of CONTAINER_KEYS_TO_MOVE) {
    if (viewsContainers[key]) {
      if (!viewsContainers.right) {
        viewsContainers.right = [];
      }
      viewsContainers.right.push(...viewsContainers[key]);
      delete viewsContainers[key];
      modified = true;
    }
  }

  if (modified) {
    // Remove duplicates by id
    if (viewsContainers.right) {
      const seen = new Set();
      viewsContainers.right = viewsContainers.right.filter(container => {
        if (seen.has(container.id)) return false;
        seen.add(container.id);
        return true;
      });
    }

    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✅ Patched ${pluginName} → right sidebar`);
    return true;
  }

  console.log(`✓  ${pluginName} already configured for right sidebar`);
  return false;
}

console.log('🔧 Patching AI plugins for Theia right sidebar...\n');

let patchedCount = 0;
for (const plugin of AI_PLUGINS) {
  if (patchPlugin(plugin)) {
    patchedCount++;
  }
}

console.log(`\n✨ Done! Patched ${patchedCount} plugin(s)`);
