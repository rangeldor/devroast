# DevRoast - Project Guidelines

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + tailwind-variants
- Biome (lint/format)
- base-ui (interactive components)
- Shiki (syntax highlighting)

## Global Patterns

### Dark Mode
- Forced dark mode via `className="dark"` in layout
- Use CSS variables from `src/app/globals.css`

### Components
- Composition pattern: `Root`, `Header`, `Title`, etc.
- Named exports only
- `forwardRef` for DOM exposure
- `tv()` + `twMerge()` for styling

### Fonts
- JetBrains Mono (`font-mono`)
- System sans for UI text

### Commands
```bash
npm run dev    # Development
npm run lint   # Lint check
npm run format # Format code
```
