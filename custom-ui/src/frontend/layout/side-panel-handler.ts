import '@/frontend/style/side-panel.less';

import { Panel, SidePanel, SidePanelHandler as TheiaSidePanelHandler, type SideTabBar } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';

/**
 * Custom side panel handler with toggle behavior for right panel only.
 * Left panel keeps standard Theia behavior (horizontal tabs, no toggle).
 * Right panel gets vertical icon bar with click-to-toggle functionality.
 */
@injectable()
export class SidePanelHandler extends TheiaSidePanelHandler {
    protected override createSideBar(): SideTabBar {
        const sideBar = super.createSideBar();

        // Don't allow to move icons
        sideBar.tabsMovable = false;

        return sideBar;
    }

    protected override createContainer(): Panel {
        const container = super.createContainer();

        // Only add toggle behavior for RIGHT panel (AI agents)
        if (this.side === 'right') {
            container.addClass('theia-custom-icon-bar');
            this.setupToggleBehavior();
        }

        return container;
    }

    /**
     * Setup click-to-toggle behavior for right panel.
     * Uses state guards and proper event sequencing to prevent flickering.
     */
    private setupToggleBehavior(): void {
        // Флаг для предотвращения реентрантных вызовов во время переходов
        let isToggling = false;

        this.tabBar.node.addEventListener('click', (event) => {
            const tab = (event.target as HTMLElement).closest('.lm-TabBar-tab');
            if (!tab) return;

            // КРИТИЧНО: Остановить распространение ДО любых изменений состояния
            event.stopPropagation();
            event.preventDefault();

            const index = Array.from(this.tabBar.node.querySelectorAll('.lm-TabBar-tab')).indexOf(tab);
            const title = this.tabBar.titles[index];

            if (!title) return;

            // Переключать только при клике на активную вкладку
            if (title === this.tabBar.currentTitle) {
                // ЗАЩИТА СОСТОЯНИЯ: Не переключать во время анимаций expand/collapse
                if (isToggling ||
                    this.state.expansion === SidePanel.ExpansionState.expanding ||
                    this.state.expansion === SidePanel.ExpansionState.collapsing) {
                    return;
                }

                isToggling = true;

                if (this.state.expansion === SidePanel.ExpansionState.expanded) {
                    // Свернуть панель
                    super.collapse().then(() => {
                        isToggling = false;
                    });
                } else {
                    // Развернуть панель - отложить, чтобы избежать гонки с обработчиками Theia
                    // Используем requestAnimationFrame для завершения текущего цикла событий
                    requestAnimationFrame(() => {
                        this.expand(title.owner.id);
                        // Сбросить флаг после стабилизации layout
                        requestAnimationFrame(() => {
                            isToggling = false;
                        });
                    });
                }
            }
            // Иначе: клик на неактивную вкладку - базовый класс обрабатывает активацию
        }, { capture: true }); // Фаза CAPTURE для перехвата до обработчиков Lumino
    }

    /**
     * Override collapse to ensure clean state transitions
     */
    override async collapse(): Promise<void> {
        // Убедиться, что состояние позволяет сворачивание
        if (this.state.expansion === SidePanel.ExpansionState.collapsed ||
            this.state.expansion === SidePanel.ExpansionState.collapsing) {
            return;
        }

        // Вызвать родительский collapse с await для гарантии завершения
        await super.collapse();
    }

    /**
     * Override refresh for right panel to minimize layout thrashing
     */
    override refresh(): void {
        // Для правой панели группируем DOM обновления для предотвращения множественных reflow
        if (this.side === 'right') {
            requestAnimationFrame(() => {
                super.refresh();
            });
        } else {
            super.refresh();
        }
    }
}
