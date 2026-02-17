# Prompt Templates Index

Quick reference guide to all prompt templates available in this project.

## Template Categories

### Components (`prompts/components/`)

Templates for creating Angular components.

| Template | Use Case | Example |
|----------|----------|---------|
| Component Creation | Any new component | [Button Example](./components/button-component-example.md) |
| Smart Component | Container/stateful components | Dashboard, List containers |
| Presentational Component | Pure UI components | Buttons, Cards, Forms |
| Form Component | Forms with validation | Login, Registration, Profile Edit |
| List Component | Displaying collections | User List, Product Grid |

**When to use**: Creating any new UI component

**Key sections**:
- Context (purpose, location, parent feature)
- Requirements (functional, UI/UX, technical)
- Specifications (inputs, outputs, dependencies)
- Testing requirements
- Acceptance criteria

### Services (`prompts/services/`)

Templates for creating Angular services.

| Template | Use Case | Example |
|----------|----------|---------|
| Data Service | CRUD operations | [Data Service Example](./services/data-service-example.md) |
| API Service | External API integration | Payment Gateway, Maps API |
| State Service | Application state management | User State, Cart State |
| Utility Service | Helper functions | Date Formatter, Validator |

**When to use**: Creating services for business logic, API calls, or state management

**Key sections**:
- Context (purpose, scope, dependencies)
- Requirements (functional, technical)
- Public API (method signatures)
- Implementation details (HTTP, caching, errors)
- Testing requirements

### Features (`prompts/features/`)

Templates for implementing complete features.

| Template | Use Case | Example |
|----------|----------|---------|
| Feature Implementation | Complete user-facing feature | [Dashboard Example](./features/user-dashboard-example.md) |
| CRUD Feature | Create/Read/Update/Delete workflow | User Management, Product Catalog |
| Workflow Feature | Multi-step process | Checkout Process, Onboarding |
| Integration Feature | Third-party integration | OAuth Login, Payment Processing |

**When to use**: Implementing a complete feature with multiple components and services

**Key sections**:
- Context (purpose, user story, priority)
- Requirements (functional, non-functional)
- User flows
- Components and services needed
- Data models and API endpoints
- Testing strategy
- Rollout plan

### Testing (`prompts/testing/`)

Templates for test creation.

| Template | Use Case | Description |
|----------|----------|-------------|
| Unit Tests | Component/Service tests | Test individual units |
| Integration Tests | Feature workflow tests | Test component + service |
| E2E Tests | User journey tests | Test complete flows |
| Accessibility Tests | A11y compliance | Keyboard, screen reader |

**When to use**: Creating comprehensive test suites

**Key sections**:
- Test coverage requirements
- Test specifications (cases)
- Mocking strategy
- Test data/fixtures
- Acceptance criteria

### Architecture (`prompts/architecture/`)

Templates for architectural decisions.

| Template | Use Case | Description |
|----------|----------|-------------|
| ADR (Architecture Decision Record) | Major architecture decisions | State management choice, Module structure |
| State Management | State strategy | NgRx vs Akita vs Services |
| Module Structure | App organization | Feature vs Layered |
| Component Architecture | Component patterns | Smart/Presentational |
| API Integration | Backend integration | HTTP service layer |

**When to use**: Making significant architectural choices

**Key sections**:
- Status (proposed, accepted, deprecated)
- Context (motivation for decision)
- Decision (what we're choosing)
- Consequences (pros, cons, impacts)
- Alternatives considered

### Documentation (`prompts/documentation/`)

Templates for generating documentation.

| Template | Use Case | Description |
|----------|----------|-------------|
| Feature Documentation | Document features | User and developer guides |
| API Documentation | Document APIs | Endpoints, models, examples |
| Component Documentation | Document components | Usage, API, examples |

**When to use**: Creating or updating documentation

**Key sections**:
- Overview
- Usage instructions
- API reference
- Examples
- Troubleshooting

## Quick Start Templates

### Creating a Simple Component

1. Use: `prompts/components/README.md` template
2. Focus on: Inputs, Outputs, Styling
3. Example: Button, Card, Badge

### Creating a Feature

1. Use: `prompts/features/README.md` template
2. Start with: User story and requirements
3. Define: Components, services, flows
4. Example: User Dashboard, Shopping Cart

### Creating a Service

1. Use: `prompts/services/README.md` template
2. Define: Public API first
3. Specify: Error handling and caching
4. Example: Auth Service, Data Service

### Writing Tests

1. Use: `prompts/testing/README.md` template
2. Cover: Happy path, edge cases, errors
3. Aim for: >80% coverage
4. Example: Component tests, Service tests

## Template Selection Guide

**I need to build...**

- **A button or form input** → Component template (simple)
- **A page or view** → Feature template
- **An API client** → Service template (data/API)
- **Tests for my code** → Testing template
- **Choose state management** → Architecture template (ADR)
- **A complete feature** → Feature template
- **Documentation** → Documentation template

## Best Practices

### Before Creating a Prompt

1. ✅ Understand the requirement fully
2. ✅ Check if similar prompts exist
3. ✅ Choose the right template
4. ✅ Gather all necessary information

### While Creating a Prompt

1. ✅ Fill in all template sections
2. ✅ Be specific and detailed
3. ✅ Include examples
4. ✅ Define measurable acceptance criteria

### After Creating a Prompt

1. ✅ Review for completeness
2. ✅ Get team feedback
3. ✅ Refine based on feedback
4. ✅ Use with AI tools to generate code

## Examples

Every template directory contains example prompts:

- [Button Component Example](./components/button-component-example.md)
- [Data Service Example](./services/data-service-example.md)
- [User Dashboard Example](./features/user-dashboard-example.md)

Study these examples to understand how to write effective prompts.

## Tips for Better Prompts

1. **Be Specific**: "Create a login form with email/password" not "create a form"
2. **Include Context**: Explain where and why this will be used
3. **Define Success**: Write clear acceptance criteria
4. **Add Examples**: Show expected inputs/outputs
5. **Consider Edge Cases**: Think about errors and edge cases
6. **Specify Standards**: Reference coding standards and patterns

## Getting Help

- Review examples in each prompt directory
- Read [GETTING_STARTED.md](../GETTING_STARTED.md)
- Ask team members for prompt reviews
- Iterate based on AI-generated code quality

## Contributing Templates

If you create a useful prompt pattern:

1. Generalize it into a reusable template
2. Add it to the appropriate README
3. Include an example
4. Submit a PR
5. Help improve our prompt library!
