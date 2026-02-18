import {
  ApplicationRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  AfterViewInit,
  EnvironmentInjector,
} from '@angular/core';
import { DockviewApi, DockviewComponent } from 'dockview-core';
import { TreeNode } from 'primeng/api';
import { PORTICO_PROVIDER } from '../portico/provider';
import { PorticoProvider } from '../portico/contracts';
import { ScreenPanelComponent } from '../screens/screen-panel.component';
import { AngularPanelRenderer } from './angular-panel-renderer';

@Component({
  selector: 'app-workspace-shell',
  templateUrl: './workspace-shell.component.html',
  styleUrls: ['./workspace-shell.component.scss'],
  standalone: false,
})
export class WorkspaceShellComponent implements OnInit, OnDestroy, AfterViewInit {
  menuItems: TreeNode[] = [];
  private allMenuItems: TreeNode[] = [];
  searchText = '';
  sidebarCollapsed = false;

  private dockviewApi?: DockviewApi;
  private dockviewComponent?: DockviewComponent;

  constructor(
    @Inject(PORTICO_PROVIDER) private readonly provider: PorticoProvider,
    private readonly environmentInjector: EnvironmentInjector,
    private readonly appRef: ApplicationRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initializeMenu();
  }

  ngAfterViewInit(): void {
    this.initializeDockview();
  }

  ngOnDestroy(): void {
    this.dockviewComponent?.dispose();
  }

  private async initializeMenu(): Promise<void> {
    const structure = await this.provider.getMenuStructure();
    this.allMenuItems = this.mapToTreeNodes(structure.items);
    this.menuItems = this.cloneTreeNodes(this.allMenuItems);
  }

  private mapToTreeNodes(items: Array<Record<string, unknown>>): TreeNode[] {
    return items.map((item) => {
      const children = Array.isArray(item['children'])
        ? this.mapToTreeNodes(item['children'] as Array<Record<string, unknown>>)
        : undefined;

      return {
        key: String(item['id']),
        label: String(item['label']),
        icon: typeof item['icon'] === 'string' ? item['icon'] : undefined,
        expanded: true,
        data: item['screenId'] ? { screenId: String(item['screenId']) } : undefined,
        children,
      } as TreeNode;
    });
  }

  private cloneTreeNodes(items: TreeNode[]): TreeNode[] {
    return items.map((item) => ({
      ...item,
      children: item.children ? this.cloneTreeNodes(item.children) : undefined,
    }));
  }

  private initializeDockview(): void {
    const container = document.getElementById('dockview-container');
    if (!container) {
      return;
    }

    this.dockviewComponent = new DockviewComponent(container, {
      createComponent: (options: { params?: { screenId?: string; title?: string } }) => {
        return new AngularPanelRenderer(
          ScreenPanelComponent,
          this.environmentInjector,
          this.appRef,
          {
            screenId: options.params?.screenId ?? '',
            title: options.params?.title ?? '',
          }
        );
      },
    });

    this.dockviewApi = this.dockviewComponent.api;
  }

  onNodeSelect(event: { node: TreeNode }): void {
    const node = event.node;
    const screenId = node.data?.['screenId'];

    if (!node.children?.length && typeof screenId === 'string') {
      this.openScreen(screenId, node.label || 'Untitled');
    }
  }

  private openScreen(screenId: string, title: string): void {
    if (!this.dockviewApi) {
      return;
    }

    const existingPanel = this.dockviewApi.panels.find((panel) => panel.id === screenId);
    if (existingPanel) {
      existingPanel.api.setActive();
      return;
    }

    this.dockviewApi.addPanel({
      id: screenId,
      component: 'screen',
      title,
      params: { screenId, title },
    });
  }

  onSearch(): void {
    if (!this.searchText.trim()) {
      this.menuItems = this.cloneTreeNodes(this.allMenuItems);
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.menuItems = this.filterMenuItems(this.allMenuItems, searchLower);
  }

  private filterMenuItems(items: TreeNode[], search: string): TreeNode[] {
    const result: TreeNode[] = [];

    for (const item of items) {
      const labelMatch = item.label?.toLowerCase().includes(search);
      const filteredChildren = item.children
        ? this.filterMenuItems(item.children, search)
        : undefined;
      const hasMatchingChildren = Boolean(filteredChildren && filteredChildren.length > 0);

      if (labelMatch || hasMatchingChildren) {
        result.push({
          ...item,
          children: filteredChildren,
          expanded: hasMatchingChildren,
        });
      }
    }

    return result;
  }

  clearSearch(): void {
    this.searchText = '';
    this.menuItems = this.cloneTreeNodes(this.allMenuItems);
  }
}
