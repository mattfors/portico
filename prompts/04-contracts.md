# Canonical Contracts

All integration adapts to these TypeScript interfaces. Providers return these structures; the runtime consumes them.

## Identifiers

All navigable content has a stable identifier.

```typescript
type ScreenId = string; // e.g., "inventory-search"
type ActionId = string; // e.g., "adjust-quantity"
type MappingId = string; // e.g., "inventory-response-mapper"
```

Used for routing, tab keys, persistence, deep links.

## Menu Contract

Hierarchical navigation structure displayed in left sidebar.

```typescript
interface MenuNode {
  id: ScreenId;
  label: string;
  icon?: string; // PrimeNG icon class
  type: 'canonical' | 'federated';
  children?: MenuNode[];
  metadata?: Record<string, any>;
}

interface MenuStructure {
  schemaVersion: string; // e.g., "1.0"
  nodes: MenuNode[];
}
```

**Example:** See [`examples/menu.json`](../examples/menu.json)

## Screen Contract

Defines what the runtime renders. Does not describe data retrieval or business logic.

### Base Screen

```typescript
interface BaseScreen {
  screenId: ScreenId;
  schemaVersion: string;
  title: string;
  icon?: string;
  metadata?: Record<string, any>;
}
```

### Canonical Screen

Form + grid + actions pattern.

```typescript
interface CanonicalScreen extends BaseScreen {
  type: 'canonical';
  form?: FormConfig;
  grid: GridConfig;
  actions?: ActionConfig[];
  childLinks?: ChildLinkConfig[];
  rules?: RuleConfig[];
}

interface FormConfig {
  fields: FormField[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  submitLabel?: string; // default: "Submit"
  resetLabel?: string; // default: "Reset"
  collapsible?: boolean; // default: true - form collapses after submit
  expandLabel?: string; // default: "Modify" - label for expand button when collapsed
}

// Form behavior:
// - Initial: expanded (fields visible)
// - After submit: collapsed to single-line summary with active parameters
// - Click expand button: expands form for modification, grid remains visible
// - After re-submit: collapses again with new results

interface FormField {
  key: string; // parameter name
  type: 'input' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'textarea';
  label: string;
  defaultValue?: any;
  required?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[]; // for dropdown
  placeholder?: string;
  disabled?: boolean;
  visible?: boolean | ConditionalExpression;
}

interface GridConfig {
  columns: GridColumn[];
  selectionMode?: 'single' | 'multiple' | 'none'; // default: 'single'
  pagination?: boolean; // default: true
  pageSize?: number; // default: 25
  sortable?: boolean; // default: true
  filterable?: boolean; // default: true
}

interface GridColumn {
  field: string; // row data property
  header: string; // display name
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  format?: string; // e.g., "MM/DD/YYYY" for dates
  hidden?: boolean;
}

interface ActionConfig {
  actionId: ActionId;
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  requiresSelection?: boolean; // default: false
  minSelection?: number;
  maxSelection?: number;
  enabledWhen?: ConditionalExpression;
  prompt?: FormConfig; // optional user input before execution
  confirmMessage?: string;
}

interface ChildLinkConfig {
  childScreenId: ScreenId;
  label: string;
  icon?: string;
  contextMapping: Record<string, string>; // childParam: parentField
  openBehavior?: 'tab' | 'modal'; // default: 'tab'
}

interface RuleConfig {
  id: string;
  condition: ConditionalExpression;
  effect: 'rowStyle' | 'cellStyle' | 'actionEnable';
  target?: string; // column field or actionId
  style?: Record<string, any>; // CSS properties
}

type ConditionalExpression = string; // JSONata expression
```

**Example:** See [`examples/screen-canonical.json`](../examples/screen-canonical.json)

### Federated Screen

Embedded external application.

```typescript
interface FederatedScreen extends BaseScreen {
  type: 'federated';
  urlTemplate: string; // e.g., "https://legacy.app/orders?id={{orderId}}"
  parameterBindings?: Record<string, string>; // templateVar: paramName
  allowExternalOpen?: boolean; // show "Open Externally" button
  sandbox?: string[]; // iframe sandbox attributes
}
```

**Example:** See [`examples/screen-federated.json`](../examples/screen-federated.json)

## Data Exchange Contract

### Request

```typescript
interface DataRequest {
  screenId: ScreenId;
  parameters: Record<string, any>; // form values
  selectionContext?: Record<string, any>; // from parent drilldown
  gridState?: GridState;
  metadata?: Record<string, any>;
}

interface GridState {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
}
```

### Response

```typescript
interface DataResponse {
  rows: any[]; // array of objects with properties matching grid columns
  meta?: DataMeta;
}

interface DataMeta {
  totalCount?: number; // for pagination
  messages?: string[]; // user-facing messages (warnings, info)
  flags?: Record<string, boolean>; // runtime hints
  executionTime?: number; // ms (for debugging)
}
```

**Canonical example:** [`examples/data-canonical.json`](../examples/data-canonical.json)  
**External example:** [`examples/data-external.json`](../examples/data-external.json) (requires mapping)

## Action Contract

### Request

```typescript
interface ActionRequest {
  actionId: ActionId;
  screenId: ScreenId;
  parameters: Record<string, any>; // screen form values
  selectedRows: any[]; // grid selection
  promptValues?: Record<string, any>; // from action prompt form
  metadata?: Record<string, any>;
}
```

### Response

```typescript
interface ActionResponse {
  success: boolean;
  message?: string; // toast notification text
  errors?: string[]; // validation or execution errors
  meta?: Record<string, any>;
  refreshHint?: RefreshHint;
}

interface RefreshHint {
  requeryScreen?: boolean; // reload grid data
  closeTab?: boolean; // close current tab
  openScreen?: { // navigate to another screen
    screenId: ScreenId;
    parameters?: Record<string, any>;
  };
}
```

**Example:** See [`examples/action-response.json`](../examples/action-response.json)

## Context Propagation

When a parent screen drillsdown to a child:

1. User selects row in parent grid
2. Parent's `childLinks` defines mapping
3. Child opens with `selectionContext` populated
4. Child's form pre-fills from context
5. Child auto-submits (optional behavior)

```typescript
// Parent screen config
{
  childLinks: [
    {
      childScreenId: "order-details",
      label: "View Order",
      contextMapping: {
        "orderId": "id",        // child param ← parent field
        "customerId": "custId"
      }
    }
  ]
}

// Resulting child request
{
  screenId: "order-details",
  parameters: {},
  selectionContext: {
    orderId: "ORD-12345",
    customerId: "CUST-789"
  }
}
```

## Mapping Contract

Transforms external responses to canonical `DataResponse`.

```typescript
interface MappingConfig {
  mappingId: MappingId;
  schemaVersion: string;
  source: 'jsonata' | 'jmespath' | 'custom';
  expression: string; // transformation expression
  metadata?: Record<string, any>;
}
```

**JSONata example:**

```jsonata
{
  "rows": items[].{
    "sku": product_code,
    "description": product_name,
    "quantity": qty_on_hand,
    "location": warehouse.code
  },
  "meta": {
    "totalCount": pagination.total
  }
}
```

## Versioning

All contracts include `schemaVersion: "1.0"`.

### Rules:

- **Non-breaking changes** - Add optional fields, increment minor (1.0 → 1.1)
- **Breaking changes** - Remove/rename required fields, increment major (1.0 → 2.0)
- Providers declare supported versions
- Runtime should handle missing optional fields gracefully

## Validation Types

```typescript
interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'email' | 'custom';
  value?: any;
  message?: string;
  expression?: string; // for custom validation (JSONata)
}

interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}
```

## Non-Goals

Contracts do **not** include:

- SQL queries or command syntax
- HTTP endpoints or URLs
- Authentication mechanisms
- Business logic or calculation formulas
- Domain-specific schemas

Providers own those concerns.
