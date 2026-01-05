import { interfaces } from '@theia/core/shared/inversify';
import { WidgetFactory, FrontendApplicationContribution, bindViewContribution } from '@theia/core/lib/browser';
import { IntegrationsWidget, INTEGRATIONS_WIDGET_ID } from './integrations-widget';
import { IntegrationsContribution } from './integrations-contribution';

export * from './integrations-widget';
export * from './integrations-contribution';

export function bindIntegrations(bind: interfaces.Bind): void {
    // Bind the widget
    bind(IntegrationsWidget).toSelf().inSingletonScope();

    // Bind widget factory
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: INTEGRATIONS_WIDGET_ID,
        createWidget: () => ctx.container.get<IntegrationsWidget>(IntegrationsWidget),
    })).inSingletonScope();

    // Bind view contribution (this registers the view properly)
    bindViewContribution(bind, IntegrationsContribution);
    bind(FrontendApplicationContribution).toService(IntegrationsContribution);
}
