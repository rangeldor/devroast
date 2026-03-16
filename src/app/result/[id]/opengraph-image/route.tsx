import { ImageResponse } from "@takumi-rs/image-response";
import { serverCaller } from "@/lib/trpc/server";
import { OgImage } from "@/components/og-image";
import { getOgFonts } from "@/lib/fonts";

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
