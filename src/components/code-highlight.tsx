"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeHighlightProps {
	code: string;
	language: string;
	className?: string;
}

export function CodeHighlight({
	code,
	language,
	className = "",
}: CodeHighlightProps) {
	const [html, setHtml] = useState<string>("");

	useEffect(() => {
		async function highlight() {
			const highlighted = await codeToHtml(code, {
				lang: language,
				theme: "vesper",
			});
			setHtml(highlighted);
		}
		highlight();
	}, [code, language]);

	if (!html) {
		return (
			<pre className={`shiki vesper-dark font-mono text-xs ${className}`}>
				<code>{code}</code>
			</pre>
		);
	}

	return (
		<div
			className={`shiki vesper-dark font-mono text-xs ${className}`}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
