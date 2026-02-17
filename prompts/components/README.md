# Component Prompts

This directory contains prompts for generating Angular components.

## Template: Component Creation

Use this template when creating a new Angular component:

```markdown
# Component Name: [ComponentName]

## Context
- **Purpose**: [What this component does]
- **Location**: [Where in the app this will be used]
- **Parent Feature**: [Feature module it belongs to]

## Requirements

### Functional Requirements
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

### UI/UX Requirements
- [ ] Responsive design
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

### Technical Requirements
- [ ] TypeScript strict mode
- [ ] OnPush change detection strategy
- [ ] Reactive forms (if applicable)
- [ ] Observable data streams
- [ ] Proper cleanup of subscriptions

## Component Specifications

### Inputs
```typescript
// @Input() propertyName: Type; // Description
```

### Outputs
```typescript
// @Output() eventName = new EventEmitter<Type>(); // Description
```

### Dependencies
- Services: [List services needed]
- Child Components: [List child components]
- External Libraries: [Any third-party libraries]

### State Management
- Local state using signals/observables
- Store integration (if applicable)

## Styling
- Use Angular Material components (if applicable)
- Follow existing design system
- Use SCSS with BEM methodology
- Ensure mobile responsiveness

## Testing Requirements
- Unit tests for component logic
- Component tests for rendering
- Integration tests with services
- Accessibility tests

## Acceptance Criteria
- [ ] Component renders correctly
- [ ] All inputs/outputs work as expected
- [ ] Proper error handling
- [ ] Tests pass with > 80% coverage
- [ ] Accessibility audit passes
- [ ] Responsive on mobile/tablet/desktop

## Related Components
- [List related components or features]
```

## Example Prompts

See individual `.md` files in this directory for specific component prompts.
