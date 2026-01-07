import { ContainerModule } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';
import { CommandContribution } from '@theia/core/lib/common';
import { AIPanelViewContainer } from './ai-panel-view-container';
import { AIPanelToggleHandler } from './ai-panel-toggle-handler';
import { AIPanelContribution } from './ai-panel-contribution';

export default new ContainerModule(bind => {
    // Bind AI Panel ViewContainer
    bind(AIPanelViewContainer).toSelf().inSingletonScope();

    // Bind widget factory for AI Panel
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: AIPanelViewContainer.ID,
        createWidget: () => ctx.container.get<AIPanelViewContainer>(AIPanelViewContainer),
    })).inSingletonScope();

    // Bind toggle handler
    bind(AIPanelToggleHandler).toSelf().inSingletonScope();

    // Bind contribution
    bind(AIPanelContribution).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(AIPanelContribution);
    bind(CommandContribution).toService(AIPanelContribution);
});

// Re-export public API
export { AIPanelViewContainer } from './ai-panel-view-container';
export { AIPanelToggleHandler } from './ai-panel-toggle-handler';
export { AIPanelContribution, AIPanelCommands } from './ai-panel-contribution';
