import { ContainerModule } from '@theia/core/shared/inversify';

import { initCommands } from './commands';
import { registerFilters } from './contribution-filters';
import { initApplicationShell } from './layout/application-shell';
import { initFileNavigator } from './navigator/navigator-widget-factory';
import { initOutputContribution } from './output/output-toolbar-contribution';
import { initSearchWidget } from './search/search-in-workspace-factory';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    // Filter out modules we don't want to see in the editor
    registerFilters({ bind, rebind });

    // Register or unregister commands and menus
    initCommands({ bind, rebind });

    // SEARCH: Rebind Search in workspace to disable dragging to other containers
    initSearchWidget({ rebind });

    // EXPLORER: Rebind Navigation factory to remove open editors widget
    initFileNavigator({ bind, rebind });

    // OUTPUT: Rebind Output widget to disable closing
    initOutputContribution({ bind, rebind });

    // Shell: Disable collapsing panels and dnd
    initApplicationShell({ bind, rebind });
});
