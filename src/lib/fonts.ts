import { readFile } from "fs/promises";
import { join } from "path";

export async function getOgFonts() {
	const basePath = join(process.cwd(), "src", "fonts");

	const [jetbrainsMonoRegular, jetbrainsMonoBold, geistRegular] =
		await Promise.all([
			readFile(join(basePath, "JetBrainsMono-Regular.woff2")),
			readFile(join(basePath, "JetBrainsMono-Bold.woff2")),
			readFile(join(basePath, "Geist-Regular.woff2")),
		]);

	return [
		{
			name: "JetBrains Mono",
			data: jetbrainsMonoRegular.buffer,
			weight: 400,
			style: "normal",
		},
		{
			name: "JetBrains Mono",
			data: jetbrainsMonoBold.buffer,
			weight: 700,
			style: "normal",
		},
		{
			name: "Geist",
			data: geistRegular.buffer,
			weight: 400,
			style: "normal",
		},
	] as const;
}
