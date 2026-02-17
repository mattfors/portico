# Overview

## What Is This Project?

Portico is a configurable application runtime that standardizes how humans interact with operational data across multiple systems. It replaces bespoke application interfaces with a unified, configuration-driven workspace where screens are composed declaratively rather than coded.

## Problem Statement

Organizations operate multiple backend systems (WMS, ERP, CRM, etc.), each with its own interface. This creates:

- **Interface fragmentation** - Users learn different UIs for similar workflows
- **Maintenance burden** - Every screen requires custom code
- **Integration complexity** - Each system needs dedicated UI development
- **Inconsistent patterns** - No standardization across operational workflows

## Solution Approach

Portico provides a **single runtime** that:

1. **Renders screens from configuration** - Forms, grids, and actions defined declaratively
2. **Normalizes data via mapping** - Heterogeneous APIs adapted to canonical contracts
3. **Federates external views** - Legacy applications embedded alongside new screens
4. **Persists workspace state** - Users resume where they left off

The runtime acts as an **interaction standard**, decoupling UI from backend implementation.

## Design Principles

### Configuration Over Code
Screens are JSON configurations, not React/Angular components. This makes them:
- Analyzable by machines
- Portable across runtimes
- Evolvable without redeployment

### Constraint Over Flexibility
Interaction patterns are intentionally limited:
- Forms: standard inputs (text, dropdown, date)
- Grids: tabular data with filtering/sorting
- Actions: provider-executed operations

This constraint improves consistency and maintainability.

### Separation of Concerns
Four independent layers:
1. **Data retrieval** - How backends are queried (providers)
2. **Mapping** - How responses are normalized (JSONata)
3. **Configuration** - How screens are defined (JSON)
4. **Rendering** - How UI is displayed (runtime)

### Federation Support
Legacy applications embed as tabs within the workspace. No need to rewrite everything—coexist while migrating incrementally.

## Key Capabilities

### Canonical Screens
- **Parameter forms** - Gather user input
- **Data grids** - Display tabular results
- **Actions** - Execute operations (create, update, approve)
- **Drilldown navigation** - Parent selection → child screen with context

### Federated Screens
- **External views** - Embed existing apps via URL
- **Tab integration** - Managed like canonical screens
- **Parameter binding** - Pass context into embedded views

### Persistent Workspace
- **VS Code-inspired layout** - Left sidebar menu + tabbed workspace
- **Session restoration** - Open tabs, layout, form state persist
- **Cross-session continuity** - Users resume their work context

## Architectural Separation

```
External Systems (APIs, databases)
         ↓
   Data Providers (adapters)
         ↓
   Mapping Layer (JSONata)
         ↓
   Canonical Contracts (JSON)
         ↓
   Runtime Engine (Angular)
         ↓
   User Interface (PrimeNG + Dockview)
```

Each layer operates independently. Changing a backend doesn't affect the runtime. Adding a new screen type doesn't require UI code changes.

## Project Goals

1. **Demonstrate** that configuration-driven runtimes can handle complex operational workflows
2. **Reduce** application complexity by eliminating per-screen components
3. **Improve** maintainability through declarative configuration
4. **Enable** federation of legacy systems within a modern interface
5. **Provide** a reusable library that other applications can embed

## What This Is Not

- **Not a low-code platform** - No drag-and-drop screen builder (yet)
- **Not a backend** - Runtime only; data comes from external systems
- **Not infinitely flexible** - Intentionally constrained interaction model
- **Not a replacement for all UIs** - Optimized for operational/enterprise workflows

## Success Criteria

The project succeeds when:

- A realistic operational workflow (search → results → drilldown → action) works end-to-end
- Screens are defined purely through configuration
- Swapping the JSON fixture adapter for an HTTP adapter requires no runtime changes
- The showcase looks like a production operational system
- The library can be embedded in another Angular application
