# Component: Button Component (Example)

## Context
- **Purpose**: Reusable button component with consistent styling and behavior
- **Location**: Shared module, used throughout the application
- **Parent Feature**: Shared/UI components

## Requirements

### Functional Requirements
- [ ] Support multiple button types (primary, secondary, danger, text)
- [ ] Support multiple sizes (small, medium, large)
- [ ] Support loading state with spinner
- [ ] Support disabled state
- [ ] Emit click events
- [ ] Support icon prefix and suffix

### UI/UX Requirements
- [ ] Responsive on all screen sizes
- [ ] Keyboard accessible (Enter/Space to activate)
- [ ] Focus indicator visible
- [ ] Loading state shows spinner and disables interaction
- [ ] Hover and active states
- [ ] Smooth transitions

### Technical Requirements
- [ ] TypeScript strict mode
- [ ] OnPush change detection strategy
- [ ] Proper type definitions for all inputs
- [ ] SCSS with BEM methodology
- [ ] Accessibility attributes (role, aria-label, etc.)

## Component Specifications

### Inputs
```typescript
@Input() type: 'primary' | 'secondary' | 'danger' | 'text' = 'primary';
@Input() size: 'small' | 'medium' | 'large' = 'medium';
@Input() loading = false;
@Input() disabled = false;
@Input() iconPrefix?: string; // Icon name
@Input() iconSuffix?: string; // Icon name
@Input() ariaLabel?: string;
```

### Outputs
```typescript
@Output() clicked = new EventEmitter<MouseEvent>();
```

### Dependencies
- No external dependencies (pure Angular)
- Optional: Icon component if using icons

### State Management
- Local component state only
- Reactive to input changes

## Styling

### Design Tokens
```scss
// Colors
$primary-color: #007bff;
$secondary-color: #6c757d;
$danger-color: #dc3545;

// Sizes
$btn-small-padding: 8px 16px;
$btn-medium-padding: 12px 24px;
$btn-large-padding: 16px 32px;

// Typography
$btn-small-font-size: 14px;
$btn-medium-font-size: 16px;
$btn-large-font-size: 18px;
```

### CSS Classes
```scss
.btn {
  &--primary { /* primary styles */ }
  &--secondary { /* secondary styles */ }
  &--danger { /* danger styles */ }
  &--text { /* text styles */ }
  
  &--small { /* small size */ }
  &--medium { /* medium size */ }
  &--large { /* large size */ }
  
  &--loading { /* loading state */ }
  &--disabled { /* disabled state */ }
}
```

## Testing Requirements

### Unit Tests
- [ ] Renders with default props
- [ ] Applies correct CSS classes for type
- [ ] Applies correct CSS classes for size
- [ ] Emits click event when clicked
- [ ] Does not emit click when disabled
- [ ] Does not emit click when loading
- [ ] Shows loading spinner when loading
- [ ] Renders icon prefix when provided
- [ ] Renders icon suffix when provided

### Accessibility Tests
- [ ] Has proper ARIA attributes
- [ ] Keyboard accessible (Enter/Space)
- [ ] Focus visible
- [ ] Screen reader friendly

### Coverage Goal
- Minimum 90% coverage

## Acceptance Criteria
- [ ] Button renders correctly with all type variants
- [ ] Button renders correctly with all size variants
- [ ] Loading state works correctly
- [ ] Disabled state prevents interaction
- [ ] Click events emit properly
- [ ] Icons display correctly
- [ ] All tests pass with >90% coverage
- [ ] Accessibility audit passes
- [ ] Works on mobile/tablet/desktop
- [ ] Keyboard navigation works

## Usage Examples

### Basic Usage
```typescript
<app-button (clicked)="handleClick()">
  Click Me
</app-button>
```

### With All Options
```typescript
<app-button
  type="primary"
  size="large"
  [loading]="isLoading"
  [disabled]="isDisabled"
  iconPrefix="save"
  ariaLabel="Save changes"
  (clicked)="save()">
  Save
</app-button>
```

### Loading State
```typescript
<app-button
  type="primary"
  [loading]="isSaving"
  (clicked)="save()">
  Save
</app-button>
```

## Related Components
- Icon component (for icon display)
- Loading spinner component
