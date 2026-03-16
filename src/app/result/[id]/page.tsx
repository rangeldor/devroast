import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnalysisCardRoot } from "@/components/ui/analysis-card";
import { CodeBlockHeader, CodeBlockRoot } from "@/components/ui/code-block";
import { CodeBlockWithLineNumbers } from "@/components/ui/code-block-with-line-numbers";
import { DiffLineRoot } from "@/components/ui/diff-line";
import { ScoreRingRoot } from "@/components/ui/score-ring";
import { StatusBadgeRoot } from "@/components/ui/status-badge";
import { serverCaller } from "@/lib/trpc/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Roast Results | DevRoast",
	description: "Your code has been roasted",
};

function getVerdict(score: number): string {
	if (score <= 2) return "catastrophic_failure";
	if (score <= 4) return "needs_serious_help";
	if (score <= 6) return "below_average";
	if (score <= 8) return "acceptable";
	return "actually_decent";
}

interface Issue {
	line: number | null;
	severity: "low" | "medium" | "high";
	description: string;
	suggestion: string;
}

export default async function ResultPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const result = await serverCaller.roast.getById({ id });

	if (!result || !result.submission) {
		notFound();
	}

	const issues = (result.issues || []) as Issue[];
	const criticalIssues = issues.filter((i) => i.severity === "high");
	const goodIssues: Issue[] = [];

	const code = result.submission.code;
	const codeLines = code.split("\n");

	return (
		<main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background px-20 py-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
				<section className="flex items-center gap-12">
					<ScoreRingRoot score={result.score} maxScore={10} />

					<div className="flex flex-1 flex-col gap-4">
						<StatusBadgeRoot variant="verdict">
							verdict: {getVerdict(result.score)}
						</StatusBadgeRoot>

						<p className="font-mono text-xl leading-normal text-foreground">
							{result.roastText}
						</p>

						<div className="flex items-center gap-4">
							<span className="font-mono text-xs text-text-tertiary">
								lang: {result.submission.language}
							</span>
							<span className="text-text-tertiary">·</span>
							<span className="font-mono text-xs text-text-tertiary">
								{codeLines.length} lines
							</span>
							<span className="text-text-tertiary">·</span>
							<span className="font-mono text-xs text-text-tertiary">
								mode: {result.roastMode}
							</span>
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
									{result.submission.language}
								</span>
								<span className="font-mono text-xs text-text-tertiary">
									{codeLines.length} lines
								</span>
							</div>
						</CodeBlockHeader>
						<CodeBlockWithLineNumbers
							code={code}
							language={result.submission.language}
						/>
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
												issue.severity === "high"
													? "bg-red-accent"
													: "bg-amber-accent"
											}`}
										/>
										<span className="font-mono text-sm font-medium text-foreground">
											{issue.description.split(".")[0]}
										</span>
									</div>
									<p className="font-mono text-xs leading-relaxed text-text-secondary">
										{issue.description}
									</p>
									{issue.suggestion && (
										<p className="mt-2 font-mono text-xs leading-relaxed text-green-primary">
											Fix: {issue.suggestion}
										</p>
									)}
								</AnalysisCardRoot>
							))}
							{criticalIssues.length === 0 && (
								<AnalysisCardRoot className="border-border-primary">
									<p className="font-mono text-xs text-text-secondary">
										No critical issues found. Congratulations!
									</p>
								</AnalysisCardRoot>
							)}
						</div>

						<div className="flex flex-col gap-5">
							{goodIssues.map((issue, index) => (
								<AnalysisCardRoot key={index} className="border-border-primary">
									<div className="mb-3 flex items-center gap-2">
										<span className="h-2 w-2 rounded-full bg-green-primary" />
										<span className="font-mono text-sm font-medium text-foreground">
											{issue.description.split(".")[0]}
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

				{result.improvements && result.improvements.length > 0 && (
					<>
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
										main.
										{result.submission.language === "typescript" ? "ts" : "js"}
									</span>
								</CodeBlockHeader>
								<div className="flex flex-col">
									{result.improvements.map((improvement, index) => (
										<DiffLineRoot
											key={index}
											variant="removed"
											className="h-7 px-4"
										>
											<span className="w-5">- </span>
											<span className="flex-1">{improvement.originalCode}</span>
										</DiffLineRoot>
									))}
									{result.improvements.map((improvement, index) => (
										<DiffLineRoot
											key={`added-${index}`}
											variant="added"
											className="h-7 px-4"
										>
											<span className="w-5">+ </span>
											<span className="flex-1">
												{improvement.suggestedCode}
											</span>
										</DiffLineRoot>
									))}
								</div>
							</CodeBlockRoot>
						</section>
					</>
				)}
			</div>
		</main>
	);
}
