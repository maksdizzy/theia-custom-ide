import * as React from 'react';
import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core/lib/common/message-service';
import { CommandService } from '@theia/core/lib/common/command';

import './style/integrations.less';

export const INTEGRATIONS_WIDGET_ID = 'flexbe-integrations';

interface Integration {
    id: string;
    name: string;
    icon: string;
    connected: boolean;
    category: string;
    description?: string;
}

interface Category {
    id: string;
    name: string;
    icon: string;
    integrations: Integration[];
}

// Mock data - will be replaced by Composio plugin data
const MOCK_CONNECTED: Integration[] = [
    { id: 'google-calendar', name: 'Google Calendar', icon: 'calendar', connected: true, category: 'productivity', description: 'Sync calendar events' },
    { id: 'google-sheets', name: 'Google Sheets', icon: 'table', connected: true, category: 'productivity', description: 'Access spreadsheets' },
    { id: 'slack', name: 'Slack', icon: 'comment-discussion', connected: true, category: 'communication', description: 'Team messaging' },
];

const MOCK_CATEGORIES: Category[] = [
    {
        id: 'ai-ml',
        name: 'AI & Machine Learning',
        icon: 'hubot',
        integrations: [
            { id: 'openai', name: 'OpenAI', icon: 'sparkle', connected: false, category: 'ai-ml', description: 'GPT models integration' },
            { id: 'anthropic', name: 'Anthropic', icon: 'heart', connected: false, category: 'ai-ml', description: 'Claude AI assistant' },
            { id: 'huggingface', name: 'Hugging Face', icon: 'smiley', connected: false, category: 'ai-ml', description: 'ML models hub' },
        ],
    },
    {
        id: 'crm',
        name: 'CRM',
        icon: 'organization',
        integrations: [
            { id: 'salesforce', name: 'Salesforce', icon: 'cloud', connected: false, category: 'crm', description: 'Sales cloud platform' },
            { id: 'hubspot', name: 'HubSpot', icon: 'megaphone', connected: false, category: 'crm', description: 'Marketing & CRM' },
            { id: 'pipedrive', name: 'Pipedrive', icon: 'graph', connected: false, category: 'crm', description: 'Sales pipeline' },
        ],
    },
    {
        id: 'communication',
        name: 'Communication',
        icon: 'mail',
        integrations: [
            { id: 'discord', name: 'Discord', icon: 'comment', connected: false, category: 'communication', description: 'Community chat' },
            { id: 'teams', name: 'Microsoft Teams', icon: 'organization', connected: false, category: 'communication', description: 'Team collaboration' },
            { id: 'gmail', name: 'Gmail', icon: 'mail', connected: false, category: 'communication', description: 'Email integration' },
        ],
    },
    {
        id: 'productivity',
        name: 'Productivity',
        icon: 'checklist',
        integrations: [
            { id: 'notion', name: 'Notion', icon: 'note', connected: false, category: 'productivity', description: 'Notes & docs' },
            { id: 'trello', name: 'Trello', icon: 'project', connected: false, category: 'productivity', description: 'Task boards' },
            { id: 'airtable', name: 'Airtable', icon: 'database', connected: false, category: 'productivity', description: 'Database platform' },
        ],
    },
];

interface IntegrationsState {
    connectedIntegrations: Integration[];
    categories: Category[];
    expandedCategories: Set<string>;
    searchQuery: string;
}

@injectable()
export class IntegrationsWidget extends ReactWidget {
    static readonly ID = INTEGRATIONS_WIDGET_ID;
    static readonly LABEL = 'Integrations';

    @inject(MessageService)
    protected readonly messageService: MessageService;

    @inject(CommandService)
    protected readonly commandService: CommandService;

    protected state: IntegrationsState = {
        connectedIntegrations: MOCK_CONNECTED,
        categories: MOCK_CATEGORIES,
        expandedCategories: new Set(),
        searchQuery: '',
    };

    @postConstruct()
    protected init(): void {
        this.id = IntegrationsWidget.ID;
        this.title.label = IntegrationsWidget.LABEL;
        this.title.caption = IntegrationsWidget.LABEL;
        this.title.closable = false;
        this.title.iconClass = 'codicon codicon-plug';
        this.addClass('flexbe-integrations-panel');
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div className="integrations-container">
                {this.renderSearch()}
                {this.renderConnectedSection()}
                {this.renderAvailableSection()}
            </div>
        );
    }

    protected renderSearch(): React.ReactNode {
        return (
            <div className="integrations-search">
                <i className="codicon codicon-search" />
                <input
                    type="text"
                    placeholder="Search integrations..."
                    value={this.state.searchQuery}
                    onChange={(e) => this.handleSearchChange(e.target.value)}
                />
            </div>
        );
    }

    protected renderConnectedSection(): React.ReactNode {
        const { connectedIntegrations, searchQuery } = this.state;

        const filtered = connectedIntegrations.filter(int =>
            int.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filtered.length === 0 && searchQuery) {
            return null;
        }

        return (
            <div className="integrations-section">
                <div className="integrations-section-header">
                    <h3 className="integrations-section-title">
                        <i className="codicon codicon-pass-filled status-connected" />
                        Connected
                    </h3>
                    <span className="integrations-count">{filtered.length}</span>
                </div>
                <div className="integrations-list">
                    {filtered.map(integration => this.renderIntegrationItem(integration, true))}
                </div>
            </div>
        );
    }

    protected renderAvailableSection(): React.ReactNode {
        const { categories, searchQuery, expandedCategories } = this.state;

        return (
            <div className="integrations-section">
                <div className="integrations-section-header">
                    <h3 className="integrations-section-title">
                        <i className="codicon codicon-extensions" />
                        Available
                    </h3>
                </div>
                {categories.map(category => {
                    const filtered = category.integrations.filter(int =>
                        int.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (filtered.length === 0) {
                        return null;
                    }

                    const isExpanded = expandedCategories.has(category.id);

                    return (
                        <div key={category.id} className="integrations-category">
                            <div
                                className="category-header"
                                onClick={() => this.toggleCategory(category.id)}
                            >
                                <i className={`codicon codicon-chevron-${isExpanded ? 'down' : 'right'} category-chevron`} />
                                <i className={`codicon codicon-${category.icon} category-icon`} />
                                <span className="category-name">{category.name}</span>
                                <span className="category-count">{filtered.length}</span>
                            </div>
                            {isExpanded && (
                                <div className="category-integrations">
                                    {filtered.map(integration => this.renderIntegrationItem(integration, false))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    protected renderIntegrationItem(integration: Integration, isConnected: boolean): React.ReactNode {
        return (
            <div
                key={integration.id}
                className={`integration-item ${isConnected ? 'connected' : 'available'}`}
            >
                <div className="integration-icon">
                    <i className={`codicon codicon-${integration.icon}`} />
                </div>
                <div className="integration-info">
                    <span className="integration-name">{integration.name}</span>
                    {integration.description && (
                        <span className="integration-description">{integration.description}</span>
                    )}
                </div>
                {isConnected ? (
                    <div className="integration-status">
                        <span className="status-indicator connected" title="Connected" />
                        <button
                            className="integration-action disconnect"
                            onClick={() => this.handleDisconnect(integration)}
                            title="Disconnect"
                        >
                            <i className="codicon codicon-debug-disconnect" />
                        </button>
                    </div>
                ) : (
                    <button
                        className="integration-action connect"
                        onClick={() => this.handleConnect(integration)}
                    >
                        Connect
                    </button>
                )}
            </div>
        );
    }

    protected handleSearchChange(query: string): void {
        this.state = { ...this.state, searchQuery: query };
        this.update();
    }

    protected toggleCategory(categoryId: string): void {
        const { expandedCategories } = this.state;
        const newExpanded = new Set(expandedCategories);

        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }

        this.state = { ...this.state, expandedCategories: newExpanded };
        this.update();
    }

    protected async handleConnect(integration: Integration): Promise<void> {
        // TODO: Integrate with Composio plugin
        this.messageService.info(`Connecting to ${integration.name}...`);

        // Mock connection - in production, call Composio API
        setTimeout(() => {
            const connected = { ...integration, connected: true };
            this.state = {
                ...this.state,
                connectedIntegrations: [...this.state.connectedIntegrations, connected],
            };
            this.update();
            this.messageService.info(`Connected to ${integration.name}`);
        }, 1000);
    }

    protected async handleDisconnect(integration: Integration): Promise<void> {
        this.messageService.info(`Disconnecting from ${integration.name}...`);

        // Mock disconnection
        this.state = {
            ...this.state,
            connectedIntegrations: this.state.connectedIntegrations.filter(
                int => int.id !== integration.id
            ),
        };
        this.update();
        this.messageService.info(`Disconnected from ${integration.name}`);
    }
}
