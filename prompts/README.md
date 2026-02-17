# Prompts Directory

This directory contains AI prompts and templates for building the Angular application using a prompt-first development approach.

## What is Prompt-First Development?

Prompt-first development is an approach where you define your requirements, features, and components using structured prompts before writing code. This ensures clear specifications and enables AI-assisted code generation that aligns with your architecture and standards.

## Directory Structure

```
prompts/
├── components/     # Prompts for creating Angular components
├── services/       # Prompts for creating Angular services
├── features/       # Prompts for full feature implementation
├── testing/        # Prompts for test creation and scenarios
├── architecture/   # Prompts for architectural decisions
└── documentation/  # Prompts for generating documentation
```

## How to Use This Directory

1. **Before Writing Code**: Create a prompt file describing what you want to build
2. **Review and Refine**: Review the prompt to ensure it captures all requirements
3. **Use with AI Tools**: Use these prompts with AI coding assistants (GitHub Copilot, ChatGPT, etc.)
4. **Iterate**: Refine prompts based on generated code quality

## Prompt Template Structure

Each prompt file should follow this structure:

```markdown
# [Component/Feature Name]

## Context
- Brief description of what this is for
- Where it fits in the application

## Requirements
- List of functional requirements
- List of technical requirements

## Specifications
- Detailed technical specifications
- Dependencies and integrations
- State management needs

## Acceptance Criteria
- How to verify the implementation is correct
- Edge cases to consider

## Related Prompts
- Links to related prompts or features
```

## Best Practices

1. **Be Specific**: Include exact names, paths, and specifications
2. **Include Context**: Reference existing code and patterns
3. **Define Standards**: Specify coding standards and patterns to follow
4. **Version Control**: Keep prompts in sync with code changes
5. **Iterate**: Update prompts when requirements change

## Examples

See the subdirectories for example prompts and templates.
