import { codeToHtml } from "shiki";

interface CodeBlockServerProps {
	code: string;
	language?: string;
}

export async function CodeBlockServer({
	code,
	language = "javascript",
}: CodeBlockServerProps) {
	const html = await codeToHtml(code, {
		lang: language,
		theme: "vesper",
	});

	// eslint-disable-next-line react/no-dangerously-set-inner-html
	return (
		<div
			className="shiki vesper-dark overflow-x-auto"
			// eslint-disable-next-line react/no-dangerously-set-inner-html
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
