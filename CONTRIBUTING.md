# Contributing to My Bible Voice

Thank you for your interest in contributing to My Bible Voice! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/mybiblevoice.git`
3. Add upstream remote: `git remote add upstream https://github.com/mybiblevoice/mybiblevoice.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

```bash
npm install
npm run dev
```

## Code Standards

### TypeScript
- Enable strict mode
- No `any` types without justification
- Use interfaces/types for domain objects
- Document complex types with JSDoc

### Components
- Keep components under 250 lines
- One component per file
- Extract logic into custom hooks
- Use meaningful prop names

### Naming Conventions
```typescript
// Components: PascalCase
function BibleStudyCard() {}

// Functions/variables: camelCase
const fetchStudyPlan = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;

// Files: kebab-case
// use-study-plan.ts
// bible-study-card.tsx
```

## Commit Guidelines

Use conventional commits:

```
feat: add user progress tracking
fix: correct Bible verse validation
docs: update README with new features
style: format components with prettier
refactor: simplify state management
test: add tests for onboarding flow
chore: update dependencies
```

## Pull Request Process

1. **Before submitting:**
   - Run `npm run type-check`
   - Run `npm run lint:fix`
   - Run `npm run test`
   - Update tests if needed

2. **PR Description:**
   - Clear title following conventional commits
   - Explain what changed and why
   - Link related issues
   - Include screenshots for UI changes

3. **Review:**
   - Address all feedback
   - Keep commits clean and meaningful
   - Don't force-push after review

## Testing

All new features should include tests:

```bash
npm run test           # Run all tests
npm run test:ui        # View test UI
```

Test files should mirror source structure:
```
src/features/auth/hooks/useAuth.ts
src/features/auth/hooks/__tests__/useAuth.test.ts
```

## Performance Considerations

- ✅ Lazy load routes with React Router
- ✅ Memoize expensive computations
- ✅ Use image optimization
- ❌ Avoid creating functions in render
- ❌ Don't disable tree-shaking

## Documentation

Update docs when:
- Adding new features
- Changing API interfaces
- Adding environment variables
- Modifying project structure

## Feature Development Checklist

- [ ] Feature branch created
- [ ] Types/interfaces defined
- [ ] Components implemented
- [ ] Tests written
- [ ] Linting passes (`npm run lint:fix`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Tests pass (`npm run test`)
- [ ] README updated if needed
- [ ] PR created with description
- [ ] Code review feedback addressed

## Need Help?

- Check existing issues and discussions
- Ask in pull requests
- Review similar implementations
- Check TypeScript strict mode errors

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

