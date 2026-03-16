# Leaderboard Page Implementation Design

**Date:** 2026-03-15  
**Status:** Approved

## Overview

Implement the full leaderboard page (`/leaderboard`) with server-side data fetching using tRPC, reusing the collapsible and syntax highlighting patterns from the homepage shame leaderboard.

## Requirements

- Display 20 results without pagination
- Use tRPC for data fetching (server-side)
- Reuse existing `LeaderboardRow` component with collapsible functionality
- Syntax highlighting with Shiki
- Show total roasts count and average score in header

## Implementation

### 1. tRPC Procedure

**File:** `src/server/routers/metrics.ts`

Add new procedure `getFullLeaderboard`:

```typescript
getFullLeaderboard: publicProcedure.query(async () => {
  const entries = await getLeaderboard(20, 0);
  const [stats] = await db.select({
    totalRoasts: count(),
    avgScore: sql<number>`round(${avg(roastResults.score)}::numeric, 1)`,
  }).from(roastResults);
  
  return { 
    entries, 
    totalRoasts: stats?.totalRoasts ?? 0, 
    avgScore: stats?.avgScore ?? 0 
  };
})
```

### 2. Page Component

**File:** `src/app/leaderboard/page.tsx`

Changes:
1. Convert from static to async component
2. Import `serverCaller` from `@/lib/trpc/server`
3. Fetch data: `const data = await serverCaller.metrics.getFullLeaderboard()`
4. Process entries with syntax highlighting (same pattern as `ShameLeaderboard`)
5. Render using existing UI structure and `LeaderboardRow` component

### 3. Data Flow

```
Page (async) 
  → serverCaller.metrics.getFullLeaderboard() 
    → getLeaderboard(20, 0) + stats query
      → Render with LeaderboardRow (collapsible + syntax highlight)
```

## Components

- **LeaderboardPage**: Main async page component
- **LeaderboardRow**: Reused from existing component (`src/components/leaderboard-row.tsx`)
- **Code highlighting**: Reuses `renderCodeHighlight()` from `@/db/queries/leaderboard`

## Acceptance Criteria

1. Page displays exactly 20 entries sorted by score (ascending - lowest first)
2. Each entry has collapsible code block with syntax highlighting
3. Header shows total roasts count and average score
4. Data is fetched server-side via tRPC
5. Page works without client-side JavaScript for initial render
