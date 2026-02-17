# Getting Started with Prompt-First Development

This guide will help you get started with prompt-first development in the Portico project.

## What You'll Learn

- How to use the prompts directory
- How to create effective prompts
- How to generate code from prompts
- How to iterate on prompts and code

## Prerequisites

Before you start, make sure you have:
- [ ] Read the main [README.md](./README.md)
- [ ] Reviewed the [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [ ] Installed Node.js and npm
- [ ] Access to an AI coding assistant (GitHub Copilot, ChatGPT, etc.)

## The Prompt-First Workflow

### Step 1: Define What You Want to Build

Before writing any code, clearly define what you want to build. Ask yourself:
- What problem does this solve?
- Who will use this feature?
- What are the inputs and outputs?
- How does it fit into the existing application?

### Step 2: Choose the Right Prompt Type

Navigate to the appropriate directory in `prompts/`:

- **Building a UI component?** → `prompts/components/`
- **Creating a service or API integration?** → `prompts/services/`
- **Implementing a complete feature?** → `prompts/features/`
- **Writing tests?** → `prompts/testing/`
- **Making an architectural decision?** → `prompts/architecture/`
- **Creating documentation?** → `prompts/documentation/`

### Step 3: Create Your Prompt

1. Copy the template from the README in the chosen directory
2. Create a new `.md` file with a descriptive name
3. Fill in all sections of the template
4. Be specific and detailed

**Example**: Creating a user profile component

```markdown
# Component Name: UserProfileComponent

## Context
- **Purpose**: Display user profile information with edit capabilities
- **Location**: Used in the dashboard and settings pages
- **Parent Feature**: User management feature

## Requirements

### Functional Requirements
- [ ] Display user avatar, name, email, and bio
- [ ] Show edit button for profile owner
- [ ] Allow inline editing of bio
- [ ] Save changes to backend

### UI/UX Requirements
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading state while fetching data
- [ ] Error state if fetch fails
- [ ] Success message after save

... (continue with the template)
```

### Step 4: Review Your Prompt

Before using the prompt, review it:
- [ ] All requirements are clearly stated
- [ ] Technical specifications are complete
- [ ] Acceptance criteria are measurable
- [ ] Examples are included where helpful
- [ ] Dependencies are identified

Get feedback from team members if needed.

### Step 5: Generate Code with AI

Use your prompt with an AI coding assistant:

**With GitHub Copilot Chat**:
1. Open the prompt file in your editor
2. Open GitHub Copilot Chat
3. Paste the prompt or reference the file
4. Ask Copilot to generate the code

**With ChatGPT or Claude**:
1. Copy the entire prompt
2. Paste into the AI chat
3. Ask for code generation
4. Copy the generated code back to your project

**Example prompt to AI**:
```
I need you to generate an Angular component based on this specification:

[Paste your prompt here]

Please generate:
1. The component TypeScript file
2. The component template (HTML)
3. The component styles (SCSS)
4. The component test file
```

### Step 6: Review Generated Code

After the AI generates code:
1. Read through the code carefully
2. Check if it matches the requirements
3. Verify it follows project conventions
4. Test the functionality
5. Run linters and tests

### Step 7: Iterate if Needed

If the generated code doesn't meet expectations:
1. Identify what's wrong
2. Update your prompt to be more specific
3. Regenerate the code
4. Document what you learned

**Common issues and solutions**:
- **Too generic**: Add more specific requirements
- **Wrong patterns**: Specify architectural patterns to use
- **Missing features**: Add to requirements list
- **Wrong styling**: Specify design system or style guide

### Step 8: Commit Prompt and Code

Both the prompt and the generated code should be version controlled:

```bash
git add prompts/components/user-profile.md
git add src/app/features/user/components/user-profile/
git commit -m "feat: add user profile component with prompt"
```

## Example Workflow

Let's walk through a complete example: Creating a login form.

### 1. Create the prompt

File: `prompts/components/login-form.md`

```markdown
# Component Name: LoginFormComponent

## Context
- **Purpose**: User authentication form
- **Location**: /login route
- **Parent Feature**: Authentication feature

## Requirements

### Functional Requirements
- [ ] Email input field with validation
- [ ] Password input field with show/hide toggle
- [ ] Remember me checkbox
- [ ] Submit button
- [ ] Forgot password link
- [ ] Call AuthService.login() on submit

### UI/UX Requirements
- [ ] Disable submit while loading
- [ ] Show validation errors
- [ ] Show authentication errors
- [ ] Focus email field on load

### Technical Requirements
- [ ] Use reactive forms
- [ ] Email validator
- [ ] Password min length 8 characters
- [ ] OnPush change detection
- [ ] Proper form accessibility

## Component Specifications

### Inputs
None - standalone form

### Outputs
- @Output() loginSuccess = new EventEmitter<User>();
- @Output() loginError = new EventEmitter<string>();

### Dependencies
- AuthService for authentication
- Router for navigation after login

## Acceptance Criteria
- [ ] Form validates before submission
- [ ] Shows loading state during login
- [ ] Displays error messages appropriately
- [ ] Successfully authenticates user
- [ ] Redirects after successful login
```

### 2. Generate the component

Use AI to generate:
- Component class with reactive form
- Template with all form fields
- Styles matching design system
- Unit tests

### 3. Review and refine

- Check form validation logic
- Test the login flow
- Verify error handling
- Run tests

### 4. Commit everything

```bash
git add prompts/components/login-form.md
git add src/app/features/auth/components/login-form/
git commit -m "feat: add login form component"
```

## Tips for Better Prompts

### Be Specific
❌ "Create a form component"
✅ "Create a reactive form component for user login with email/password fields, validation, and authentication"

### Include Context
❌ "Add a button"
✅ "Add a submit button that calls the save method, is disabled when form is invalid, and shows a loading spinner during submission"

### Specify Patterns
❌ "Handle the data"
✅ "Use OnPush change detection and observables for data handling, following the reactive programming pattern"

### Define Success
❌ "Make it work"
✅ "The component should successfully submit valid data, display validation errors for invalid input, and show a success message after submission"

## Common Pitfalls

1. **Vague Requirements**: AI can't read your mind. Be explicit.
2. **Missing Context**: Explain how the feature fits into the app.
3. **No Examples**: Provide examples of similar features.
4. **Ignoring Conventions**: Specify project-specific patterns.
5. **Skipping Review**: Always review generated code.

## Advanced Techniques

### Chaining Prompts
Create multiple related prompts that reference each other:
- Feature prompt → Component prompts → Service prompts → Test prompts

### Prompt Libraries
Build a library of successful prompts for common patterns:
- CRUD components
- List/detail views
- Form validation patterns
- Error handling patterns

### Iterative Refinement
Use feedback to improve prompts:
1. Generate code
2. Identify issues
3. Update prompt
4. Regenerate
5. Document learnings

## Next Steps

1. Explore the templates in each prompts directory
2. Try creating a simple component with a prompt
3. Share your prompts with the team
4. Contribute improvements to templates

## Resources

- [Prompts Directory README](./prompts/README.md)
- [Project Structure Guide](./PROJECT_STRUCTURE.md)
- [Angular Documentation](https://angular.io/docs)

## Getting Help

- Review example prompts in the prompts directories
- Ask team members for prompt review
- Share successful prompts with the team
- Document lessons learned
