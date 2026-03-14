import type { Metadata } from "next";
import { AnalysisCardRoot } from "@/components/ui/analysis-card";
import { Button } from "@/components/ui/button";
import { CodeBlockHeader, CodeBlockRoot } from "@/components/ui/code-block";
import { CodeBlockWithLineNumbers } from "@/components/ui/code-block-with-line-numbers";
import { DiffLineRoot, type DiffLineVariant } from "@/components/ui/diff-line";
import { ScoreRingRoot } from "@/components/ui/score-ring";
import { StatusBadgeRoot } from "@/components/ui/status-badge";

export const metadata: Metadata = {
	title: "Roast Results | DevRoast",
	description: "Your code has been roasted",
};

const staticRoastData: {
	score: number;
	maxScore: number;
	verdict: string;
	roastQuote: string;
	language: string;
	lines: number;
	code: string[];
	issues: { severity: string; title: string; description: string }[];
	diff: { type: DiffLineVariant; content: string }[];
} = {
	score: 3.5,
	maxScore: 10,
	verdict: "needs_serious_help",
	roastQuote:
		'"this code looks like it was written during a power outage... in 2005."',
	language: "javascript",
	lines: 7,
	code: [
		"function calculateTotal(items) {",
		"  var total = 0;",
		"  for (var i = 0; i < items.length; i++) {",
		"    total = total + items[i].price;",
		"  }",
		"  return total;",
		"}",
	],
	issues: [
		{
			severity: "critical",
			title: "using var instead of const/let",
			description:
				"var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
		},
		{
			severity: "critical",
			title: "imperative loop pattern",
			description:
				"for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
		},
		{
			severity: "good",
			title: "clear naming conventions",
			description:
				"calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
		},
		{
			severity: "good",
			title: "single responsibility",
			description:
				"the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
		},
	],
	diff: [
		{ type: "context", content: "function calculateTotal(items) {" },
		{ type: "removed", content: "  var total = 0;" },
		{ type: "removed", content: "  for (var i = 0; i < items.length; i++) {" },
		{ type: "removed", content: "    total = total + items[i].price;" },
		{ type: "removed", content: "  }" },
		{ type: "removed", content: "  return total;" },
		{
			type: "added",
			content: "  return items.reduce((sum, item) => sum + item.price, 0);",
		},
		{ type: "context", content: "}" },
	],
};

export default function ResultPage() {
	const issues = staticRoastData.issues;
	const criticalIssues = issues.filter((i) => i.severity === "critical");
	const goodIssues = issues.filter((i) => i.severity === "good");

	return (
		<main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background px-20 py-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
				<section className="flex items-center gap-12">
					<ScoreRingRoot
						score={staticRoastData.score}
						maxScore={staticRoastData.maxScore}
					/>

					<div className="flex flex-1 flex-col gap-4">
						<StatusBadgeRoot variant="verdict">
							verdict: {staticRoastData.verdict}
						</StatusBadgeRoot>

						<p className="font-mono text-xl leading-normal text-foreground">
							{staticRoastData.roastQuote}
						</p>

						<div className="flex items-center gap-4">
							<span className="font-mono text-xs text-text-tertiary">
								lang: {staticRoastData.language}
							</span>
							<span className="text-text-tertiary">·</span>
							<span className="font-mono text-xs text-text-tertiary">
								{staticRoastData.lines} lines
							</span>
						</div>

						<div className="flex gap-3">
							<Button variant="outline" size="sm">
								$ share_roast
							</Button>
						</div>
					</div>
				</section>

				<div className="h-px w-full bg-border-primary" />

				<section className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<span className="font-mono text-sm font-bold text-green-primary">
							//
						</span>
						<span className="font-mono text-sm font-bold text-foreground">
							your_submission
						</span>
					</div>

					<CodeBlockRoot>
						<CodeBlockHeader className="border-border-primary">
							<div className="ml-auto flex items-center gap-3">
								<span className="font-mono text-xs text-text-secondary">
									{staticRoastData.language}
								</span>
								<span className="font-mono text-xs text-text-tertiary">
									{staticRoastData.lines} lines
								</span>
							</div>
						</CodeBlockHeader>
						<div className="bg-input">
							<CodeBlockWithLineNumbers
								code={staticRoastData.code.join("\n")}
								language={staticRoastData.language}
							/>
						</div>
					</CodeBlockRoot>
				</section>

				<div className="h-px w-full bg-border-primary" />

				<section className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<span className="font-mono text-sm font-bold text-green-primary">
							//
						</span>
						<span className="font-mono text-sm font-bold text-foreground">
							detailed_analysis
						</span>
					</div>

					<div className="grid grid-cols-2 gap-5">
						<div className="flex flex-col gap-5">
							{criticalIssues.map((issue, index) => (
								<AnalysisCardRoot key={index} className="border-border-primary">
									<div className="mb-3 flex items-center gap-2">
										<span
											className={`h-2 w-2 rounded-full ${
												issue.severity === "critical"
													? "bg-red-accent"
													: "bg-green-primary"
											}`}
										/>
										<span className="font-mono text-sm font-medium text-foreground">
											{issue.title}
										</span>
									</div>
									<p className="font-mono text-xs leading-relaxed text-text-secondary">
										{issue.description}
									</p>
								</AnalysisCardRoot>
							))}
						</div>

						<div className="flex flex-col gap-5">
							{goodIssues.map((issue, index) => (
								<AnalysisCardRoot key={index} className="border-border-primary">
									<div className="mb-3 flex items-center gap-2">
										<span
											className={`h-2 w-2 rounded-full ${
												issue.severity === "critical"
													? "bg-red-accent"
													: "bg-green-primary"
											}`}
										/>
										<span className="font-mono text-sm font-medium text-foreground">
											{issue.title}
										</span>
									</div>
									<p className="font-mono text-xs leading-relaxed text-text-secondary">
										{issue.description}
									</p>
								</AnalysisCardRoot>
							))}
						</div>
					</div>
				</section>

				<div className="h-px w-full bg-border-primary" />

				<section className="flex flex-col gap-6">
					<div className="flex items-center gap-2">
						<span className="font-mono text-sm font-bold text-green-primary">
							//
						</span>
						<span className="font-mono text-sm font-bold text-foreground">
							suggested_fix
						</span>
					</div>

					<CodeBlockRoot>
						<CodeBlockHeader className="border-border-primary">
							<span className="ml-auto font-mono text-xs text-text-tertiary">
								main.js
							</span>
						</CodeBlockHeader>
						<div className="flex flex-col bg-input">
							{staticRoastData.diff.map((line, index) => (
								<DiffLineRoot
									key={index}
									variant={line.type}
									className="h-7 px-4"
								>
									<span className="w-5">
										{line.type === "context"
											? "  "
											: line.type === "removed"
												? "- "
												: "+ "}
									</span>
									<span className="flex-1">{line.content}</span>
								</DiffLineRoot>
							))}
						</div>
					</CodeBlockRoot>
				</section>
			</div>
		</main>
	);
}
