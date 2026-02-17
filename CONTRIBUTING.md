# Contributing to Portico

Thank you for your interest in contributing to Portico! This project uses a prompt-first development approach, which means all features start with well-defined prompts before code is written.

## Code of Conduct

Be respectful, inclusive, and collaborative.

## How to Contribute

### 1. Find or Create an Issue

- Check existing issues for something to work on
- Create a new issue if you have an idea
- Discuss the approach before starting work

### 2. Create a Prompt

Before writing any code, create a prompt that defines what you're building:

1. Navigate to the appropriate directory in `prompts/`:
   - `prompts/components/` for components
   - `prompts/services/` for services
   - `prompts/features/` for complete features
   - `prompts/architecture/` for architectural decisions

2. Copy the template from the README in that directory

3. Fill in all sections with specific details

4. Name your file descriptively: `feature-name.md`

### 3. Get Prompt Reviewed

- Create a pull request with just the prompt file
- Title: "Prompt: [Feature Name]"
- Request review from maintainers
- Address any feedback

### 4. Implement Based on Prompt

Once the prompt is approved:

1. Use the prompt with AI tools to generate code
2. Review and refine the generated code
3. Follow project conventions and standards
4. Write tests (>80% coverage)
5. Update documentation

### 5. Submit Pull Request

**PR Title Format**:
- `feat: add user login component`
- `fix: correct validation in signup form`
- `docs: update API documentation`
- `refactor: simplify dashboard service`

**PR Description**:
- Link to the prompt file
- Link to related issue
- Describe what was implemented
- List any deviations from the prompt
- Include screenshots for UI changes
- Note any breaking changes

**PR Checklist**:
- [ ] Prompt file exists and is approved
- [ ] Code follows project conventions
- [ ] Tests written and passing (>80% coverage)
- [ ] Linter passes
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Reviewed own code

## Development Setup

```bash
# Clone the repository
git clone https://github.com/mattfors/portico.git
cd portico

# Install dependencies
npm install

# Start development server (once src/ exists)
npm start

# Run tests
npm test

# Run linter
npm run lint
```

## Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed information about the project organization.

## Coding Standards

### TypeScript

- Use strict mode (already configured)
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- No `any` types (use `unknown` if necessary)

### Angular

- Use OnPush change detection by default
- Unsubscribe from observables in ngOnDestroy
- Prefer async pipe over manual subscription
- Keep components small (<300 lines)
- Keep business logic in services

### Styling

- Use SCSS
- Follow BEM methodology
- Use design tokens/variables
- Mobile-first responsive design

### Testing

- Write tests before or with code (TDD encouraged)
- Unit tests for components and services
- Integration tests for features
- E2E tests for critical paths
- Minimum 80% coverage

### Documentation

- Document all public APIs
- Use JSDoc comments
- Update README when adding features
- Keep prompt files up to date

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples**:
```
feat(auth): add login component

Implements user login with email and password validation.
Based on prompts/components/login-form.md

Closes #123
```

```
fix(dashboard): correct statistics calculation

The trend calculation was using wrong date range.
Now correctly compares current month to previous month.

Fixes #456
```

## Review Process

### For Prompts

1. Check completeness of all sections
2. Verify requirements are clear and testable
3. Ensure technical specifications are detailed
4. Confirm acceptance criteria are measurable
5. Approve if everything looks good

### For Code

1. Verify implementation matches approved prompt
2. Check code quality and conventions
3. Review tests for completeness
4. Test functionality locally
5. Check documentation updates
6. Approve or request changes

## Release Process

1. Version bump following [Semantic Versioning](https://semver.org/)
2. Update CHANGELOG.md
3. Create release notes
4. Tag release
5. Deploy to staging
6. Run smoke tests
7. Deploy to production

## Getting Help

- **Questions**: Open a discussion on GitHub
- **Bugs**: Create an issue with reproduction steps
- **Features**: Create an issue with a prompt
- **Prompt Help**: See [GETTING_STARTED.md](./GETTING_STARTED.md)

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

Thank you for contributing to Portico!
