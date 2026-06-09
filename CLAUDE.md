# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NFL "Rewatchable Games" finder — ranks NFL games by rewatchability using offensive, defensive, and scenario (drama) metrics. SvelteKit 2 frontend consuming an external API (`API_URL` env var, Deno-based backend). Deployed to Cloudflare Workers.

## Commands

```bash
pnpm dev            # Dev server
pnpm build          # Production build (Cloudflare Workers)
pnpm preview        # Preview production build
pnpm check          # Type-check (svelte-check)
pnpm check:watch    # Type-check watch mode
pnpm lint           # Prettier check + ESLint
pnpm format         # Auto-format with Prettier
pnpm test           # Vitest single run
pnpm test:watch     # Vitest watch mode
pnpm test:ui        # Vitest with UI dashboard
```

Testing uses Vitest + @testing-library/svelte + jsdom. Setup file: `vitest-setup.js`.

## Architecture

**Stack:** SvelteKit 2, Svelte 5 (runes), TypeScript, Tailwind CSS 4, Vite 8, Cloudflare Workers adapter.

**Data flow:** Server load functions (`+page.server.ts`) fetch from external API → compute ratings via `src/rating.ts` → pass to pages → client-side filtering/sorting with Svelte 5 runes (`$state`, `$derived`).

**Key routes:**

- `/` — Home: fetches all 2025 weeks, grid of GameCards with search/filter/sort
- `/[year]` — Year view (2020–2025), same pattern as home
- `/[year]/game?game=shortName` — Game detail by shortName query param
- `/game/[game]` — Alternative game detail route by shortName path param

**Core modules:**

- `src/rating.ts` — Three rating functions: `computeOffensiveRating`, `computeDefensiveBigPlays`, `computeScenarioRating`. Total rating formula: `(offensive * 1.5) + (defensive * 0.5) + scenario`
- `src/types.ts` — `GameStats` interface (main domain type with efficiency, scenario, offense, defense sub-objects)
- `src/components/GameCard.svelte` — Game summary card (ratings display, localStorage "add to list", spoiler hover overlay)

**Environment:** `API_URL` set via `$env/static/private`. Cloudflare config in `wrangler.jsonc`.

## Conventions

- Svelte 5 runes: use `$state()`, `$derived()`, `$props()` — not legacy reactive stores
- Server-side data fetching only (no client-side fetch calls)
- Tailwind utility classes for styling (responsive grid: 1→2→4 columns)
- ESLint + Prettier for code style
