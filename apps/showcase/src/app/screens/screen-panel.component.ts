import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PORTICO_PROVIDER } from '../portico/provider';
import { PorticoProvider } from '../portico/contracts';

@Component({
  selector: 'app-screen-panel',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: `
    <div class="screen-panel">
      <h3>{{ title }}</h3>

      <p *ngIf="loading">Loading screen configuration and data...</p>
      <p class="error" *ngIf="error">{{ error }}</p>

      <p-table *ngIf="!loading && !error" [value]="rowData" [scrollable]="true" scrollHeight="flex">
        <ng-template pTemplate="header">
          <tr>
            <th *ngFor="let col of columns">{{ col.headerName }}</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row>
          <tr>
            <td *ngFor="let col of columns">{{ row[col.field] }}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `
      .screen-panel {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        height: 100%;
      }

      p-table {
        display: block;
        height: 100%;
      }

      .error {
        color: #ef5350;
      }
    `,
  ],
})
export class ScreenPanelComponent implements OnChanges {
  @Input() screenId = '';
  @Input() title = '';

  loading = false;
  error = '';
  columns: Array<{ field: string; headerName: string }> = [];
  rowData: Array<Record<string, unknown>> = [];

  constructor(@Inject(PORTICO_PROVIDER) private readonly provider: PorticoProvider) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screenId'] && this.screenId) {
      void this.loadScreen();
    }
  }

  private async loadScreen(): Promise<void> {
    this.loading = true;
    this.error = '';

    try {
      const screenConfig = await this.provider.getScreenConfig(this.screenId);
      const response = await this.provider.fetchData({ screenId: this.screenId });
      this.columns = screenConfig.grid.columns;
      this.rowData = response.rows;
      this.title = screenConfig.title || this.title;
    } catch {
      this.error = `Screen "${this.screenId}" is not configured in fixtures.`;
      this.columns = [];
      this.rowData = [];
    } finally {
      this.loading = false;
    }
  }
}
