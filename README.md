# Portico

An Angular application built using prompt-first development methodology.

## What is Prompt-First Development?

Prompt-first development is an approach where features and components are specified through structured prompts before implementation. This ensures:
- Clear requirements and specifications
- Consistent code architecture
- AI-assisted development with precise guidance
- Better collaboration through shared understanding
- Living documentation that evolves with the code

## Project Structure

```
portico/
├── prompts/              # Prompt templates and specifications
│   ├── components/       # Component creation prompts
│   ├── services/         # Service creation prompts
│   ├── features/         # Feature implementation prompts
│   ├── testing/          # Testing strategy prompts
│   ├── architecture/     # Architecture decision records
│   └── documentation/    # Documentation generation prompts
├── src/                  # Angular application source (to be created)
├── angular.json          # Angular CLI configuration
├── package.json          # NPM dependencies
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19 or higher)

### Installation

```bash
# Install dependencies
npm install

# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli
```

### Development Workflow

This project follows a prompt-first approach:

1. **Define Requirements**: Start by creating a prompt in the appropriate `prompts/` subdirectory
2. **Review Prompt**: Ensure the prompt captures all requirements and specifications
3. **Generate Code**: Use AI tools with the prompt to generate implementation
4. **Review & Refine**: Review generated code and refine prompts if needed
5. **Test**: Write and run tests based on test prompts
6. **Document**: Update documentation as features are implemented

### Using Prompts

1. Navigate to the appropriate prompts directory:
   - `prompts/components/` - For creating new components
   - `prompts/services/` - For creating new services
   - `prompts/features/` - For implementing complete features
   - `prompts/testing/` - For creating tests
   - `prompts/architecture/` - For architectural decisions

2. Review the README.md in each directory for templates and guidelines

3. Create a new prompt file using the provided templates

4. Use the prompt with AI coding assistants (GitHub Copilot, ChatGPT, etc.)

### Development Server

```bash
# Start the development server (once src/ is created)
npm start

# Navigate to http://localhost:4200/
```

### Building

```bash
# Build for production
npm run build

# Build artifacts will be stored in the `dist/` directory
```

### Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run e2e
```

### Linting

```bash
# Run linter
npm run lint
```

## Architecture Principles

This project follows these architectural principles:

1. **Feature-Based Organization**: Code organized by business features
2. **Smart/Presentational Pattern**: Separation of container and presentational components
3. **Reactive Programming**: RxJS observables for async operations
4. **Type Safety**: Strict TypeScript configuration
5. **OnPush Change Detection**: For optimal performance
6. **Modular Design**: Lazy-loaded feature modules
7. **Single Responsibility**: Each component/service has one clear purpose

## Coding Standards

- **TypeScript**: Strict mode enabled
- **Style**: SCSS with BEM methodology
- **Components**: OnPush change detection by default
- **Testing**: Minimum 80% code coverage
- **Accessibility**: WCAG 2.1 AA compliance
- **Documentation**: All public APIs documented

## Prompt-First Best Practices

1. **Start with Prompts**: Always create a prompt before coding
2. **Be Specific**: Include exact specifications in prompts
3. **Iterate**: Refine prompts based on results
4. **Version Control**: Keep prompts in sync with code
5. **Document Decisions**: Use architecture prompts for major decisions
6. **Review Together**: Review prompts as a team before implementation

## Contributing

1. Create a prompt file describing your feature/change
2. Get the prompt reviewed
3. Implement based on the approved prompt
4. Submit PR with reference to the prompt file
5. Update prompt if changes are needed

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Prompts Directory](./prompts/README.md)
- [Architecture Decisions](./prompts/architecture/README.md)

## License

ISC