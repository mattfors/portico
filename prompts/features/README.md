# Feature Prompts

This directory contains prompts for implementing complete features.

## Template: Feature Implementation

Use this template when creating a new feature:

```markdown
# Feature Name: [FeatureName]

## Context
- **Purpose**: [What this feature does]
- **User Story**: As a [user type], I want to [action] so that [benefit]
- **Priority**: [High/Medium/Low]

## Requirements

### Functional Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### Non-Functional Requirements
- [ ] Performance: [Specific metrics]
- [ ] Security: [Security considerations]
- [ ] Scalability: [Scalability needs]
- [ ] Accessibility: WCAG 2.1 AA compliance

## Feature Specifications

### User Flows
1. [Step 1 of user interaction]
2. [Step 2 of user interaction]
3. [Step 3 of user interaction]

### Components Needed
- [ ] [Component 1] - [Purpose]
- [ ] [Component 2] - [Purpose]
- [ ] [Component 3] - [Purpose]

### Services Needed
- [ ] [Service 1] - [Purpose]
- [ ] [Service 2] - [Purpose]

### Data Models
```typescript
// Define interfaces/types for this feature
```

### API Endpoints
- [ ] GET /api/[endpoint] - [Purpose]
- [ ] POST /api/[endpoint] - [Purpose]
- [ ] PUT /api/[endpoint] - [Purpose]
- [ ] DELETE /api/[endpoint] - [Purpose]

### State Management
- What state needs to be managed
- Where state should live (local/global)
- State update patterns

### Routing
- [ ] Route path: /[route]
- [ ] Route guards (if applicable)
- [ ] Child routes (if applicable)

## UI/UX Design

### Wireframes
- [Link to design files or description]

### User Interactions
- [Describe key interactions]
- [Animations/transitions]
- [Feedback mechanisms]

### Responsive Behavior
- Mobile: [Specific behavior]
- Tablet: [Specific behavior]
- Desktop: [Specific behavior]

## Testing Strategy

### Unit Tests
- Component tests
- Service tests
- Utility function tests

### Integration Tests
- Feature workflow tests
- API integration tests

### E2E Tests
- Critical user paths
- Edge cases

## Acceptance Criteria
- [ ] All user stories completed
- [ ] UI matches design specifications
- [ ] All tests passing (>80% coverage)
- [ ] Performance metrics met
- [ ] Accessibility audit passes
- [ ] Code review completed
- [ ] Documentation updated

## Dependencies
- External libraries: [List]
- Internal dependencies: [List]
- Backend APIs: [List]

## Rollout Plan
- [ ] Feature flag implementation
- [ ] Gradual rollout strategy
- [ ] Monitoring and metrics
- [ ] Rollback plan

## Related Features
- [List related or dependent features]
```

## Example Prompts

See individual `.md` files in this directory for specific feature prompts.
