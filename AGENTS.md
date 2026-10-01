# Bible Study Platform — Engineering Instructions

## Product

This repository contains a Christian Bible study application.

The application helps:

- individuals
- new believers
- couples
- families
- Bible study groups
- churches

study Scripture through personalized reading plans, Bible stories,
characters, themes, summaries, reflection questions and progress tracking.

## Core principles

1. Scripture is the source of truth.
2. AI must never invent Bible verses or Bible references.
3. Bible passages must come from an approved Bible provider.
4. AI may generate:
   - summaries
   - explanations
   - reflection questions
   - discussion questions
   - prayer prompts
   - recommendations
5. AI-generated Bible references must be validated before being shown.
6. Study content should be beginner-friendly unless another level is selected.
7. Components should support individual, couple, family and group study.

## Frontend stack

- React
- TypeScript
- React Router
- TanStack Query for server state
- Zustand for lightweight client state
- Zod for validation
- Tailwind CSS
- React Hook Form

Do not introduce another major library unless necessary.

## Architecture

Use feature-based architecture.

src/
  app/
  components/
  features/
  hooks/
  layouts/
  lib/
  services/
  types/

Feature modules should live under:

src/features/<feature-name>

Examples:

src/features/auth
src/features/onboarding
src/features/studies
src/features/bible
src/features/progress
src/features/groups
src/features/reminders
src/features/recommendations

## Component rules

Prefer small reusable components.

Avoid components larger than approximately 250 lines.

Separate:

- UI components
- data fetching
- business logic
- validation
- API access

Do not perform direct HTTP requests inside UI components.

Use services or hooks.

Example:

src/features/studies/api/
src/features/studies/hooks/
src/features/studies/components/
src/features/studies/types/

## TypeScript

Use strict TypeScript.

Avoid `any`.

Prefer:

type
interface
enum-like union types

for domain objects.

## API

All API requests should go through:

src/services/api

or feature-specific API modules.

Never hardcode backend URLs.

Use environment variables.

## Bible references

Represent Bible references structurally.

Example:

interface BibleReference {
  book: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
}

Never treat Bible references as arbitrary generated text where structured
data can be used.

## Study structure

Study plans should contain structured study days.

Each study day may contain:

- title
- Bible passages
- summary
- key verses
- lessons
- reflection questions
- discussion questions
- prayer prompt
- takeaway

## Testing

New business logic should have tests.

Critical flows requiring tests:

- onboarding
- recommendation filtering
- study completion
- progress calculation
- reminder scheduling
- Bible reference parsing

## UX

The application should feel calm, modern and easy to understand.

Avoid overcrowded dashboards.

Prioritize:

Continue Study
Today's Study
Progress
Recommended Studies

over secondary functionality.

## Accessibility

Use semantic HTML.

Buttons must be keyboard accessible.

Forms must have labels.

Maintain sufficient contrast.

## Development rule

Before implementing a feature:

1. understand the domain requirement
2. inspect existing components/types
3. reuse existing abstractions
4. implement the smallest maintainable solution
5. add tests where appropriate
6. run lint/typecheck/tests