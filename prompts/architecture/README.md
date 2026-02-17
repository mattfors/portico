# Architecture Prompts

This directory contains prompts for architectural decisions and patterns.

## Template: Architecture Decision Record (ADR)

Use this template when making architectural decisions:

```markdown
# ADR [Number]: [Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue that we're seeing that is motivating this decision or change?

## Decision
What is the change that we're proposing and/or doing?

## Consequences
What becomes easier or more difficult to do because of this change?

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Drawback 1]
- [Drawback 2]

### Neutral
- [Impact 1]

## Alternatives Considered
- **Alternative 1**: [Description and why it was not chosen]
- **Alternative 2**: [Description and why it was not chosen]

## References
- [Link to relevant documentation]
- [Link to research or articles]
```

## Common Architecture Patterns

### State Management
```markdown
# State Management Strategy

## Options
1. **NgRx**: Full Redux implementation
2. **Akita**: Simplified state management
3. **Component State**: Local state with services
4. **Signals**: Angular 16+ signal-based state

## Recommendation
[Choose based on app complexity]

## Implementation Guidelines
- When to use global vs local state
- State normalization patterns
- Async data handling
- Cache strategies
```

### Module Structure
```markdown
# Module Organization Strategy

## Options
1. **Feature Modules**: Organized by business domain
2. **Layered Architecture**: Organized by technical layer
3. **Hybrid Approach**: Mix of feature and technical grouping

## Recommendation
[Choose based on team size and app complexity]

## Directory Structure
```
src/
├── app/
│   ├── core/           # Singleton services, guards, interceptors
│   ├── shared/         # Shared components, directives, pipes
│   ├── features/       # Feature modules
│   │   ├── feature-a/
│   │   └── feature-b/
│   └── layout/         # Layout components
```
```

### Component Architecture
```markdown
# Component Design Patterns

## Smart vs Presentational Components

### Smart (Container) Components
- Manage state
- Call services
- Handle business logic
- Pass data to presentational components

### Presentational (Dumb) Components
- Receive data via @Input
- Emit events via @Output
- No direct service dependencies
- Pure presentation logic

## Change Detection Strategy
- Use OnPush for better performance
- Immutable data patterns
- Explicit change detection when needed
```

### API Integration
```markdown
# API Integration Pattern

## HTTP Service Layer
- Centralized HTTP service
- Type-safe API calls
- Error handling
- Request/Response transformation
- Caching strategy

## Interceptors
- Authentication token injection
- Error handling
- Loading state management
- Request/Response logging
```

### Testing Architecture
```markdown
# Testing Strategy

## Test Pyramid
1. Unit Tests (70%)
   - Components
   - Services
   - Utilities

2. Integration Tests (20%)
   - Feature workflows
   - Component + Service integration

3. E2E Tests (10%)
   - Critical user journeys
   - Smoke tests
```

## Best Practices

1. **Document Decisions**: Always create an ADR for significant architectural choices
2. **Review Regularly**: Revisit architectural decisions as the app evolves
3. **Team Consensus**: Involve team in architectural discussions
4. **Start Simple**: Choose the simplest solution that works
5. **Plan for Scale**: Consider future growth in decisions

## Example Prompts

See individual `.md` files in this directory for specific architecture prompts.
