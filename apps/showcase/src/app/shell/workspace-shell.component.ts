import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {
  DockviewComponent,
  DockviewApi,
  IDockviewPanelProps,
  IContentRenderer,
} from 'dockview-core';
import { TreeNode } from 'primeng/api';

// Simple content renderer for tabs
class DefaultPanelRenderer implements IContentRenderer {
  private _element: HTMLElement;

  constructor(private content: string) {
    this._element = document.createElement('div');
    this._element.innerHTML = content;
  }

  get element(): HTMLElement {
    return this._element;
  }

  init(params: IDockviewPanelProps): void {
    // Nothing to initialize
  }

  dispose(): void {
    this._element.remove();
  }
}

@Component({
  selector: 'app-workspace-shell',
  templateUrl: './workspace-shell.component.html',
  styleUrls: ['./workspace-shell.component.scss'],
  standalone: false,
})
export class WorkspaceShellComponent implements OnInit, OnDestroy, AfterViewInit {
  menuItems: TreeNode[] = [];
  searchText = '';
  sidebarCollapsed = false;
  isDarkMode = false;
  private dockviewApi?: DockviewApi;
  private dockviewComponent?: DockviewComponent;

  ngOnInit(): void {
    this.initializeMenu();
    this.loadThemePreference();
  }

  ngAfterViewInit(): void {
    this.initializeDockview();
  }

  ngOnDestroy(): void {
    if (this.dockviewComponent) {
      this.dockviewComponent.dispose();
    }
  }

  private initializeMenu(): void {
    // Load placeholder menu items matching examples/menu.json structure
    this.menuItems = [
      {
        label: 'Inventory',
        icon: 'pi pi-box',
        expanded: false,
        children: [
          {
            label: 'SKU Search',
            icon: 'pi pi-search',
            data: { screenId: 'sku-search' },
          },
          {
            label: 'Stock Levels',
            icon: 'pi pi-chart-bar',
            data: { screenId: 'stock-levels' },
          },
        ],
      },
      {
        label: 'Orders',
        icon: 'pi pi-shopping-cart',
        expanded: false,
        children: [
          {
            label: 'Order Search',
            icon: 'pi pi-search',
            data: { screenId: 'order-search' },
          },
          {
            label: 'Create Order',
            icon: 'pi pi-plus',
            data: { screenId: 'create-order' },
          },
        ],
      },
      {
        label: 'Shipping',
        icon: 'pi pi-truck',
        expanded: false,
        children: [
          {
            label: 'Shipment Tracking',
            icon: 'pi pi-map-marker',
            data: { screenId: 'shipment-tracking' },
          },
        ],
      },
      {
        label: 'Reports',
        icon: 'pi pi-file',
        expanded: false,
        children: [
          {
            label: 'Inventory Report',
            icon: 'pi pi-file-pdf',
            data: { screenId: 'inventory-report' },
          },
          {
            label: 'Sales Report',
            icon: 'pi pi-file-excel',
            data: { screenId: 'sales-report' },
          },
        ],
      },
    ];
  }

  private initializeDockview(): void {
    const container = document.getElementById('dockview-container');
    if (!container) {
      console.error('Dockview container not found');
      return;
    }

    try {
      this.dockviewComponent = new DockviewComponent(
        container,
        {
          createComponent: (options: any) => {
            return new DefaultPanelRenderer(options.content || '');
          },
        }
      );
      this.dockviewApi = this.dockviewComponent.api;

      // Add welcome tab
      this.addWelcomeTab();
    } catch (error) {
      console.error('Failed to initialize Dockview:', error);
    }
  }

  private addWelcomeTab(): void {
    if (!this.dockviewApi) return;

    try {
      this.dockviewApi.addPanel({
        id: 'welcome',
        component: 'default',
        title: 'Welcome',
        params: {
          content: `
            <div style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;">
              <h2 style="color: #4CAF50; margin-bottom: 16px;">Welcome to Portico</h2>
              <p style="color: #cccccc; line-height: 1.6;">
                Select an item from the left sidebar to open a screen.
              </p>
              <ul style="color: #cccccc; margin-top: 12px; line-height: 1.8;">
                <li>Use the search box to filter menu items</li>
                <li>Click on any menu item to open it in a new tab</li>
                <li>Tabs can be dragged, split, and rearranged</li>
              </ul>
            </div>
          `,
        },
      });
    } catch (error) {
      console.error('Failed to add welcome tab:', error);
    }
  }

  onNodeSelect(event: { node: TreeNode }): void {
    const node = event.node;
    if (!node.children && node.data) {
      this.openScreen(node.data.screenId, node.label || 'Untitled');
    }
  }

  private openScreen(screenId: string, title: string): void {
    if (!this.dockviewApi) return;

    try {
      // Check if tab already exists
      const existingPanel = this.dockviewApi.panels.find(
        (panel) => panel.id === screenId
      );

      if (existingPanel) {
        existingPanel.api.setActive();
        return;
      }

      // Create new tab
      this.dockviewApi.addPanel({
        id: screenId,
        component: 'default',
        title: title,
        params: {
          content: `
            <div style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;">
              <h3 style="color: #2196F3; margin-bottom: 16px;">${title}</h3>
              <p style="color: #cccccc;">Screen ID: <code style="background: #2d2d2d; padding: 2px 6px; border-radius: 3px;">${screenId}</code></p>
              <p style="color: #888; margin-top: 12px; font-style: italic;">
                Screen content will be rendered here based on the canonical contract.
              </p>
            </div>
          `,
        },
      });

      // Activate the newly created panel
      const newPanel = this.dockviewApi.panels.find(
        (panel) => panel.id === screenId
      );
      if (newPanel) {
        newPanel.api.setActive();
      }
    } catch (error) {
      console.error('Failed to open screen:', error);
    }
  }

  onSearch(): void {
    // Simple client-side search filter
    if (!this.searchText.trim()) {
      this.initializeMenu(); // Reset to full menu
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    const filtered = this.filterMenuItems(this.menuItems, searchLower);
    this.menuItems = filtered;
  }

  private filterMenuItems(items: TreeNode[], search: string): TreeNode[] {
    const result: TreeNode[] = [];

    for (const item of items) {
      const labelMatch = item.label?.toLowerCase().includes(search);
      const hasMatchingChildren = item.children && item.children.length > 0;

      if (labelMatch || hasMatchingChildren) {
        const newItem = { ...item };

        if (item.children) {
          const filteredChildren = this.filterMenuItems(item.children, search);
          if (filteredChildren.length > 0) {
            newItem.children = filteredChildren;
            newItem.expanded = true; // Auto-expand parent with matching children
            result.push(newItem);
          } else if (labelMatch) {
            result.push(newItem);
          }
        } else if (labelMatch) {
          result.push(newItem);
        }
      }
    }

    return result;
  }

  clearSearch(): void {
    this.searchText = '';
    this.initializeMenu();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveThemePreference();
  }

  private loadThemePreference(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  private saveThemePreference(): void {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme(): void {
    const element = document.documentElement;
    if (this.isDarkMode) {
      element.classList.add('app-dark');
    } else {
      element.classList.remove('app-dark');
    }
  }
}
