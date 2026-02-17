# Architecture

## System Structure

Portico is a modular runtime where each layer has a single, well-defined responsibility. Layers communicate through stable contracts, enabling independent evolution.

```
┌─────────────────────────────────────────────────────┐
│  User Interface Layer                               │
│  - Left Sidebar (PrimeNG)                           │
│  - Dockview Tabs (dockview.dev)                     │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  Workspace Shell                                     │
│  - Tab lifecycle management                         │
│  - Routing and navigation                           │
│  - State persistence orchestration                  │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  Screen Registry                                     │
│  - Resolves screenId → screen configuration         │
│  - Sources: static files, remote, providers         │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌──────────────────────────────┬──────────────────────┐
│  Canonical Screen Runtime    │  Federation Layer    │
│  - Renders forms (Formly)    │  - Embeds external   │
│  - Renders grids (AG Grid)   │  - Manages iframes   │
│  - Orchestrates actions      │  - Parameter binding │
└──────────────┬───────────────┴──────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  Rules Engine                                        │
│  - Conditional styling (row colors, cell format)    │
│  - Action enablement (based on selection)           │
│  - Field visibility (conditional form fields)       │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  Data Provider Layer (Plugins)                      │
│  - Receives canonical requests                      │
│  - Executes external API calls                      │
│  - Returns canonical responses                      │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  Mapping Layer (JSONata)                            │
│  - Transforms external → canonical                  │
│  - Declarative field mapping                        │
│  - Type conversions                                 │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│  Persistence Layer (RxDB)                           │
│  - Workspace state (tabs, layout)                   │
│  - Form state (parameter values)                    │
│  - Grid preferences (columns, filters)              │
└─────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### Workspace Shell

**What it does:**
- Renders the application chrome (sidebar + workspace)
- Manages tab lifecycle (open, close, activate)
- Routes screen opens to registry
- Persists and restores workspace state

**What it does NOT do:**
- Does not know how to render screen content
- Does not know where data comes from
- Does not contain domain logic

**Key operations:**
- `openScreen(screenId, parameters)` → creates tab
- `closeTab(tabId)` → removes tab, saves state
- `restoreWorkspace()` → rehydrates tabs from persistence

### Screen Registry

**What it does:**
- Maintains a catalog of available screens
- Resolves `screenId` to screen configuration
- May delegate to providers for dynamic screens

**What it does NOT do:**
- Does not render screens
- Does not fetch data
- Does not validate configurations (just returns them)

**Key operations:**
- `getScreenConfig(screenId): ScreenConfig`
- `listScreens(filter?): ScreenConfig[]`

### Canonical Screen Runtime

**What it does:**
- Renders parameter forms from Formly configuration
- Manages form collapse/expand state (collapsed after search, expandable for modification)
- Renders data grids from AG Grid configuration
- Orchestrates form submit → collapse form → data provider call → grid update
- Manages action invocations
- Applies rules for styling and behavior

**What it does NOT do:**
- Does not know where data comes from (uses providers)
- Does not transform data (uses mapping layer)
- Does not persist screens (uses workspace shell)

**Key operations:**
- `renderForm(formConfig)` → Formly form instance
- `submitForm(parameters)` → calls provider, collapses form, shows grid
- `collapseForm()` → hides form, shows parameter summary with [Modify] button
- `expandForm()` → shows full form fields for editing
- `renderGrid(gridConfig, data)` → AG Grid instance
- `executeAction(actionId, context)` → calls provider

**Form states:**
- **Expanded:** Full form fields visible, used for initial input or modification
- **Collapsed:** Single-line parameter summary with expand button, maximizes grid space
- **Hidden:** No form (for screens that don't have parameters)

### Federation Layer

**What it does:**
- Embeds external applications in tabs
- Manages iframe lifecycle and communication
- Binds parameters to URL templates

**What it does NOT do:**
- Does not control embedded content
- Does not transform federated data
- Does not enforce canonical contracts on external apps

**Key operations:**
- `embedView(url, container)` → creates iframe
- `bindParameters(template, params)` → resolves URL
- `postMessage(event)` → communicate with iframe (optional)

### Rules Engine

**What it does:**
- Evaluates declarative rules against data
- Applies conditional styling to grid rows/cells
- Enables/disables actions based on selection
- Shows/hides form fields based on values

**What it does NOT do:**
- Does not execute arbitrary code
- Does not fetch data or trigger side effects
- Does not modify data, only presentation

**Key operations:**
- `evaluateRule(rule, data): boolean`
- `applyRowStyle(row, rules): CSSProperties`
- `isActionEnabled(action, selection): boolean`

### Data Provider Layer

**What it does:**
- Receives canonical data requests
- Translates to external API calls (HTTP, GraphQL, gRPC, etc.)
- Returns canonical responses `{ rows, meta }`
- Handles authentication, retries, errors

**What it does NOT do:**
- Does not render UI
- Does not know about forms or grids
- Does not persist data (only fetches)

**Key operations:**
- `fetchData(request: DataRequest): Promise<DataResponse>`
- `executeAction(request: ActionRequest): Promise<ActionResponse>`
- `getMenuStructure(): Promise<MenuNode[]>`
- `getScreenConfig(screenId): Promise<ScreenConfig>`

### Mapping Layer

**What it does:**
- Transforms external API responses to canonical format
- Uses JSONata expressions for field mapping
- Handles type conversions (string → date, etc.)
- Filters/reshapes nested structures

**What it does NOT do:**
- Does not make API calls
- Does not execute arbitrary code
- Does not store mappings (stateless transformation)

**Key operations:**
- `transform(data, mapping): any`
- `applyMapping(response, mappingId): { rows, meta }`

### Persistence Layer

**What it does:**
- Stores workspace state locally (browser storage)
- Saves/loads tab configurations
- Persists form values between sessions
- Stores grid preferences

**What it does NOT do:**
- Does not cache operational data
- Does not sync across devices
- Does not store credentials

**Key operations:**
- `saveWorkspace(state): void`
- `loadWorkspace(): WorkspaceState`
- `saveFormState(screenId, values): void`
- `loadFormState(screenId): any`

## Data Flow

### Opening a Screen

```
User clicks menu item "Inventory Search"
    ↓
Workspace Shell: openScreen("inventory-search")
    ↓
Screen Registry: getScreenConfig("inventory-search")
    ↓
Returns: { type: "canonical", form: {...}, grid: {...} }
    ↓
Canonical Runtime: renderForm(formConfig) - expanded state
    ↓
Tab created with expanded form, no grid visible
```

### Submitting a Form

```
User fills form: { sku: "ABC*", location: "warehouse-a" }
User clicks [Search]
    ↓
Canonical Runtime: submitForm(parameters)
    ↓
Form collapses to single-line summary
    ↓
Data Provider: fetchData({ screenId, parameters })
    ↓
External API: GET /api/inventory?sku=ABC*&location=warehouse-a
    ↓
Mapping Layer: transform(response, mappingId)
    ↓
Data Provider: returns { rows: [...], meta: {...} }
    ↓
Canonical Runtime: renderGrid(gridConfig, rows)
    ↓
Grid displays results, form stays collapsed
```

### Modifying Search Parameters

```
User viewing results (form collapsed)
User clicks [Modify] button or ▶ icon
    ↓
Canonical Runtime: expandForm()
    ↓
Form expands showing all fields with current values
Grid remains visible (scrollable)
    ↓
User changes parameters
User clicks [Search]
    ↓
Form collapses, grid refreshes with new query
```

### Executing an Action

```
User selects 3 rows in grid
User clicks [Adjust Quantity]
    ↓
Canonical Runtime: checks action.prompt
    ↓
Modal displays prompt form: { adjustment, reason }
    ↓
User submits prompt
    ↓
Data Provider: executeAction({
  actionId: "adjust-quantity",
  screenId: "inventory-search",
  parameters: { sku: "ABC*", location: "warehouse-a" },
  selectedRows: [row1, row2, row3],
  promptValues: { adjustment: 10, reason: "cycle-count" }
})
    ↓
External API: POST /api/inventory/adjust
    ↓
Returns: { success: true, message: "3 items updated" }
    ↓
Canonical Runtime: toast notification + refresh grid
```

### Drilldown Navigation

```
User double-clicks row in "Inventory Search"
Row data: { sku: "ABC-123", location: "warehouse-a", qty: 50 }
    ↓
Canonical Runtime: evaluates childLinks
childLink: {
  childScreenId: "item-details",
  contextMapping: { itemSku: "sku", itemLocation: "location" }
}
    ↓
Workspace Shell: openScreen("item-details", {
  itemSku: "ABC-123",
  itemLocation: "warehouse-a"
})
    ↓
New tab opens with pre-filled form
    ↓
Auto-submit triggers data fetch
    ↓
Child screen displays details
```

## Architectural Goals

### Separation of Concerns
Each layer operates independently. Data providers don't know about Angular. The runtime doesn't know about HTTP. Mappings don't know about grids.

### Testability
- Shell can be tested with mock registry
- Runtime can be tested with mock providers
- Providers can be tested with mock APIs
- Rules can be tested with fixture data

### Extensibility
- Add new screen types without changing shell
- Add new providers without changing runtime
- Add new mapping strategies without changing providers

### Consistency
- All canonical screens follow the same pattern
- All data requests follow the same contract
- All actions follow the same invocation model

### Incremental Development
- Start with basic form + grid
- Add actions later
- Add federation later
- Add advanced rules later

Each layer can be built and tested in isolation.
