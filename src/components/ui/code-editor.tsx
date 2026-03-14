import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sql } from "@codemirror/lang-sql";
import { yaml } from "@codemirror/lang-yaml";
import { bracketMatching, indentOnInput } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

type Language =
	| "javascript"
	| "typescript"
	| "python"
	| "rust"
	| "java"
	| "cpp"
	| "c"
	| "php"
	| "sql"
	| "json"
	| "html"
	| "css"
	| "yaml"
	| "markdown"
	| "go"
	| "ruby"
	| "shell";

type Theme = "dark" | "light" | "github" | "monokai" | "dracula";

interface CodeEditorProps {
	value?: string;
	onChange?: (value: string) => void;
	language?: Language;
	theme?: Theme;
	onLanguageChange?: (language: Language) => void;
	onThemeChange?: (theme: Theme) => void;
	placeholder?: string;
	maxLength?: number;
}

const languageExtensions: Record<
	Language,
	() => ReturnType<typeof javascript>
> = {
	javascript: () => javascript({ jsx: true }),
	typescript: () => javascript({ jsx: true, typescript: true }),
	python: () => python(),
	rust: () => rust(),
	java: () => java(),
	cpp: () => cpp(),
	c: () => cpp(),
	php: () => php(),
	sql: () => sql(),
	json: () => json(),
	html: () => html(),
	css: () => css(),
	yaml: () => yaml(),
	markdown: () => markdown(),
	go: () => javascript(), // fallback
	ruby: () => javascript(), // fallback
	shell: () => javascript(), // fallback
};

const languages: { value: Language; label: string }[] = [
	{ value: "javascript", label: "JavaScript" },
	{ value: "typescript", label: "TypeScript" },
	{ value: "python", label: "Python" },
	{ value: "rust", label: "Rust" },
	{ value: "java", label: "Java" },
	{ value: "cpp", label: "C++" },
	{ value: "c", label: "C" },
	{ value: "php", label: "PHP" },
	{ value: "sql", label: "SQL" },
	{ value: "json", label: "JSON" },
	{ value: "html", label: "HTML" },
	{ value: "css", label: "CSS" },
	{ value: "yaml", label: "YAML" },
	{ value: "markdown", label: "Markdown" },
	{ value: "go", label: "Go" },
	{ value: "ruby", label: "Ruby" },
	{ value: "shell", label: "Shell" },
];

const themes: { value: Theme; label: string }[] = [
	{ value: "dark", label: "Dark" },
	{ value: "github", label: "GitHub" },
	{ value: "monokai", label: "Monokai" },
	{ value: "dracula", label: "Dracula" },
	{ value: "light", label: "Light" },
];

const createTheme = (type: Theme) =>
	EditorView.theme({
		"&": {
			backgroundColor:
				type === "dark"
					? "#111111"
					: type === "light"
						? "#ffffff"
						: type === "github"
							? "#0d1117"
							: type === "monokai"
								? "#272822"
								: type === "dracula"
									? "#282a36"
									: "#111111",
			height: "100%",
		},
		".cm-content": {
			fontFamily: "var(--font-jetbrains-mono), monospace",
			fontSize: "14px",
			color: type === "light" ? "#24292e" : "#e6edf3",
		},
		".cm-gutters": {
			backgroundColor:
				type === "light"
					? "#f6f8fa"
					: type === "github"
						? "#010409"
						: type === "monokai"
							? "#3e3d32"
							: type === "dracula"
								? "#44475a"
								: "#111111",
			border: "none",
			color: type === "light" ? "#6e7781" : "#666666",
		},
		".cm-activeLineGutter": {
			backgroundColor: "transparent",
		},
		".cm-activeLine": {
			backgroundColor:
				type === "light" ? "rgba(0, 0, 0, 0.03)" : "rgba(255, 255, 255, 0.03)",
		},
		".cm-selectionBackground": {
			backgroundColor:
				type === "dark" || type === "monokai" || type === "dracula"
					? "rgba(34, 197, 94, 0.2) !important"
					: type === "github"
						? "rgba(56, 139, 253, 0.2) !important"
						: "rgba(4, 162, 255, 0.2) !important",
		},
		"&.cm-focused .cm-selectionBackground": {
			backgroundColor:
				type === "dark" || type === "monokai" || type === "dracula"
					? "rgba(34, 197, 94, 0.3) !important"
					: type === "github"
						? "rgba(56, 139, 253, 0.3) !important"
						: "rgba(4, 162, 255, 0.3) !important",
		},
		".cm-cursor": {
			borderLeftColor:
				type === "dark" || type === "monokai" || type === "dracula"
					? "#22c55e"
					: type === "github"
						? "#58a6ff"
						: "#0969da",
		},
		".cm-tooltip": {
			backgroundColor:
				type === "light"
					? "#ffffff"
					: type === "github"
						? "#161b22"
						: "#1a1a1a",
			border: "1px solid #2e2e2e",
		},
		".cm-tooltip-autocomplete": {
			"& > ul > li[aria-selected]": {
				backgroundColor: "#22c55e",
				color: "#000000",
			},
		},
	});

export function CodeEditor({
	value = "",
	onChange,
	language = "javascript",
	theme = "dark",
	onLanguageChange,
	onThemeChange,
	placeholder,
	maxLength = 2000,
}: CodeEditorProps) {
	const charCount = value.length;
	const isOverLimit = charCount > maxLength;
	const handleChange = useCallback(
		(val: string) => {
			const trimmedValue = val.slice(0, maxLength);
			onChange?.(trimmedValue);
		},
		[onChange, maxLength],
	);

	const currentTheme = createTheme(theme);

	const extensions = [
		currentTheme,
		indentOnInput(),
		bracketMatching(),
		closeBrackets(),
		autocompletion(),
		EditorView.lineWrapping,
		languageExtensions[language]?.() ?? javascript(),
	];

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center justify-between border-b border-border-primary bg-background px-4 py-2">
				<div className="flex items-center gap-3">
					<span className="h-3 w-3 rounded-full bg-red-accent" />
					<span className="h-3 w-3 rounded-full bg-amber-accent" />
					<span className="h-3 w-3 rounded-full bg-green-primary" />
				</div>
				<div className="flex items-center gap-2">
					<select
						value={theme}
						onChange={(e) => onThemeChange?.(e.target.value as Theme)}
						className="rounded-md border border-border-primary bg-background px-2 py-1 font-mono text-xs text-muted-foreground focus:border-green-primary focus:outline-none"
					>
						{themes.map((t) => (
							<option key={t.value} value={t.value}>
								{t.label}
							</option>
						))}
					</select>
					<select
						value={language}
						onChange={(e) => onLanguageChange?.(e.target.value as Language)}
						className="rounded-md border border-border-primary bg-background px-2 py-1 font-mono text-xs text-muted-foreground focus:border-green-primary focus:outline-none"
					>
						{languages.map((lang) => (
							<option key={lang.value} value={lang.value}>
								{lang.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex-1 overflow-hidden bg-input">
				<CodeMirror
					value={value}
					onChange={handleChange}
					extensions={extensions}
					placeholder={placeholder}
					theme="none"
					basicSetup={{
						lineNumbers: true,
						highlightActiveLineGutter: true,
						highlightActiveLine: true,
						foldGutter: true,
						autocompletion: true,
						closeBrackets: true,
						history: true,
						indentOnInput: true,
						bracketMatching: true,
					}}
					className="h-full"
				/>
			</div>
			<div className="flex items-center justify-end border-t border-border-primary bg-background px-3 py-1.5">
				<span
					className={twMerge(
						"font-mono text-xs",
						isOverLimit ? "text-red-accent" : "text-muted-foreground",
					)}
				>
					{charCount} / {maxLength}
				</span>
			</div>
		</div>
	);
}

export type { Language, Theme };
