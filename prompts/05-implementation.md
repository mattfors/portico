# Implementation Guide

## Technology Stack

### Framework

**Angular** (v17+)
- TypeScript strict mode
- Standalone components (preferred)
- Signals for reactive state
- Dependency injection for providers

### UI Library

**PrimeNG** (v17+)
- Tree component (left sidebar menu)
- Input components (forms)
- Dialog/Modal (action prompts)
- Toast (notifications)
- Panel/Toolbar (layout)

### Workspace Layout

**Dockview** (dockview.dev)
- Tabbed workspace implementation
- Panel splitting
- Drag-and-drop tab management
- Layout serialization for persistence

### Form Rendering

**Angular Formly** (v6+)
- Configuration-driven forms
- Custom field types (constrained set)
- Validation integration
- Dynamic field visibility

### Grid Rendering

**AG Grid** (Community v31+)
- Column configuration
- Client and server-side data models
- Row selection
- Sorting, filtering, pagination

### State Persistence

**RxDB** (v15+)
- Local-first database
- Observable queries
- Schema-based collections
- IndexedDB adapter

### Data Mapping

**JSONata** (v2+)
- Declarative transformations
- No side effects
- Evaluates expressions safely

### Development Tools

**Nx** (v18+)
- Monorepo management
- Build caching
- Library generation
- Testing infrastructure

## Constrained Capabilities

To maintain consistency, only a subset of each library's features is exposed to configuration.

### Forms: Angular Formly

#### ✅ Allowed

**Field Types:**
- `input` - text input
- `number` - numeric input with step
- `date` - date picker
- `datetime` - date + time picker
- `dropdown` - single select
- `multiselect` - multiple select
- `checkbox` - boolean toggle
- `radio` - radio button group
- `textarea` - multi-line text

**Validation:**
- `required`
- `min` / `max` (numbers, dates)
- `minLength` / `maxLength` (strings)
- `pattern` (regex)
- `email`
- `custom` (JSONata expression)

**Layout:**
- `horizontal` - labels left, inputs right
- `vertical` - labels above inputs
- `grid` - responsive grid (2-4 columns)

**Conditional Visibility:**
- Fields can be hidden based on JSONata expressions
- Example: Show "reason" field only when "status" = "rejected"

#### ❌ Not Allowed

- Custom field templates with Angular code
- Event handlers beyond standard change detection
- Dynamic field injection at runtime
- Nested groups/arrays (not in v1)
- File upload fields
- Rich text editors
- Custom validators with executable code

### Grids: AG Grid

#### ✅ Allowed

**Column Features:**
- Basic types: text, number, date, boolean, currency
- Custom width
- Sorting (single/multi-column)
- Text/number/date filtering
- Column visibility toggle
- Auto-size columns

**Data:**
- Client-side row data (all in memory, <10k rows)
- Server-side row model (paginated, any size)
- Row selection (single/multiple)

**Formatting:**
- Date formats (via format string)
- Number formats (decimals, thousand separators)
- Currency formats (symbol, precision)
- Conditional cell styles (via rules)

**Interaction:**
- Double-click row → drilldown
- Row selection → enable actions
- Column resize/reorder
- Export to CSV (built-in)

#### ❌ Not Allowed

- Custom cell renderers (no Angular components in cells)
- Inline cell editing (not in v1)
- Row grouping/aggregation
- Master-detail expansion
- Tree data
- Pivot mode
- Custom context menus
- Cell expressions or formulas in config

### Canonical Screen Behavior

Each canonical screen tab manages three UI states:

#### Form States

**Expanded (Initial)**
- Form fields visible and editable
- Grid hidden or empty
- Occurs on: tab open, after [Reset], manual expansion via [Modify]

**Collapsed (Results)**
- Single-line parameter summary: "▶ SKU: ABC*, Location: Warehouse A [Modify]"
- Grid visible with results
- Actions enabled based on selection
- Occurs on: successful form submit

**Transition Logic**
```typescript
onSubmit(values) {
  this.collapseForm();  // Hide fields, show summary
  this.fetchData(values).then(response => {
    this.showGrid(response.rows);
  });
}

onModify() {
  this.expandForm();  // Show fields, keep grid visible (scroll)
}
```

#### State Persistence

When restoring workspace:
- Save form state (expanded/collapsed)
- Save parameter values
- Save grid state (no data, just configuration)
- Option to auto-requery on restore or show stale results

### Rules: JSONata

#### ✅ Allowed

**Row Styling:**
```jsonata
status = 'critical' ? { backgroundColor: '#fee', color: '#c00' }
```

**Action Enablement:**
```jsonata
$count(selectedRows) > 0 and $all(selectedRows, function($v) { $v.status = 'pending' })
```

**Field Visibility:**
```jsonata
parameters.orderType = 'return'
```

#### ❌ Not Allowed

- Side effects (HTTP calls, mutations)
- Arbitrary function imports
- Access to browser APIs
- Long-running computations (timeout: 100ms)

### Persistence: RxDB

#### ✅ Persisted

**Workspace State:**
- Open tabs (screenId, parameters, position)
- Active tab selection
- Panel layout (Dockview serialization)
- Sidebar collapsed state

**Screen State:**
- Form values (last submitted parameters)
- Grid column widths/order
- Grid sort/filter state
- Pinned tabs

**User Preferences:**
- Theme (light/dark)
- Default page size
- Timestamp format preference

#### ❌ Not Persisted

- Operational data (query results)
- Authentication tokens (use secure storage)
- Screen configurations (from registry)
- Provider responses (always fresh)

## Project Structure

Nx workspace with library-first approach:

```
portico/
├── apps/
│   └── showcase/                # Demo application
│       ├── src/
│       │   ├── main.ts
│       │   ├── app/
│       │   │   ├── app.component.ts  # Shell host
│       │   │   └── providers/
│       │   │       └── fixture-adapter.ts  # JSON-backed provider
│       │   └── assets/
│       │       └── fixtures/      # JSON fixture files
│       └── project.json
│
├── libs/
│   ├── runtime-core/            # Core abstractions
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── contracts/   # TypeScript interfaces
│   │   │   │   ├── providers/   # Provider abstractions
│   │   │   │   └── utils/       # Shared utilities
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── workspace-shell/         # Shell + navigation
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── shell.component.ts
│   │   │   │   ├── sidebar/
│   │   │   │   │   ├── menu.component.ts
│   │   │   │   │   └── search.component.ts
│   │   │   │   ├── workspace/
│   │   │   │   │   └── dockview-host.component.ts
│   │   │   │   └── services/
│   │   │   │       ├── tab-manager.service.ts
│   │   │   │       └── navigation.service.ts
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── screen-renderer/         # Canonical screen rendering
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── canonical-screen.component.ts
│   │   │   │   ├── form-renderer/
│   │   │   │   │   └── formly-renderer.component.ts
│   │   │   │   ├── grid-renderer/
│   │   │   │   │   └── aggrid-renderer.component.ts
│   │   │   │   └── action-bar/
│   │   │   │       └── actions.component.ts
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── federation/              # External view embedding
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── federated-screen.component.ts
│   │   │   │   └── iframe-manager.service.ts
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── rules-engine/            # Conditional logic
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── rule-evaluator.ts
│   │   │   │   └── jsonata-engine.ts
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   ├── persistence/             # State management
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── workspace-store.ts
│   │   │   │   ├── screen-store.ts
│   │   │   │   └── rxdb-adapter.ts
│   │   │   └── index.ts
│   │   └── project.json
│   │
│   └── mapping/                 # Data transformation
│       ├── src/
│       │   ├── lib/
│       │   │   ├── mapper.service.ts
│       │   │   └── jsonata-mapper.ts
│       │   └── index.ts
│       └── project.json
│
├── nx.json
├── package.json
├── tsconfig.base.json
└── README.md
```

## Initial Scope (Phase 1)

Build the minimum viable runtime loop:

### Must Have

1. **Shell renders** - Left sidebar + Dockview workspace
2. **Menu loads** - From JSON fixture
3. **Screen opens** - Click menu → new tab
4. **Form renders** - Formly config → inputs
5. **Form submits** - Parameters → provider
6. **Grid renders** - AG Grid config + rows
7. **Tab persists** - Reload → tab restored
8. **Action executes** - Button → provider → toast

### Example Flow

User opens "Inventory Search":
- Form: SKU (text), Location (dropdown), Status (radio)
- Submit → fixture adapter returns JSON
- Grid displays 10 rows
- User selects 2 rows
- Clicks "Adjust Qty" action → prompt for adjustment value
- Submit → fixture returns success → grid refreshes

### Should Have (Phase 2)

- Drilldown navigation (parent → child context)
- Federated screen embedding
- Row styling rules
- Action enablement rules
- Grid server-side mode (pagination)

### Won't Have (Phase 1)

- Mapping studio UI
- Authentication/authorization
- Real backend integration
- Advanced grid features (grouping, pivot)
- Custom field types
- Mobile responsive

## Development Workflow

### 1. Generate Library

```bash
nx g @nx/angular:library runtime-core --directory=libs/runtime-core
```

### 2. Define Contracts

Create TypeScript interfaces in `runtime-core/contracts/`.

### 3. Create Provider Interface

```typescript
// runtime-core/providers/data-provider.ts
export interface DataProvider {
  fetchData(request: DataRequest): Promise<DataResponse>;
  executeAction(request: ActionRequest): Promise<ActionResponse>;
}
```

### 4. Implement Fixture Adapter

```typescript
// showcase/providers/fixture-adapter.ts
export class FixtureDataProvider implements DataProvider {
  async fetchData(request: DataRequest): Promise<DataResponse> {
    const json = await this.loadFixture(`data/${request.screenId}.json`);
    return json as DataResponse;
  }
}
```

### 5. Build Screen Renderer

```typescript
// screen-renderer/canonical-screen.component.ts
@Component({...})
export class CanonicalScreenComponent {
  @Input() config!: CanonicalScreen;
  
  onSubmit(values: any) {
    this.dataProvider.fetchData({
      screenId: this.config.screenId,
      parameters: values
    }).then(response => {
      this.gridData = response.rows;
    });
  }
}
```

### 6. Integrate into Shell

```typescript
// workspace-shell/shell.component.ts
openScreen(screenId: string) {
  const config = this.registry.getScreenConfig(screenId);
  this.dockview.openTab({
    id: screenId,
    title: config.title,
    component: CanonicalScreenComponent,
    params: { config }
  });
}
```

## Testing Strategy

- **Unit tests** - Each service/component in isolation
- **Integration tests** - Screen renderer with mock provider
- **E2E tests** - Full workflow (open → search → drilldown)
- **Visual tests** - Storybook for components (optional)

## Build Output

```bash
nx build showcase
# Produces: dist/apps/showcase/
# Static SPA deployable to any web server
```

## Explicitly Excluded (Not in Scope)

- Backend API implementation
- Authentication service
- User management
- Real-time updates (WebSocket)
- Offline-first sync
- Multi-tenancy
- Internationalization (i18n)
- Accessibility (a11y) beyond basics
- Mobile/tablet optimization
- Print layouts
- Advanced error recovery
- Audit logging
- Analytics integration

Focus on the **core runtime loop** first. Extensions come later.
