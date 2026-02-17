# Testing Prompts

This directory contains prompts for generating tests.

## Template: Test Suite Creation

Use this template when creating tests:

```markdown
# Test Suite: [Component/Service/Feature Name]

## Context
- **Target**: [What is being tested]
- **Type**: [Unit/Integration/E2E]
- **Framework**: [Jasmine/Jest/Cypress]

## Test Coverage Requirements

### Must Test
- [ ] Happy path scenarios
- [ ] Edge cases
- [ ] Error conditions
- [ ] Boundary conditions
- [ ] State transitions

### Coverage Goals
- Statements: >80%
- Branches: >75%
- Functions: >80%
- Lines: >80%

## Test Specifications

### Unit Tests

#### Test Case 1: [Description]
```typescript
// it('should [expected behavior]', () => {
//   // Arrange
//   // Act
//   // Assert
// });
```

#### Test Case 2: [Description]
```typescript
// Test structure
```

### Integration Tests

#### Test Case 1: [Description]
- Setup requirements
- Dependencies to mock
- Expected outcomes

### E2E Tests

#### Test Case 1: [User flow description]
- Initial state
- User actions
- Expected results

## Mocking Strategy

### Services to Mock
- [Service 1]: [Mock behavior]
- [Service 2]: [Mock behavior]

### API Endpoints to Mock
- [Endpoint 1]: [Mock response]
- [Endpoint 2]: [Mock response]

## Test Data

### Fixtures
```typescript
// Define test data structures
```

### Factory Functions
- [Function to create test data]

## Accessibility Tests
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast
- [ ] Focus management

## Performance Tests
- [ ] Render time < [X]ms
- [ ] Response time < [X]ms
- [ ] Memory usage < [X]MB

## Acceptance Criteria
- [ ] All critical paths tested
- [ ] Coverage goals met
- [ ] All tests pass
- [ ] No flaky tests
- [ ] Tests run in < [X] seconds
- [ ] CI/CD integration working

## Related Tests
- [List related test suites]
```

## Best Practices

1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **One Assertion Per Test**: Keep tests focused
3. **Descriptive Names**: Test names should describe behavior
4. **Independent Tests**: Tests should not depend on each other
5. **Fast Execution**: Tests should run quickly
6. **Reliable**: No flaky tests

## Example Prompts

See individual `.md` files in this directory for specific testing prompts.
