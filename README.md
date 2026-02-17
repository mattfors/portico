# Portico

A configurable application runtime for standardizing operational data interaction across multiple systems.

## Overview

Portico provides a VS Code-inspired workspace where screens are defined through configuration rather than custom code. External systems integrate through a plugin architecture, with mapping layers normalizing heterogeneous data into consistent interaction patterns.

## Key Features

- **VS Code-inspired layout** - Left sidebar navigation + Dockview tabbed workspace
- **Configuration-driven screens** - Forms, grids, and actions defined declaratively
- **Plugin architecture** - Data providers adapt external systems to canonical contracts
- **Federation support** - Embed external applications within workspace tabs
- **State persistence** - Workspace layout and preferences survive reloads

## Project Structure

```
portico/
├── prompts/          # AI development prompts (project documentation)
├── apps/             # Applications (to be created)
│   └── showcase/     # Demo application using JSON fixtures
└── libs/             # Reusable libraries (to be created)
    ├── runtime-core/
    ├── workspace-shell/
    └── ...
```

## AI Development Prompts

See [prompts/README.md](prompts/README.md) for comprehensive project documentation designed for AI-assisted development.

**Quick links:**
- [Project Intent](prompts/01-project-intent.md) - Core concept and goals
- [Architecture](prompts/02-architecture.md) - System structure and visual model
- [API Contracts](prompts/03-api-contracts.md) - Canonical data contracts
- [Tech Stack](prompts/04-tech-stack.md) - Technology choices
- [Plugin Model](prompts/05-plugin-model.md) - Library and adapter pattern

## Technology Stack

- **Angular** + TypeScript (strict mode)
- **PrimeNG** - UI components and left sidebar
- **Dockview** - VS Code-style tabbed workspace
- **Formly** - Configurable forms
- **AG Grid** - Configurable data grids
- **RxDB** - Local workspace persistence
- **JSONata** - Declarative data mapping
- **Nx** - Monorepo tooling

## Getting Started

*(Project setup in progress)*

## License

*(To be determined)*