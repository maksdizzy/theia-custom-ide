import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { StatusBar, StatusBarAlignment, StatusBarEntry } from '@theia/core/lib/browser/status-bar';
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { Disposable, DisposableCollection } from '@theia/core/lib/common';

// Status bar items to hide (technical details not needed for non-technical users)
const ITEMS_TO_HIDE = [
    // Editor status items
    'editor-status-encoding',
    'editor-status-eol',
    'editor-status-language',
    'editor-status-cursor-position',
    'editor-status-tabSize',
    'editor-status-indentation',

    // Git/SCM items
    'scm-status',
    'git-branch-status',
    'git-sync-status',
    'git-checkout-status',

    // Problems and diagnostics
    'problems-status',
    'marker-status',

    // Debug items
    'debug-status',

    // Terminal items
    'terminal-status',

    // Plugin items
    'plugin-status',

    // Other technical items
    'line-ending-status',
    'encoding-status',
    'feedback-status',
    'update-status',
];

@injectable()
export class StatusBarSimplification implements FrontendApplicationContribution {
    @inject(StatusBar)
    protected readonly statusBar: StatusBar;

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService;

    protected readonly toDispose = new DisposableCollection();

    @postConstruct()
    protected init(): void {
        // Initial cleanup
        this.cleanupStatusBar();

        // Set up simplified status items
        this.setupSimplifiedStatus();
    }

    async onStart(app: FrontendApplication): Promise<void> {
        // Delay to ensure all status bar items are registered
        setTimeout(() => {
            this.cleanupStatusBar();
            this.setupSimplifiedStatus();
        }, 2000);

        // Monitor for new status bar items and clean them up
        this.monitorStatusBar();
    }

    protected cleanupStatusBar(): void {
        ITEMS_TO_HIDE.forEach(itemId => {
            try {
                this.statusBar.removeElement(itemId);
            } catch {
                // Item might not exist - that's fine
            }
        });
    }

    protected setupSimplifiedStatus(): void {
        // Project name (left side)
        const workspaceName = this.getWorkspaceName();
        const projectEntry: StatusBarEntry = {
            text: `$(folder) ${workspaceName}`,
            alignment: StatusBarAlignment.LEFT,
            priority: 1000,
            tooltip: 'Current workspace',
        };
        this.statusBar.setElement('flexbe-project', projectEntry);

        // Connection status (right side)
        const connectionEntry: StatusBarEntry = {
            text: '$(cloud) Connected',
            alignment: StatusBarAlignment.RIGHT,
            priority: 1000,
            tooltip: 'Connection status',
            className: 'flexbe-status-connected',
        };
        this.statusBar.setElement('flexbe-connection', connectionEntry);

        // Listen for workspace changes
        this.toDispose.push(
            this.workspaceService.onWorkspaceChanged(() => {
                const newName = this.getWorkspaceName();
                this.statusBar.setElement('flexbe-project', {
                    ...projectEntry,
                    text: `$(folder) ${newName}`,
                });
            })
        );
    }

    protected getWorkspaceName(): string {
        const roots = this.workspaceService.tryGetRoots();
        if (roots.length > 0) {
            const uri = roots[0].resource;
            const segments = uri.path.toString().split('/');
            return segments[segments.length - 1] || 'Workspace';
        }
        return 'No Workspace';
    }

    protected monitorStatusBar(): void {
        // Periodically clean up any new technical status bar items
        const interval = setInterval(() => {
            this.cleanupStatusBar();
        }, 5000);

        this.toDispose.push(Disposable.create(() => clearInterval(interval)));
    }

    onStop(): void {
        this.toDispose.dispose();
    }
}

export function bindStatusBarSimplification(bind: import('@theia/core/shared/inversify').interfaces.Bind): void {
    bind(StatusBarSimplification).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(StatusBarSimplification);
}
