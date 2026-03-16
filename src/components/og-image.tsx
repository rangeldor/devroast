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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#10B981", fontSize: 24, fontWeight: 700 }}>
          &gt;
        </span>
        <span style={{ color: "#E5E5E5", fontSize: 20 }}>devroast</span>
      </div>

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

      <span
        style={{
          color: "#737373",
          fontSize: 16,
          fontFamily: "JetBrains Mono",
        }}
      >
        lang: {language} · {lineCount} lines
      </span>

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
