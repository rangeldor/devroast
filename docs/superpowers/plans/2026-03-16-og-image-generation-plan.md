# OG Image Generation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gerar imagens OpenGraph automaticamente para resultados de roast usando Takumi

**Architecture:** Criar componente Takumi dedicado + route handler em /result/[id]/opengraph-image/route.tsx. Fontes locais em src/fonts/ carregadas via utilitário.

**Tech Stack:** @takumi-rs/image-response, Next.js Route Handlers

---

## File Structure

```
src/
├── app/result/[id]/
│   ├── page.tsx              (existing - no changes)
│   └── opengraph-image/
│       └── route.tsx         (NEW)
├── components/
│   └── og-image.tsx         (NEW)
├── lib/
│   └── fonts.ts             (NEW)
└── fonts/                    (NEW)
    ├── JetBrainsMono-Regular.woff2
    ├── JetBrainsMono-Bold.woff2
    └── Geist-Regular.woff2

next.config.ts                (MODIFY)
```

---

## Chunk 1: Setup & Dependencies

### Task 1: Install Takumi and configure Next.js

- [ ] **Step 1: Install @takumi-rs/image-response**

```bash
npm i @takumi-rs/image-response
```

- [ ] **Step 2: Read current next.config.ts**

```bash
cat next.config.ts
```

- [ ] **Step 3: Add serverExternalPackages config**

Modify next.config.ts to add:

```ts
export const config = {
  // ... existing config
  serverExternalPackages: ["@takumi-rs/core"],
};
```

- [ ] **Step 4: Commit**

```bash
git add next.config.ts package.json package-lock.json
git commit -m "chore: add @takumi-rs/image-response and configure externals"
```

---

## Chunk 2: Fonts Setup

### Task 2: Download and setup fonts

- [ ] **Step 1: Create src/fonts directory**

```bash
mkdir -p src/fonts
```

- [ ] **Step 2: Download JetBrains Mono Regular**

```bash
# Download from Google Fonts or JetBrains GitHub releases
curl -L -o src/fonts/JetBrainsMono-Regular.woff2 "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Regular.woff2"
```

- [ ] **Step 3: Download JetBrains Mono Bold**

```bash
curl -L -o src/fonts/JetBrainsMono-Bold.woff2 "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Bold.woff2"
```

- [ ] **Step 4: Download Geist Regular**

```bash
# Geist is a variable font, use Inter as a fallback (similar geometric sans)
# If you have access to Geist, use the Vercel CDN:
curl -L -o src/fonts/Geist-Regular.woff2 "https://cdn.jsdelivr.net/gh/vercel/geist-font@latest/fonts/Geist/Geist-Regular.woff2"

# Or use Inter from Google Fonts as fallback:
# curl -L -o src/fonts/Geist-Regular.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
```

- [ ] **Step 5: Verify files exist**

```bash
ls -la src/fonts/
```

- [ ] **Step 6: Create fonts utility**

Create `src/lib/fonts.ts`:

```ts
import JetBrainsMonoRegular from "@/fonts/JetBrainsMono-Regular.woff2";
import JetBrainsMonoBold from "@/fonts/JetBrainsMono-Bold.woff2";
import GeistRegular from "@/fonts/Geist-Regular.woff2";

export async function getOgFonts() {
  return [
    {
      name: "JetBrains Mono",
      data: JetBrainsMonoRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "JetBrains Mono",
      data: JetBrainsMonoBold,
      weight: 700,
      style: "normal",
    },
    {
      name: "Geist",
      data: GeistRegular,
      weight: 400,
      style: "normal",
    },
  ];
}
```

- [ ] **Step 7: Add font imports to tsconfig paths if needed**

Check if `@/fonts` alias works, otherwise add to tsconfig.json:

```json
{
  "compilerOptions": {
    "paths": {
      "@/fonts/*": ["./src/fonts/*"]
    }
  }
}
```

- [ ] **Step 8: Commit**

```bash
git add src/fonts src/lib/fonts.ts tsconfig.json
git commit -m "feat: add local fonts for OG image generation"
```

---

## Chunk 3: OgImage Component

### Task 3: Create OgImage component

- [ ] **Step 1: Create src/components/og-image.tsx**

```tsx
import { ImageResponse } from "@takumi-rs/image-response";

interface OgImageProps {
  score: number;
  roastText: string;
  language: string;
  lineCount: number;
}

function getVerdict(score: number): { text: string; color: string } {
  if (score <= 3) return { text: "needs_serious_help", color: "#EF4444" };
  if (score <= 6) return { text: "needs_work", color: "#F97316" };
  if (score <= 8) return { text: "not_bad", color: "#F59E0B" };
  return { text: "clean_code", color: "#22C55E" };
}

export function OgImage({ score, roastText, language, lineCount }: OgImageProps) {
  const verdict = getVerdict(score);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        backgroundColor: "#0A0A0A",
        padding: 64,
      }}
    >
      {/* Logo Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#10B981", fontSize: 24, fontWeight: 700 }}>
          &gt;
        </span>
        <span style={{ color: "#E5E5E5", fontSize: 20 }}>devroast</span>
      </div>

      {/* Score Row */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
        <span
          style={{
            color: "#F59E0B",
            fontSize: 160,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {score.toFixed(1)}
        </span>
        <span style={{ color: "#737373", fontSize: 56, lineHeight: 1 }}>
          /10
        </span>
      </div>

      {/* Verdict Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: verdict.color,
          }}
        />
        <span style={{ color: verdict.color, fontSize: 20 }}>
          {verdict.text}
        </span>
      </div>

      {/* Language Info */}
      <span
        style={{
          color: "#737373",
          fontSize: 16,
          fontFamily: "JetBrains Mono",
        }}
      >
        lang: {language} · {lineCount} lines
      </span>

      {/* Roast Quote */}
      <p
        style={{
          color: "#E5E5E5",
          fontSize: 22,
          textAlign: "center",
          lineHeight: 1.5,
          maxWidth: "100%",
        }}
      >
        "
        {roastText.length > 100
          ? roastText.slice(0, 100) + "..."
          : roastText}
        "
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/og-image.tsx
git commit -m "feat: create OgImage Takumi component"
```

---

## Chunk 4: Route Handler

### Task 4: Create opengraph-image route handler

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/app/result/[id]/opengraph-image
```

- [ ] **Step 2: Create route.tsx**

Create `src/app/result/[id]/opengraph-image/route.tsx`:

```tsx
import { ImageResponse } from "@takumi-rs/image-response";
import { serverCaller } from "@/lib/trpc/server";
import { OgImage } from "@/components/og-image";
import { getOgFonts } from "@/lib/fonts";

export const runtime = "nodejs";

export const alt = "DevRoast - Code Roast Results";
export const contentType = "image/webp";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const result = await serverCaller.roast.getById({ id });

    if (!result || !result.submission) {
      return new ImageResponse(
        <div
          style={{
            backgroundColor: "#0A0A0A",
            color: "#EF4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            fontSize: 32,
          }}
        >
          Roast Not Found
        </div>,
        { width: 1200, height: 630 }
      );
    }

    const lineCount = result.submission.code.split("\n").length;
    const fonts = await getOgFonts();

    return new ImageResponse(
      <OgImage
        score={result.score}
        roastText={result.roastText}
        language={result.submission.language}
        lineCount={lineCount}
      />,
      {
        width: 1200,
        height: 630,
        format: "webp",
        emoji: "twemoji",
        fonts,
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new ImageResponse(
      <div
        style={{
          backgroundColor: "#0A0A0A",
          color: "#EF4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          fontSize: 32,
        }}
      >
        Error Generating Roast
      </div>,
      { width: 1200, height: 630 }
    );
  }
}
```

- [ ] **Step 3: Test that the route compiles**

```bash
npm run build 2>&1 | head -50
```

- [ ] **Step 4: Commit**

```bash
git add src/app/result/[id]/opengraph-image/route.tsx
git commit -m "feat: add OG image route handler for roast results"
```

---

## Chunk 5: Testing & Verification

### Task 5: Test OG image generation

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Get a valid roast result ID from database**

```bash
# Query database for an existing roast result ID
psql -h localhost -p 5432 -U devroast -d devroast -t -c "SELECT id FROM roast_results LIMIT 1;"

# Or use drizzle studio:
# npx drizzle-kit studio
```

If no results, create a new roast via the UI or API to generate a test ID.

- [ ] **Step 3: Test OG image endpoint**

```bash
curl -I "http://localhost:3000/result/[VALID_ID]/opengraph-image"
```

Expected: Content-Type: image/webp

- [ ] **Step 4: Download and verify image**

```bash
curl -s "http://localhost:3000/result/[VALID_ID]/opengraph-image" -o test-og.webp
file test-og.webp
```

Expected: WebP image file

- [ ] **Step 5: Test error case**

```bash
curl -s "http://localhost:3000/result/invalid-id/opengraph-image" -o error-og.webp
file error-og.webp
```

Expected: WebP with "Roast Not Found"

- [ ] **Step 6: Test with different scores**

Create roasts with scores 2, 5, 7, 10 and verify verdict changes.

- [ ] **Step 7: Verify lint**

```bash
npm run lint
```

- [ ] **Step 8: Final commit**

```bash
git add .
git commit -m "feat: complete OG image generation for roast results"
```

---

## Notes

- Takumi requires Node.js runtime (not edge) due to native module
- Font files should be ~50KB each (WOFF2 compression)
- If font loading fails, the image will render with system fallback
- OG images are cached by Next.js, subsequent requests are fast
