export interface MenuNode {
  id: string;
  label: string;
  icon?: string;
  screenId?: string;
  children?: MenuNode[];
}

export interface MenuStructure {
  items: MenuNode[];
}

export interface ScreenConfig {
  id: string;
  title: string;
  kind: 'canonical';
  grid: {
    columns: Array<{ field: string; headerName: string; sortable?: boolean; filter?: boolean }>;
  };
}

export interface DataRequest {
  screenId: string;
  params?: Record<string, unknown>;
}

export interface DataResponse {
  rows: Array<Record<string, unknown>>;
  meta?: Record<string, unknown>;
}

export interface MenuProvider {
  getMenuStructure(): Promise<MenuStructure>;
}

export interface ScreenRegistryProvider {
  getScreenConfig(screenId: string): Promise<ScreenConfig>;
}

export interface DataProvider {
  fetchData(request: DataRequest): Promise<DataResponse>;
}

export interface PorticoProvider
  extends MenuProvider,
    ScreenRegistryProvider,
    DataProvider {}
