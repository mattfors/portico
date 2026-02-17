# Development Container

This project uses a VS Code development container for a consistent development environment.

## Features

- **Node.js 22** (LTS)
- **Angular CLI** and **Nx CLI** pre-configured
- **Git** and **GitHub CLI**
- Pre-installed VS Code extensions:
  - Angular Language Service
  - ESLint & Prettier
  - Nx Console
  - GitLens
  - TypeScript support

## Ports

- `4200` - Showcase application (main dev server)
- `4201-4203` - Additional applications/services

## Getting Started

1. Open this project in VS Code
2. When prompted, click "Reopen in Container" (or press F1 and select "Dev Containers: Reopen in Container")
3. Wait for the container to build and dependencies to install
4. Run `nx serve showcase` to start the development server

## Post-Create Commands

The container automatically runs `npm install` after creation to install all dependencies.

## Customization

Edit `.devcontainer/devcontainer.json` to:
- Add VS Code extensions
- Configure editor settings
- Add/modify forwarded ports
- Install additional system packages
