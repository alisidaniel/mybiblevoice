# My Bible Voice

A modern, production-ready Christian Bible study platform built with React, TypeScript, and Vite.

## Overview

My Bible Voice helps individuals, families, Bible study groups, and churches engage with Scripture through:

- Personalized reading plans
- Bible stories and themes
- AI-generated summaries and reflection questions (validated against approved Bible providers)
- Progress tracking
- Community study features

**Core Principle**: Scripture is the source of truth. AI never invents Bible verses or references.

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type safety and developer experience
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Zustand** - Lightweight client state
- **React Hook Form** - Form management
- **Zod** - TypeScript-first validation
- **Tailwind CSS** - Utility-first styling

### Developer Tools
- **ESLint** - Code quality
- **Vitest** - Unit testing
- **TypeScript** - Strict type checking

## Project Structure

```
src/
├── app/                          # Global state & configuration
├── components/
│   ├── common/                   # Reusable UI components
│   └── layout/                   # Layout components
├── features/                     # Feature-based modules
│   ├── auth/
│   ├── onboarding/
│   ├── studies/
│   ├── bible/
│   ├── progress/
│   ├── groups/
│   ├── reminders/
│   └── recommendations/
├── hooks/                        # Custom React hooks
├── layouts/                      # Page layouts
├── lib/                          # Shared utilities & helpers
├── pages/                        # Page components
├── services/
│   └── api/                      # API service layer
├── types/                        # TypeScript definitions
├── styles/                       # Global styles
├── assets/                       # Images, icons, static files
├── App.tsx                       # Root component
└── main.tsx                      # Entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Runs the development server with HMR at `http://localhost:5173`

### Build

```bash
npm run build
```

Compiles TypeScript and optimizes for production.

### Preview

```bash
npm run preview
```

Locally preview the production build.

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Test UI
npm run test:ui
```

## Architecture Principles

### Feature-Based Organization
Features live under `src/features/<feature-name>` with their own:
- `api/` - API calls
- `hooks/` - Custom hooks
- `components/` - Feature components
- `types/` - Feature types
- `store/` - Zustand stores

### Component Rules
- ✅ Small, reusable components (< 250 lines)
- ✅ Separate concerns: UI, data fetching, business logic
- ✅ Use services or hooks for HTTP requests
- ❌ No direct HTTP calls in components

### TypeScript
- Strict TypeScript mode enabled
- No `any` type
- Prefer `type`/`interface` for domain objects
- Structural Bible references:
  ```typescript
  interface BibleReference {
    book: string;
    chapter: number;
    verseStart?: number;
    verseEnd?: number;
  }
  ```

### State Management
- **Server State**: TanStack Query for API data
- **Client State**: Zustand for UI state
- **Form State**: React Hook Form

### API Integration
- All requests through `src/services/api`
- Environment variables for URLs (no hardcoding)
- Zod validation for responses

## Study Structure

Each study plan contains structured study days with:
- Title
- Bible passages (structured references)
- Summary
- Key verses
- Lessons
- Reflection questions
- Discussion questions
- Prayer prompt
- Takeaway

## Testing Strategy

Tests should cover:
- ✅ Onboarding flows
- ✅ Recommendation filtering
- ✅ Study completion
- ✅ Progress calculation
- ✅ Reminder scheduling
- ✅ Bible reference parsing

## UX Guidelines

- Calm, modern interface
- Avoid overcrowded dashboards
- Prioritize:
  - Continue Study
  - Today's Study
  - Progress
  - Recommended Studies

## Accessibility

- Semantic HTML
- Keyboard accessible buttons
- Form labels required
- Sufficient contrast ratios
- WCAG 2.1 AA compliance

## Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=https://api.mybiblevoice.com
VITE_BIBLE_PROVIDER_API_KEY=your_api_key
```

## Development Workflow

1. **Understand** domain requirement
2. **Inspect** existing components/types
3. **Reuse** existing abstractions
4. **Implement** smallest maintainable solution
5. **Add tests** where appropriate
6. **Run** lint/typecheck/tests before committing

## Performance

- Code splitting with React Router
- Image optimization (use Vite's image import)
- Tree-shaking enabled
- Minification in production build
- No unused dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the development workflow above
2. Maintain TypeScript strict mode
3. Add tests for new features
4. Run `npm run lint:fix` before committing
5. Keep components under 250 lines

## License

MIT

## Support

For issues or questions about the platform, please file an issue on the repository.

---

**Last Updated**: September 2026
**Version**: 1.0.0
