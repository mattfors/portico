# AI Development Prompts

Comprehensive documentation for AI-assisted development of the Portico configurable runtime.

## Quick Start

**For AI assistants:** Read prompts 01 → 06 in sequence for full context. Use `examples/` for concrete JSON structures.

**For humans:** Start with [01-overview.md](01-overview.md) to understand the project intent.

## Prompt Files

### [01-overview.md](01-overview.md) 
**What and why** - Project intent, problem statement, solution approach, design principles, goals.

Start here to understand what Portico is and why it exists.

### [02-visual-model.md](02-visual-model.md)
**User experience** - VS Code-inspired layout, left sidebar navigation, Dockview tabs, user interaction flows, keyboard shortcuts.

Read this to understand what users see and how they interact with the system.

### [03-architecture.md](03-architecture.md)
**System structure** - Architectural layers, responsibilities, data flow, separation of concerns.

Read this to understand how the system is organized internally.

### [04-contracts.md](04-contracts.md)
**API interfaces** - TypeScript contracts for menu, screens, data exchange, actions, context propagation.

Read this to understand the canonical data structures that decouple integration from rendering.

### [05-implementation.md](05-implementation.md)
**Technology and constraints** - Tech stack, constrained capabilities (Formly, AG Grid), project structure, initial scope, explicitly excluded features.

Read this to understand what technologies to use and what subset of their features is allowed.

### [06-plugin-model.md](06-plugin-model.md)
**Library and adapters** - Provider interfaces, fixture adapter pattern, production adapter, DI configuration.

Read this to understand how external systems integrate with the runtime.

## Examples

The [`examples/`](examples/) directory contains concrete JSON fixtures referenced in the prompts:

- **[menu.json](examples/menu.json)** - Hierarchical navigation structure
- **[screen-canonical.json](examples/screen-canonical.json)** - Form + grid + actions configuration
- **[screen-federated.json](examples/screen-federated.json)** - Embedded external app configuration
- **[data-canonical.json](examples/data-canonical.json)** - Canonical `{ rows, meta }` response
- **[data-external.json](examples/data-external.json)** - External API response (requires mapping)
- **[mapping-external-to-canonical.jsonata](examples/mapping-external-to-canonical.jsonata)** - JSONata transformation
- **[action-response.json](examples/action-response.json)** - Action execution result

## Usage with AI

### For New Features

Provide relevant prompts in order:

```
Context: 01-overview.md, 03-architecture.md, 04-contracts.md

Task: Implement the DataProvider interface that fetches canonical 
data responses from an HTTP endpoint.
```

### For UI Work

```
Context: 02-visual-model.md, 03-architecture.md, 05-implementation.md

Task: Create the left sidebar menu component using PrimeNG Tree.
```

### For Integration

```
Context: 04-contracts.md, 06-plugin-model.md, examples/

Task: Build a fixture adapter that loads screen configs from JSON files.
```

### Topic Reference

| Question | Relevant Prompts |
|----------|-----------------|
| What is Portico? | 01-overview.md |
| What does it look like? | 02-visual-model.md |
| How is it structured? | 03-architecture.md |
| What are the data contracts? | 04-contracts.md |
| What tech should I use? | 05-implementation.md |
| How do I integrate? | 06-plugin-model.md |
| Show me examples | examples/ |

## Visual Model Summary

VS Code-inspired layout:

```
┌─────────────────────────────────────────────────────────────┐
│  Portico Workspace                                    [−][□][×]│
├──────────────┬──────────────────────────────────────────────┤
│              │  Tabs: [Inventory Search] [Order #1234] [+] │
│   SIDEBAR    ├──────────────────────────────────────────────┤
│              │                                              │
│  🔍 Search   │  ┌─────────────────────────────────────┐   │
│              │  │ Parameter Form                      │   │
│  📂 Menu     │  │ [inputs, dropdowns, buttons]        │   │
│   Inventory  │  └─────────────────────────────────────┘   │
│   Orders     │                                              │
│   Shipping   │  ┌─────────────────────────────────────┐   │
│   Reports    │  │ Data Grid (AG Grid)                 │   │
│              │  │ [rows of tabular data...]           │   │
│              │  └─────────────────────────────────────┘   │
│              │                                              │
│              │  [Actions: Export, Adjust, Transfer]        │
└──────────────┴──────────────────────────────────────────────┘
```

- **Left:** PrimeNG menu + search
- **Right:** Dockview tabs with canonical/federated screens
- **Tab content:** Form (collapsible) + Grid + Actions (all self-contained)

**Form collapse pattern:**
- Initial state: Form expanded, no grid
- After search: Form collapses to summary ("▶ SKU: ABC* [Modify]"), grid shows results
- Click [Modify]: Form expands for editing, grid remains visible

## Development Principles

When implementing, follow these principles:

1. **Configuration over code** - Screens defined declaratively, not as components
2. **Separation of concerns** - Runtime never knows about data sources or APIs
3. **Provider abstraction** - All external integration through interfaces
4. **Constrained flexibility** - Limited subset of Formly/AG Grid features
5. **VS Code patterns** - Left sidebar navigation + Dockview tabbed workspace
6. **No domain coupling** - Library is domain-agnostic; adapters handle specifics
7. **Contract-first** - All interactions through TypeScript interfaces

## Anti-Patterns to Avoid

❌ Custom per-screen components (violates configuration-driven principle)  
❌ Domain logic in the runtime (belongs in providers/adapters)  
❌ Executable code in configuration (keep it declarative—JSONata only)  
❌ Direct API calls from runtime (use provider interfaces)  
❌ Backend dependencies in library (only in adapters)  
❌ Unconstrained use of Formly/AG Grid (follow allowed features in 05-implementation.md)

## Constrained Capabilities Summary

**Forms (Formly):**
- ✅ Basic input types (text, number, date, dropdown, checkbox, radio, textarea)
- ✅ Standard validation (required, min/max, pattern, email, custom JSONata)
- ✅ Conditional visibility (JSONata expressions)
- ✅ Collapsible forms (collapse to summary after submit, expandable for modification)
- ❌ Custom templates, dynamic injection, file uploads, rich text

**Grids (AG Grid):**
- ✅ Standard columns (text, number, date, boolean, currency)
- ✅ Sorting, filtering, pagination
- ✅ Row selection (single/multi)
- ✅ Conditional styling (via rules)
- ❌ Custom cell renderers, inline editing, grouping, pivot, tree data

**Rules (JSONata):**
- ✅ Row/cell styling, action enablement, field visibility
- ✅ Declarative expressions only
- ❌ Side effects, HTTP calls, arbitrary functions, long-running computations

## Scaffold Command Reference

Generate new libraries:

```bash
# Core contracts
nx g @nx/angular:library runtime-core --directory=libs/runtime-core

# UI components
nx g @nx/angular:library workspace-shell --directory=libs/workspace-shell
nx g @nx/angular:library screen-renderer --directory=libs/screen-renderer
nx g @nx/angular:library federation --directory=libs/federation

# Services
nx g @nx/angular:library rules-engine --directory=libs/rules-engine
nx g @nx/angular:library persistence --directory=libs/persistence
nx g @nx/angular:library mapping --directory=libs/mapping

# Showcase app
nx g @nx/angular:app showcase --directory=apps/showcase
```

## File Organization

```
prompts/
├── README.md              ← You are here
├── 01-overview.md         ← Start: What and why
├── 02-visual-model.md     ← UX and interaction patterns
├── 03-architecture.md     ← System structure
├── 04-contracts.md        ← TypeScript interfaces
├── 05-implementation.md   ← Tech stack and constraints
├── 06-plugin-model.md     ← Integration pattern
└── examples/              ← Concrete JSON fixtures
    ├── menu.json
    ├── screen-canonical.json
    ├── screen-federated.json
    ├── data-canonical.json
    ├── data-external.json
    ├── mapping-external-to-canonical.jsonata
    └── action-response.json
```

## Key Takeaways

**For AI:**
- Read 01-06 sequentially for full understanding
- Reference examples/ for concrete structures
- Follow constrained capabilities strictly
- Use provider interfaces for all external integration

**For Humans:**
- Overview (01) explains the "why"
- Visual Model (02) shows the "what"
- Architecture (03) describes the "how"
- Contracts (04) define the interfaces
- Implementation (05) specifies the tools
- Plugin Model (06) explains integration

---

*Last updated: 2026-02-17*
