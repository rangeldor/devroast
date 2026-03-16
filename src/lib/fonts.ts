import GeistRegular from "@/fonts/Geist-Regular.woff2";
import JetBrainsMonoBold from "@/fonts/JetBrainsMono-Bold.woff2";
import JetBrainsMonoRegular from "@/fonts/JetBrainsMono-Regular.woff2";

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
