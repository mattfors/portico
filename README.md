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
├── .devcontainer/    # VS Code dev container configuration
├── prompts/          # AI development prompts (project documentation)
├── apps/
│   └── showcase/     # Demo application using JSON fixtures
└── libs/             # Reusable libraries (to be created)
    ├── runtime-core/
    ├── workspace-shell/
    └── ...
```

## Getting Started

### Prerequisites

- Node.js 22+ (LTS)
- npm or yarn
- VS Code (recommended for devcontainer support)

### Option 1: Using Dev Container (Recommended)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code
3. Open this project in VS Code
4. Click "Reopen in Container" when prompted (or F1 → "Dev Containers: Reopen in Container")
5. Wait for the container to build and dependencies to install
6. Run the showcase app: `nx serve showcase`
7. Open http://localhost:4200

### Option 2: Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/mattfors/portico.git
   cd portico
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Serve the showcase application
   ```bash
   nx serve showcase
   ```

4. Open http://localhost:4200

### Available Commands

```bash
# Serve application
nx serve showcase

# Build application
nx build showcase

# Run tests
nx test showcase

# Lint code
nx lint showcase

# Generate a new library
nx g @nx/angular:library my-library --directory=libs/my-library

# See all available commands
nx list
```

## AI Development Prompts

See [prompts/README.md](prompts/README.md) for comprehensive project documentation designed for AI-assisted development.

**Quick links:**
- [Overview](prompts/01-overview.md) - Project intent and goals
- [Visual Model](prompts/02-visual-model.md) - UI/UX patterns
- [Architecture](prompts/03-architecture.md) - System structure
- [Contracts](prompts/04-contracts.md) - API interfaces
- [Implementation](prompts/05-implementation.md) - Tech stack and constraints
- [Plugin Model](prompts/06-plugin-model.md) - Adapter pattern

## Technology Stack

- **Angular** + TypeScript (strict mode)
- **PrimeNG** - UI components and left sidebar
- **Dockview** - VS Code-style tabbed workspace
- **Formly** - Configurable forms
- **AG Grid** - Configurable data grids
- **RxDB** - Local workspace persistence
- **JSONata** - Declarative data mapping
- **Nx** - Monorepo tooling

## Development

This project uses Nx for monorepo management. Key concepts:

- **Apps** (apps/) - Deployable applications (showcase)
- **Libs** (libs/) - Reusable libraries (runtime-core, workspace-shell, etc.)
- **Affected commands** - Only run tasks on changed code
- **Computation caching** - Speed up builds and tests

Learn more at [nx.dev](https://nx.dev)

## License

*(To be determined)*