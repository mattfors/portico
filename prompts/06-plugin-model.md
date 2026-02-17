# Plugin Model

## Architecture

Portico is **library-first**: the runtime engine is a reusable Angular library. Applications embed it by providing a **plugin adapter** that implements provider interfaces.

```
┌─────────────────────────────────────────┐
│  Host Application (e.g., showcase)     │
│  - Configures runtime                  │
│  - Provides adapter implementation     │
└────────────────┬────────────────────────┘
                 │
        implements Provider interfaces
                 │
                 ↓
┌─────────────────────────────────────────┐
│  Adapter / Plugin Layer                 │
│  - Implements DataProvider              │
│  - Implements MenuProvider              │
│  - Implements ScreenRegistryProvider    │
│  - Implements ActionProvider            │
└────────────────┬────────────────────────┘
                 │
        returns canonical responses
                 │
                 ↓
┌─────────────────────────────────────────┐
│  Portico Runtime (library)              │
│  - workspace-shell                      │
│  - screen-renderer                      │
│  - rules-engine                         │
│  - persistence                          │
└─────────────────────────────────────────┘
```

## Library vs Host Application

### The Library (`libs/`)

**Contains:**
- Shell components (sidebar, workspace, tabs)
- Screen renderers (canonical, federated)
- Provider interfaces (abstract contracts)
- Rules engine (JSONata evaluator)
- Persistence layer (RxDB wrapper)
- Shared utilities

**Does NOT contain:**
- Domain-specific logic (inventory, orders, etc.)
- External API calls
- Authentication
- Fixture data
- Screen configurations

**Exports:**
- `WorkspaceShellModule` - Main entry point
- Provider interfaces - For implementing adapters
- Contracts - TypeScript types for configs

### The Host Application (`apps/showcase/`)

**Contains:**
- Application bootstrap (`main.ts`)
- Shell host component
- Adapter implementations
- Fixture JSON files
- Application routing (if needed)
- Environment configuration

**Responsibilities:**
- Provide adapter to runtime via DI
- Configure theme, branding
- Define application-level routes (optional)

## Provider Interfaces

Adapters implement these interfaces to integrate with the runtime.

### MenuProvider

```typescript
export interface MenuProvider {
  /**
   * Returns the hierarchical menu structure.
   * Called once on app initialization.
   */
  getMenuStructure(): Promise<MenuStructure>;
  
  /**
   * Optional: search menu items by query.
   */
  searchMenu?(query: string): Promise<MenuNode[]>;
}
```

### ScreenRegistryProvider

```typescript
export interface ScreenRegistryProvider {
  /**
   * Resolves a screenId to its configuration.
   * Called when a screen is opened.
   */
  getScreenConfig(screenId: string): Promise<ScreenConfig>;
  
  /**
   * Optional: list all available screens.
   */
  listScreens?(): Promise<ScreenConfig[]>;
}
```

### DataProvider

```typescript
export interface DataProvider {
  /**
   * Fetches data for a screen based on parameters and grid state.
   * Called when form submits or grid requests data.
   */
  fetchData(request: DataRequest): Promise<DataResponse>;
}
```

### ActionProvider

```typescript
export interface ActionProvider {
  /**
   * Executes an action (create, update, delete, etc.).
   * Called when user triggers an action button.
   */
  executeAction(request: ActionRequest): Promise<ActionResponse>;
}
```

### Unified Provider

Adapters can implement a single interface:

```typescript
export interface PorticoProvider extends 
  MenuProvider,
  ScreenRegistryProvider,
  DataProvider,
  ActionProvider {}
```

## Showcase Adapter (Fixture-Based)

The showcase uses a **fixture adapter** that simulates a real backend by returning JSON from static files.

### Implementation Pattern

```typescript
// apps/showcase/src/app/providers/fixture-adapter.ts

@Injectable()
export class FixtureAdapter implements PorticoProvider {
  
  async getMenuStructure(): Promise<MenuStructure> {
    return this.loadFixture<MenuStructure>('menu.json');
  }
  
  async getScreenConfig(screenId: string): Promise<ScreenConfig> {
    return this.loadFixture<ScreenConfig>(`screens/${screenId}.json`);
  }
  
  async fetchData(request: DataRequest): Promise<DataResponse> {
    // Simulate API call delay
    await this.delay(300);
    
    // Load fixture for this screen
    const raw = await this.loadFixture(`data/${request.screenId}.json`);
    
    // Option 1: Fixture already in canonical format
    if (this.isCanonical(raw)) {
      return raw as DataResponse;
    }
    
    // Option 2: Fixture in external format, apply mapping
    const mapping = await this.loadFixture(`mappings/${request.screenId}.jsonata`);
    return this.mapper.transform(raw, mapping);
  }
  
  async executeAction(request: ActionRequest): Promise<ActionResponse> {
    await this.delay(500);
    
    // Simulate success
    return {
      success: true,
      message: `Action "${request.actionId}" completed successfully`,
      refreshHint: { requeryScreen: true }
    };
  }
  
  private async loadFixture<T>(path: string): Promise<T> {
    const response = await fetch(`/assets/fixtures/${path}`);
    return response.json();
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Fixture Organization

```
apps/showcase/src/assets/fixtures/
├── menu.json
├── screens/
│   ├── inventory-search.json
│   ├── order-search.json
│   └── item-details.json
├── data/
│   ├── inventory-search-canonical.json   # Already in { rows, meta }
│   ├── order-search-external.json        # External API format
│   └── item-details-canonical.json
└── mappings/
    └── order-search.jsonata              # Maps external → canonical
```

See [`examples/`](../examples/) directory for sample fixture files.

## Production Adapter (HTTP-Based)

In production, swap the fixture adapter for an HTTP adapter:

```typescript
@Injectable()
export class HttpAdapter implements PorticoProvider {
  constructor(
    private http: HttpClient,
    private mapper: MappingService,
    private auth: AuthService
  ) {}
  
  async getMenuStructure(): Promise<MenuStructure> {
    return this.http.get<MenuStructure>('/api/menu').toPromise();
  }
  
  async getScreenConfig(screenId: string): Promise<ScreenConfig> {
    return this.http.get<ScreenConfig>(`/api/screens/${screenId}`).toPromise();
  }
  
  async fetchData(request: DataRequest): Promise<DataResponse> {
    const headers = this.auth.getAuthHeaders();
    
    const response = await this.http.post<any>(
      '/api/data',
      request,
      { headers }
    ).toPromise();
    
    // Apply mapping if needed
    const mappingId = this.getMappingId(request.screenId);
    if (mappingId) {
      return this.mapper.applyMapping(response, mappingId);
    }
    
    return response;
  }
  
  async executeAction(request: ActionRequest): Promise<ActionResponse> {
    const headers = this.auth.getAuthHeaders();
    
    return this.http.post<ActionResponse>(
      '/api/actions',
      request,
      { headers }
    ).toPromise();
  }
}
```

## Adapter Configuration

Host application provides the adapter via dependency injection:

```typescript
// apps/showcase/src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { FixtureAdapter } from './app/providers/fixture-adapter';
import { PORTICO_PROVIDER } from '@portico/runtime-core';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: PORTICO_PROVIDER,
      useClass: FixtureAdapter
    }
  ]
});
```

Or in a module:

```typescript
// app.module.ts
@NgModule({
  providers: [
    {
      provide: PORTICO_PROVIDER,
      useClass: environment.production ? HttpAdapter : FixtureAdapter
    }
  ]
})
export class AppModule {}
```

## Adapter Requirements

### Must Implement

- All provider interfaces (or unified `PorticoProvider`)
- Return types matching canonical contracts
- Error handling (throw errors, runtime displays)

### Should Implement

- Request caching (avoid duplicate calls)
- Loading states (return observables, not promises)
- Retry logic (for network failures)
- Request cancellation (when tab closes)

### May Implement

- Mapping delegation (use `MappingService` from library)
- Authentication (inject auth service)
- Logging/telemetry
- Request batching/debouncing

## Showcase Requirements

The showcase demonstrates:

1. **Realistic operational UI** - Looks like a production WMS/ERP
2. **Representative workflows:**
   - Search form → grid results
   - Drilldown: inventory item → detail screen
   - Action with prompt: adjust quantity
   - Multi-tab workspace with persistence
3. **No custom screen code** - All screens from JSON config
4. **JSON fixtures** - No backend required to run showcase
5. **Mapping example** - At least one screen uses external format + JSONata

### Data Domains (Non-Proprietary)

Example domains for showcase:

- **Inventory** - Items, locations, quantities
- **Orders** - Order search, details, fulfillment
- **Shipping** - Shipments, carriers, tracking
- **Reports** - Generic operational reports

Avoid proprietary or customer-specific terminology.

## Swapping Adapters

The goal: swapping fixture adapter for HTTP adapter should require:

- **Zero changes to library code**
- **Zero changes to screen configurations**
- **One change: provider class in DI**

```diff
  providers: [
    {
      provide: PORTICO_PROVIDER,
-     useClass: FixtureAdapter
+     useClass: HttpAdapter
    }
  ]
```

Mappings may need adjustment (external API structure), but screen configs remain unchanged.

## Testing Adapters

Each adapter should be testable in isolation:

```typescript
describe('FixtureAdapter', () => {
  let adapter: FixtureAdapter;
  
  beforeEach(() => {
    adapter = new FixtureAdapter(/* deps */);
  });
  
  it('should return menu structure', async () => {
    const menu = await adapter.getMenuStructure();
    expect(menu.nodes).toBeDefined();
    expect(menu.nodes.length).toBeGreaterThan(0);
  });
  
  it('should return canonical data response', async () => {
    const response = await adapter.fetchData({
      screenId: 'inventory-search',
      parameters: { sku: 'ABC*' }
    });
    expect(response.rows).toBeDefined();
    expect(response.meta).toBeDefined();
  });
});
```

## Outcome

The result:

- **Reusable library** - Any Angular app can embed by providing an adapter
- **Showcase demonstrates** - End-to-end workflows with zero backend
- **Clear boundaries** - Runtime vs integration concerns separated
- **Easy migration** - Fixture → HTTP swap is trivial
