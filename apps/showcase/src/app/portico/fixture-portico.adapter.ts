import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  DataRequest,
  DataResponse,
  MenuStructure,
  PorticoProvider,
  ScreenConfig,
} from './contracts';

export class FixturePorticoAdapter implements PorticoProvider {
  constructor(
    private readonly http: HttpClient,
    private readonly baseUrl = '/fixtures'
  ) {}

  async getMenuStructure(): Promise<MenuStructure> {
    return this.loadFixture<MenuStructure>('menu.json');
  }

  async getScreenConfig(screenId: string): Promise<ScreenConfig> {
    return this.loadFixture<ScreenConfig>(`screens/${screenId}.json`);
  }

  async fetchData(request: DataRequest): Promise<DataResponse> {
    return this.loadFixture<DataResponse>(`data/${request.screenId}.json`);
  }

  private async loadFixture<T>(path: string): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${this.baseUrl}/${path}`));
  }
}
