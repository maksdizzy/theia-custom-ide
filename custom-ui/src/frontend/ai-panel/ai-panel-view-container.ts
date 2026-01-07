import { ViewContainer, Widget } from '@theia/core/lib/browser';
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify';
import { PluginViewRegistry } from '@theia/plugin-ext/lib/main/browser/view/plugin-view-registry';

/**
 * ViewContainer for AI plugin widgets in the right panel.
 *
 * Discovers and manages AI assistant widgets from VS Code extensions:
 * - Claude Code (Anthropic)
 * - Gemini Code Assist (Google)
 * - ChatGPT (OpenAI)
 * - Composio Skills
 */
@injectable()
export class AIPanelViewContainer extends ViewContainer {
    static readonly ID = 'ai-panel-container';
    static readonly LABEL = 'AI Assistants';

    @inject(PluginViewRegistry)
    protected readonly pluginViewRegistry: PluginViewRegistry;

    /**
     * Known AI plugin view IDs from package.json contributions.
     * These are the view IDs registered by each plugin's package.json.
     */
    private readonly AI_VIEW_IDS = [
        'claude-sidebar',                          // Claude Code
        'geminicodeassist-panel',                  // Gemini Code Assist
        'chatgpt-view',                            // ChatGPT
        'composioSkills.skillsWebviewView',       // Composio Skills
    ];

    private discoveryTimeout: NodeJS.Timeout | undefined;
    private discoveryAttempts = 0;
    private readonly MAX_DISCOVERY_ATTEMPTS = 10;
    private readonly DISCOVERY_INTERVAL_MS = 500;

    @postConstruct()
    protected init(): void {
        this.id = AIPanelViewContainer.ID;
        this.setTitleOptions({
            label: AIPanelViewContainer.LABEL,
            closeable: false,
        });

        // Start widget discovery after initialization
        setTimeout(() => this.startWidgetDiscovery(), 100);
    }

    /**
     * Starts periodic widget discovery.
     * AI plugins may load asynchronously, so we poll the registry.
     */
    private startWidgetDiscovery(): void {
        this.discoveryTimeout = setInterval(() => {
            this.discoverAndAddWidgets();
            this.discoveryAttempts++;

            // Stop after max attempts
            if (this.discoveryAttempts >= this.MAX_DISCOVERY_ATTEMPTS) {
                this.stopWidgetDiscovery();
            }
        }, this.DISCOVERY_INTERVAL_MS);

        // Initial discovery attempt
        this.discoverAndAddWidgets();
    }

    /**
     * Stops widget discovery polling.
     */
    private stopWidgetDiscovery(): void {
        if (this.discoveryTimeout) {
            clearInterval(this.discoveryTimeout);
            this.discoveryTimeout = undefined;
        }
    }

    /**
     * Discovers AI widgets from PluginViewRegistry and adds them to container.
     * Runs synchronously to avoid race conditions.
     */
    private async discoverAndAddWidgets(): Promise<void> {
        for (const viewId of this.AI_VIEW_IDS) {
            try {
                const view = await this.pluginViewRegistry.getView(viewId);
                if (view && !this.hasWidget(viewId)) {
                    this.addAIWidget(view);
                }
            } catch (error) {
                // Plugin not loaded yet or view not available
                // This is expected during plugin initialization
            }
        }
    }

    /**
     * Checks if widget with given ID is already added.
     */
    private hasWidget(widgetId: string): boolean {
        // Use getParts() to get all widgets in the container
        const parts = this.getParts();
        return parts.some((part: Widget) => part.id === widgetId);
    }

    /**
     * Adds an AI widget to the container with appropriate options.
     *
     * @param widget The widget to add
     */
    private addAIWidget(widget: Widget): void {
        const options: ViewContainer.Factory.WidgetOptions = {
            order: this.getWidgetOrder(widget.id),
            canHide: false,
            initiallyCollapsed: false,
            weight: 1,
            disableDraggingToOtherContainers: true,
        };

        this.addWidget(widget, options);
        console.debug(`[AIPanelViewContainer] Added AI widget: ${widget.id}`);
    }

    /**
     * Determines display order for AI widgets.
     *
     * @param widgetId The widget ID
     * @returns Order priority (lower = higher in list)
     */
    private getWidgetOrder(widgetId: string): number {
        const orderMap: Record<string, number> = {
            'claude-sidebar': 0,                          // Claude first (most used)
            'geminicodeassist-panel': 1,                  // Gemini second
            'chatgpt-view': 2,                            // ChatGPT third
            'composioSkills.skillsWebviewView': 3,        // Composio last
        };

        return orderMap[widgetId] ?? 99;
    }

    override dispose(): void {
        this.stopWidgetDiscovery();
        super.dispose();
    }
}
