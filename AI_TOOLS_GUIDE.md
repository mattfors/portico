# AI Tools Integration Guide

Quick reference for using AI coding assistants with the prompt-first approach.

## Supported AI Tools

- **GitHub Copilot** - In-editor code generation
- **GitHub Copilot Chat** - Conversational coding assistant
- **ChatGPT** - Web-based AI assistant
- **Claude** - Web-based AI assistant
- **Other OpenAI API-compatible tools**

## Using Prompts with GitHub Copilot

### In VS Code

1. **Open the prompt file** you want to use
2. **Open Copilot Chat** (Ctrl/Cmd + I or Ctrl/Cmd + Shift + I)
3. **Reference the prompt**: Type `@workspace /new` and reference the prompt file
4. **Generate code**: Copilot will generate based on the prompt

**Example**:
```
@workspace /new Using prompts/components/button-component-example.md, 
create a reusable button component following all the specifications
```

### Inline Suggestions

1. Open a new TypeScript file
2. Start typing a comment with the prompt details
3. Copilot will suggest code based on the context

**Example**:
```typescript
// Create a Button component with the following:
// - Inputs: type (primary|secondary|danger), size (small|medium|large), loading, disabled
// - Output: clicked event
// - OnPush change detection
// - SCSS styling with BEM
```

## Using Prompts with ChatGPT/Claude

### Step 1: Set Context

Start your conversation with:

```
I'm working on an Angular 17 application using TypeScript strict mode.
The project follows these conventions:
- OnPush change detection by default
- SCSS with BEM methodology
- Reactive programming with RxJS
- TypeScript path aliases (@app, @core, @shared, @features)
```

### Step 2: Share the Prompt

Copy and paste your prompt file:

```
I need you to generate code based on this specification:

[Paste your prompt here]

Please generate:
1. The component TypeScript file
2. The component template (HTML)
3. The component styles (SCSS)
4. The component test file (Jasmine)
```

### Step 3: Review and Iterate

- Review the generated code
- Ask for modifications if needed
- Request explanations for unclear parts

**Example follow-up**:
```
Can you update the component to use Angular signals instead of 
traditional observables?
```

## Prompt Enhancement Tips

### For Better Code Generation

**Add to your prompts**:

1. **Specify versions**: "Angular 17", "TypeScript 5.2"
2. **Name conventions**: "Use camelCase for properties, PascalCase for classes"
3. **Import paths**: "Use path aliases like @shared/components"
4. **Style guide**: "Follow Angular style guide"

### For Better Test Generation

**Add to your prompts**:

1. **Test framework**: "Use Jasmine with Karma"
2. **Coverage goals**: "Aim for >85% coverage"
3. **Test patterns**: "Use AAA pattern (Arrange, Act, Assert)"
4. **Mock strategy**: "Mock all external dependencies"

## Example Workflows

### Workflow 1: Create a Component

**With GitHub Copilot Chat**:
```
1. Open prompts/components/my-component.md
2. Open Copilot Chat
3. Type: "@workspace /new Generate the component specified in 
   prompts/components/my-component.md. Include TypeScript, HTML, 
   SCSS, and spec files."
4. Review generated files
5. Apply to your codebase
```

**With ChatGPT**:
```
1. Copy prompt content
2. Open ChatGPT
3. Paste: "I'm building an Angular component. Here's the spec: 
   [paste prompt]"
4. Copy generated code
5. Create files in your project
6. Review and test
```

### Workflow 2: Create a Service

**With GitHub Copilot**:
```
1. Create service file: my.service.ts
2. Add comment at top with prompt reference
3. Let Copilot suggest implementation
4. Review and refine
```

**With Claude**:
```
1. Copy service prompt
2. Open Claude
3. Share prompt with context
4. Request specific method implementations
5. Iterate on edge cases
```

### Workflow 3: Create Tests

**With GitHub Copilot**:
```
1. Open the component/service file
2. Create corresponding .spec.ts file
3. Type: "// Test suite for [ComponentName]"
4. Copilot suggests tests based on implementation
5. Review coverage and add missing tests
```

**With ChatGPT**:
```
1. Share implementation code
2. Share test prompt
3. Request comprehensive test suite
4. Ask for specific test cases
5. Review and integrate
```

## Conversation Templates

### Initial Request Template

```
I'm working on an Angular [version] application.

Context:
- [Brief project description]
- [Relevant conventions]
- [Technology stack]

Task:
[Copy your prompt here]

Please generate:
1. [List what you need]
2. [In what format]
3. [Any specific requirements]
```

### Refinement Template

```
Thanks for the code! I need to make these adjustments:

1. [Adjustment 1]
2. [Adjustment 2]
3. [Adjustment 3]

Please update the code accordingly.
```

### Debugging Template

```
I'm getting this error:
[Paste error message]

In this code:
[Paste relevant code]

Based on my prompt:
[Reference to prompt or paste section]

How should I fix this?
```

## Best Practices

### DO ✅

- **Start with complete context**
- **Reference the prompt file explicitly**
- **Ask for explanations when unclear**
- **Request multiple alternatives if unsure**
- **Iterate to refine the output**
- **Verify generated code compiles and runs**

### DON'T ❌

- **Skip the prompt and ask directly** - Less consistent results
- **Accept code without review** - Always verify
- **Mix multiple prompts** - One prompt at a time
- **Forget to test** - Generated code needs testing
- **Ignore errors** - Address issues immediately

## Tool-Specific Tips

### GitHub Copilot

- **Use workspace context**: Reference files with @workspace
- **Inline comments**: Add comments for context-aware suggestions
- **Chat commands**: Use /explain, /fix, /test for specific tasks
- **Multi-file generation**: Request related files together

### ChatGPT

- **Use Code Interpreter**: For validating TypeScript syntax
- **Multi-turn conversations**: Build on previous responses
- **Ask for alternatives**: Get multiple implementation options
- **Export conversations**: Save useful prompts and responses

### Claude

- **Upload files**: Share existing code for context
- **Long conversations**: Claude handles extended context well
- **Detailed explanations**: Ask for reasoning behind choices
- **Structured output**: Request specific formats (JSON, Markdown)

## Troubleshooting

### Issue: Generated code doesn't match prompt

**Solution**: 
1. Be more specific in the prompt
2. Add examples to the prompt
3. Reference existing code patterns
4. Explicitly state what to avoid

### Issue: Code has errors

**Solution**:
1. Share the error with the AI tool
2. Request corrections
3. Verify Angular/TypeScript versions align
4. Check import paths are correct

### Issue: Code doesn't follow conventions

**Solution**:
1. Add conventions to prompt
2. Reference style guide explicitly
3. Show example of correct pattern
4. Request refactoring to match style

### Issue: Tests are insufficient

**Solution**:
1. Specify coverage requirements
2. List specific scenarios to test
3. Request edge cases explicitly
4. Ask for accessibility tests

## Advanced Techniques

### Chaining Prompts

Generate related code in sequence:

1. Start with feature prompt → Get structure
2. Use component prompts → Generate components
3. Use service prompts → Generate services
4. Use test prompts → Generate tests

### Prompt Composition

Combine multiple prompts for complex features:

```
I need to implement [Feature X] which requires:

1. Component A (see prompts/components/a.md)
2. Component B (see prompts/components/b.md)
3. Service C (see prompts/services/c.md)

Please generate these in the correct order with proper dependencies.
```

### Iterative Refinement

Build features incrementally:

1. **First pass**: Basic implementation
2. **Second pass**: Add error handling
3. **Third pass**: Add accessibility
4. **Fourth pass**: Optimize performance

## Resources

- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [ChatGPT Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Claude Documentation](https://docs.anthropic.com/claude/docs)

## Getting Help

- Review [GETTING_STARTED.md](./GETTING_STARTED.md) for prompt basics
- Check [TEMPLATES_INDEX.md](./prompts/TEMPLATES_INDEX.md) for prompt types
- Share successful AI interactions with the team
- Document patterns that work well
