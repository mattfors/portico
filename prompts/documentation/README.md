# Documentation Prompts

This directory contains prompts for generating documentation.

## Template: Feature Documentation

Use this template for documenting features:

```markdown
# [Feature Name]

## Overview
Brief description of what this feature does and why it exists.

## User Guide

### Getting Started
Step-by-step guide for users to start using this feature.

### Key Features
- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description

### How to Use

#### Task 1: [Task Name]
1. Step 1
2. Step 2
3. Step 3

#### Task 2: [Task Name]
1. Step 1
2. Step 2
3. Step 3

### Common Scenarios
- **Scenario 1**: [How to handle]
- **Scenario 2**: [How to handle]

## Developer Guide

### Architecture
Overview of how this feature is implemented.

### Key Components
- **ComponentName**: Purpose and responsibilities
- **ServiceName**: Purpose and responsibilities

### API Reference
```typescript
// Key interfaces and types
```

### Integration Points
- Where this feature connects with other parts of the app
- Dependencies and requirements

### Configuration
```typescript
// Configuration options
```

## Testing

### How to Test
Instructions for testing this feature.

### Test Coverage
- Unit tests location
- Integration tests location
- E2E tests location

## Troubleshooting

### Common Issues

#### Issue 1: [Description]
**Symptoms**: [What you see]
**Cause**: [Why it happens]
**Solution**: [How to fix]

#### Issue 2: [Description]
**Symptoms**: [What you see]
**Cause**: [Why it happens]
**Solution**: [How to fix]

### FAQ
1. **Q**: [Question]
   **A**: [Answer]

2. **Q**: [Question]
   **A**: [Answer]

## Maintenance

### Future Improvements
- [ ] Improvement 1
- [ ] Improvement 2

### Known Limitations
- Limitation 1
- Limitation 2

## References
- [Related documentation]
- [External resources]
```

## Template: API Documentation

Use this template for API documentation:

```markdown
# API Documentation: [Service/Module Name]

## Overview
Brief description of this API layer.

## Endpoints

### GET /api/[endpoint]

**Description**: [What this endpoint does]

**Parameters**:
- `param1` (string, required): Description
- `param2` (number, optional): Description

**Response**:
```typescript
interface Response {
  // Response type
}
```

**Example**:
```typescript
// Usage example
```

**Errors**:
- `400`: [Error description]
- `404`: [Error description]
- `500`: [Error description]

### POST /api/[endpoint]

[Similar structure as above]

## Data Models

### Model 1
```typescript
interface Model1 {
  // Properties
}
```

### Model 2
```typescript
interface Model2 {
  // Properties
}
```

## Authentication
Description of authentication requirements.

## Rate Limiting
Description of rate limits, if applicable.

## Examples

### Example 1: [Use Case]
```typescript
// Complete example
```

### Example 2: [Use Case]
```typescript
// Complete example
```

## Error Handling
How errors are structured and handled.

## Changelog
- **v1.1.0**: [Changes]
- **v1.0.0**: Initial release
```

## Template: Component Documentation

Use this template for component documentation:

```markdown
# Component: [ComponentName]

## Description
Brief description of what this component does.

## Usage

### Basic Usage
```typescript
<app-component-name
  [input1]="value1"
  (output1)="handler($event)">
</app-component-name>
```

### With All Options
```typescript
<app-component-name
  [input1]="value1"
  [input2]="value2"
  [config]="config"
  (output1)="handler($event)"
  (output2)="handler($event)">
  <!-- Content projection -->
</app-component-name>
```

## API

### Inputs
- **input1**: `Type` - Description
- **input2**: `Type` - Description (Default: defaultValue)

### Outputs
- **output1**: `EventEmitter<Type>` - Description
- **output2**: `EventEmitter<Type>` - Description

### Methods
Public methods that can be called via template reference or ViewChild.

## Styling

### CSS Classes
- `.class-name`: Description
- `.class-name--modifier`: Description

### CSS Variables
- `--variable-name`: Description (Default: value)

### Theming
How to customize the component appearance.

## Accessibility
- Keyboard support
- Screen reader support
- ARIA attributes used

## Examples

### Example 1: [Scenario]
[Description and code]

### Example 2: [Scenario]
[Description and code]

## Related Components
- [ComponentA]: Related functionality
- [ComponentB]: Can be used together
```

## Best Practices

1. **Keep It Updated**: Update docs when code changes
2. **Use Examples**: Include practical examples
3. **Be Clear**: Write for developers who don't know the code
4. **Include Visuals**: Screenshots, diagrams when helpful
5. **Link Related Docs**: Create connections between related documentation

## Example Prompts

See individual `.md` files in this directory for specific documentation prompts.
