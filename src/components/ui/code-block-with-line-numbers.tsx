import { codeToHtml } from "shiki";

interface CodeBlockWithLineNumbersProps {
	code: string;
	language?: string;
}

export async function CodeBlockWithLineNumbers({
	code,
	language = "javascript",
}: CodeBlockWithLineNumbersProps) {
	const html = await codeToHtml(code, {
		lang: language,
		theme: "vesper",
	});

	const lines = code.split("\n");

	return (
		<div className="flex">
			<div className="flex flex-col gap-1 border-r border-border-primary bg-surface px-3 py-4 text-right font-mono text-xs text-text-tertiary">
				{lines.map((_, i) => (
					<span key={i}>{i + 1}</span>
				))}
			</div>
			<div
				className="shiki vesper-dark flex-1 overflow-x-auto px-4 py-4 font-mono text-xs"
				// eslint-disable-next-line react/no-dangerously-set-inner-html
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}
