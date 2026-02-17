# Project Structure Guide

This document explains the organizational structure of the Portico Angular application.

## Directory Structure

```
portico/
├── .github/              # GitHub specific files
│   └── workflows/        # CI/CD workflows
├── prompts/              # Prompt-first development prompts
│   ├── components/       # Component creation prompts and templates
│   ├── services/         # Service creation prompts and templates
│   ├── features/         # Feature implementation prompts
│   ├── testing/          # Testing strategy and test prompts
│   ├── architecture/     # Architecture Decision Records (ADRs)
│   └── documentation/    # Documentation generation prompts
├── src/                  # Application source code (to be created)
│   ├── app/              # Angular application
│   │   ├── core/         # Core module (singleton services, guards, interceptors)
│   │   ├── shared/       # Shared module (common components, directives, pipes)
│   │   ├── features/     # Feature modules (lazy-loaded business domains)
│   │   ├── layout/       # Layout components (header, footer, navigation)
│   │   └── app.component.* # Root component files
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── environments/     # Environment-specific configurations
│   ├── styles/           # Global styles
│   ├── index.html        # Main HTML file
│   └── main.ts           # Application entry point
├── dist/                 # Build output (not in version control)
├── node_modules/         # NPM dependencies (not in version control)
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore rules
├── angular.json          # Angular CLI configuration
├── package.json          # NPM package configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # TypeScript config for application
├── tsconfig.spec.json    # TypeScript config for tests
└── README.md             # Project documentation
```

## Module Organization

### Core Module (`src/app/core/`)
**Purpose**: Singleton services and components used application-wide

**Contains**:
- Authentication services
- HTTP interceptors
- Global error handlers
- Route guards
- App-wide singleton services

**Rule**: Import only once in AppModule

### Shared Module (`src/app/shared/`)
**Purpose**: Reusable components, directives, and pipes

**Contains**:
- UI components (buttons, inputs, cards, etc.)
- Custom directives
- Custom pipes
- Utility functions
- Shared interfaces/types

**Rule**: Can be imported in any feature module

### Feature Modules (`src/app/features/`)
**Purpose**: Business domain features

**Structure**:
```
features/
├── feature-a/
│   ├── components/      # Feature-specific components
│   ├── services/        # Feature-specific services
│   ├── models/          # Feature-specific interfaces/types
│   ├── feature-a-routing.module.ts
│   └── feature-a.module.ts
└── feature-b/
    └── ...
```

**Rule**: Should be lazy-loaded when possible

### Layout Module (`src/app/layout/`)
**Purpose**: Application layout structure

**Contains**:
- Header component
- Footer component
- Sidebar/Navigation component
- Main layout wrapper

## File Naming Conventions

- **Components**: `component-name.component.ts`
- **Services**: `service-name.service.ts`
- **Directives**: `directive-name.directive.ts`
- **Pipes**: `pipe-name.pipe.ts`
- **Interfaces**: `interface-name.interface.ts` or `interface-name.model.ts`
- **Guards**: `guard-name.guard.ts`
- **Interceptors**: `interceptor-name.interceptor.ts`

## Component Structure

Each component should have:
```
component-name/
├── component-name.component.ts        # Component logic
├── component-name.component.html      # Template
├── component-name.component.scss      # Styles
└── component-name.component.spec.ts   # Tests
```

## Import Order

Organize imports in this order:
1. Angular core imports
2. Angular common imports
3. Third-party library imports
4. Application core imports
5. Shared imports
6. Relative imports

Example:
```typescript
// Angular core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Third-party
import { Observable } from 'rxjs';

// App core
import { AuthService } from '@core/services/auth.service';

// Shared
import { CustomValidator } from '@shared/validators/custom.validator';

// Relative
import { FeatureService } from '../services/feature.service';
```

## Path Aliases

Configured in `tsconfig.json`:
- `@app/*` → `src/app/*`
- `@core/*` → `src/app/core/*`
- `@shared/*` → `src/app/shared/*`
- `@features/*` → `src/app/features/*`
- `@environments/*` → `src/environments/*`

Use these instead of relative paths for cleaner imports.

## Best Practices

1. **One component per file**
2. **Keep components small** (< 300 lines)
3. **Use OnPush change detection** by default
4. **Unsubscribe from observables** in ngOnDestroy
5. **Use async pipe** when possible
6. **Keep business logic in services**
7. **Use strict TypeScript** configuration
8. **Write tests** for all components and services
9. **Follow Angular style guide**
10. **Document public APIs**

## Adding New Features

1. Create a prompt in `prompts/features/`
2. Define the module structure
3. Generate components and services
4. Update routing
5. Add tests
6. Update documentation

## References

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Angular Folder Structure](https://angular.io/guide/file-structure)
