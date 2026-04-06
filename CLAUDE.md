# CoLive SG - Project CLAUDE.md

## Project Overview

**Stack:** Vite 8, React 19, TypeScript, React Router, Supabase (auth + DB), Tailwind CSS

**Architecture:** SPA with client-side routing. Server components not applicable.

## Critical Rules

### Database

- All queries use Supabase client with RLS enabled — never bypass RLS
- Use `select()` with explicit column lists, not `select('*')`
- All user-facing queries must include `.limit()` to prevent unbounded results

### Authentication

- Use `@supabase/supabase-js` createClient for browser and createClient for server
- Protected routes check user authentication state client-side

### Code Style

- No emojis in code or comments
- Immutable patterns only — spread operator, never mutate
- Function components with explicit prop interfaces, no `React.FC`
- Client Components: `'use client'` at top, minimal — extract logic to hooks
- Prefer Zod schemas for all input validation (forms, env vars)

## File Structure

```
src/
  components/
    ui/              # Radix UI based components (shadcn/ui style)
    home.tsx         # Main tab-based view
    MapView.tsx      # Leaflet map with property markers
    ExploreView.tsx  # Property listing with filters
    InterestForm.tsx # Lead capture form
  hooks/             # Custom React hooks
  lib/
    utils.ts         # Tailwind merge utilities
  data/
    properties.ts    # Mock property data
```

## Key Patterns

### Custom Hooks Pattern

```typescript
function useTabNavigation(initialTab: Tab = "map") {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab)
  }, [])

  return { activeTab, setActiveTab, handleTabChange }
}
```

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

## Environment Variables

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Testing Strategy

Unit tests for custom hooks and utilities. E2E tests with Playwright for critical flows.

## Git Workflow

- `feat:` new features, `fix:` bug fixes, `refactor:` code changes
- Feature branches from `main`, PRs required