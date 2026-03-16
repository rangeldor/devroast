# OpenGraph Image Generation - Design

**Date:** 2026-03-16  
**Status:** Draft  
**Topic:** OG Image Generation for Roast Results

## Overview

Gerar imagens OpenGraph automaticamente para compartilhamento de resultados de roast. Quando um usuário compartilha o link de um resultado (ex: `/result/[id]`), a imagem será exibida como preview em redes sociais e messengers.

## Goals

- Imagem OG automaticamente gerada para cada resultado de roast
- Design baseado no frame do Pencil (Screen 4 - OG Image)
- Usa Takumi (@takumi-rs/image-response) para renderização

## Design Reference

O design foi definido no arquivo `devroast.pen` (frame "Screen 4 - OG Image"):

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     > devroast                              (logo, green)   │
│                                                             │
│                     3.5                    (score, amber)  │
│                    /10                                    │
│                                                             │
│              ● needs_serious_help         (verdict, red)   │
│                                                             │
│            lang: javascript · 7 lines      (lang info)     │
│                                                             │
│        "this code was written during a       (quote)       │
│                 power outage..."                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
Dimensions: 1200x630
Background: #0A0A0A (dark)
```

### Verdict Mapping (by score range)

| Score | Verdict | Color |
|-------|---------|-------|
| 1-3 | needs_serious_help | #EF4444 (red) |
| 4-6 | needs_work | #F97316 (orange) |
| 7-8 | not_bad | #F59E0B (amber) |
| 9-10 | clean_code | #22C55E (green) |

## Architecture

```
src/
├── app/result/[id]/
│   ├── page.tsx              (existing)
│   └── opengraph-image/
│       └── route.tsx         (NEW - OG image endpoint)
├── components/
│   └── og-image.tsx          (NEW - Takumi component)
└── fonts/                    (NEW - local fonts)
    ├── JetBrainsMono-Regular.woff2
    ├── JetBrainsMono-Bold.woff2
    └── Geist-Regular.woff2
```

## Implementation Details

### 1. Dependencies

Install Takumi:
```bash
npm i @takumi-rs/image-response
```

Configure Next.js to externalize the native package:
```ts
// next.config.ts
export const config = {
  serverExternalPackages: ["@takumi-rs/core"],
};
```

### 2. OgImage Component

```tsx
// src/components/og-image.tsx
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
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      backgroundColor: "#0A0A0A",
      padding: 64,
    }}>
      {/* Logo Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#10B981", fontSize: 24, fontWeight: 700 }}>&gt;</span>
        <span style={{ color: "#E5E5E5", fontSize: 20 }}>devroast</span>
      </div>
      
      {/* Score Row */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
        <span style={{ color: "#F59E0B", fontSize: 160, fontWeight: 900, lineHeight: 1 }}>
          {score.toFixed(1)}
        </span>
        <span style={{ color: "#737373", fontSize: 56, lineHeight: 1 }}>/10</span>
      </div>
      
      {/* Verdict Row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: verdict.color }} />
        <span style={{ color: verdict.color, fontSize: 20 }}>{verdict.text}</span>
      </div>
      
      {/* Language Info */}
      <span style={{ color: "#737373", fontSize: 16, fontFamily: "JetBrains Mono" }}>
        lang: {language} · {lineCount} lines
      </span>
      
      {/* Roast Quote */}
      <p style={{
        color: "#E5E5E5",
        fontSize: 22,
        textAlign: "center",
        lineHeight: 1.5,
        maxWidth: "100%",
      }}>
        "{roastText.length > 100 ? roastText.slice(0, 100) + "..." : roastText}"
      </p>
    </div>
  );
}
```

### 3. Route Handler

```tsx
// src/app/result/[id]/opengraph-image/route.tsx
import { ImageResponse } from "@takumi-rs/image-response";
import { serverCaller } from "@/lib/trpc/server";
import { OgImage } from "@/components/og-image";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const result = await serverCaller.roast.getById({ id });
    
    if (!result || !result.submission) {
      return new ImageResponse(
        <div style={{ backgroundColor: "#0A0A0A", color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 32 }}>
          Roast Not Found
        </div>,
        { width: 1200, height: 630 }
      );
    }
    
    const lineCount = result.submission.code.split("\n").length;
    
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
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response("Internal Error", { status: 500 });
  }
}
```

### 4. Fonts

Baixar as seguintes fontes para `src/fonts/`:

- JetBrains Mono Regular: https://github.com/JetBrains/JetBrainsMono/releases
- JetBrains Mono Bold: mesma fonte, weight 700
- Geist Regular: https://github.com/vercel/geist-font

Carregar no componente:
```tsx
const fonts = [
  {
    name: "JetBrains Mono",
    data: await fetch("https://.../JetBrainsMono-Regular.woff2").then(r => r.arrayBuffer()),
    weight: 400,
    style: "normal",
  },
  // ... outros pesos
];

// Passar fonts no ImageResponse
new ImageResponse(<OgImage ... />, { width: 1200, height: 630, fonts });
```

## Testing

- Testar geração de imagens para diferentes scores (1, 5, 7, 10)
- Testar resultado não encontrado (404)
- Verificar preview em: https://socialsharepreview.com/
- Verificar em: LinkedIn, Twitter/X, Discord

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Result not found | Return "Roast Not Found" image |
| Database error | Return 500 error |
| Font load failure | Use system fallback |
