import { ContributionFilterRegistry, FilterContribution } from '@theia/core/lib/common';
import { interfaces } from '@theia/core/shared/inversify';
export declare class RemoveFromUIFilterContribution implements FilterContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void;
}
export declare function registerFilters({ bind, rebind }: {
    bind: interfaces.Bind;
    rebind: interfaces.Rebind;
}): void;
//# sourceMappingURL=index.d.ts.map