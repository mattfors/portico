# Service Prompts

This directory contains prompts for generating Angular services.

## Template: Service Creation

Use this template when creating a new Angular service:

```markdown
# Service Name: [ServiceName]

## Context
- **Purpose**: [What this service does]
- **Scope**: [Module/Application level]
- **Dependencies**: [Other services it depends on]

## Requirements

### Functional Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### Technical Requirements
- [ ] Injectable decorator with appropriate providedIn
- [ ] TypeScript strict mode
- [ ] Proper error handling
- [ ] Observable-based API
- [ ] Memory leak prevention

## Service Specifications

### Public API
```typescript
// Define the public methods and properties
```

### Dependencies
- HTTP Client (if applicable)
- Other Services: [List services]
- External APIs: [List external dependencies]

### Data Models
```typescript
// Define interfaces/types used by this service
```

### State Management
- State persistence (if applicable)
- Cache strategy (if applicable)
- Error state handling

## Implementation Details

### HTTP Communication
- Base URL configuration
- Request/Response interceptors
- Error handling strategy
- Retry logic (if applicable)

### Caching
- Cache duration
- Cache invalidation strategy
- Storage mechanism

### Error Handling
- Error types to handle
- User-facing error messages
- Logging strategy

## Testing Requirements
- Unit tests for all public methods
- Mock external dependencies
- Test error scenarios
- Test edge cases
- Coverage > 80%

## Acceptance Criteria
- [ ] Service implements all required functionality
- [ ] Proper error handling in place
- [ ] All tests pass
- [ ] No memory leaks
- [ ] Documentation complete
- [ ] Type safety enforced

## Related Services
- [List related services or dependencies]
```

## Example Prompts

See individual `.md` files in this directory for specific service prompts.
