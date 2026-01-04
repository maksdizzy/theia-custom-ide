import { ContributionFilterRegistry, FilterContribution } from '@theia/core/lib/common';
import { injectable, interfaces } from '@theia/core/shared/inversify';

import { filterContributions as debugFilterContributions } from './filter-debug';
import { filterContributions as hierarchyFilterContributions } from './filter-hierarchy';
import { filterContributions as notebookFilterContributions } from './filter-notebook';
import { filterContributions as outlineFilterContributions } from './filter-outline';
import { filterContributions as outputFilterContributions } from './filter-output';
import { filterContributions as pluginFilterContributions } from './filter-plugin';
import { filterContributions as problemsFilterContributions } from './filter-problems';
import { filterContributions as scmFilterContributions } from './filter-scm';
import { filterContributions as tasksFilterContributions } from './filter-tasks';
import { filterContributions as testFilterContributions } from './filter-test';
import { filterContributions as windowFilterContributions } from './filter-window';

const filtered = [
    ...debugFilterContributions,
    ...testFilterContributions,
    ...scmFilterContributions,
    ...outlineFilterContributions,
    ...hierarchyFilterContributions,
    ...outputFilterContributions,
    ...problemsFilterContributions,
    ...pluginFilterContributions,
    ...tasksFilterContributions,
    ...notebookFilterContributions,
    ...windowFilterContributions,
];

@injectable()
export class RemoveFromUIFilterContribution implements FilterContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void {
        registry.addFilters('*', [
            (contrib) => {
                return !filtered.some(c => contrib instanceof c);
            },
        ]);
    }
}

export function registerFilters({ bind, rebind }: { bind: interfaces.Bind; rebind: interfaces.Rebind }): void {
    bind(FilterContribution).to(RemoveFromUIFilterContribution).inSingletonScope();
}
