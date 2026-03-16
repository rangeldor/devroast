"use client";

import { use } from "react";

interface ResultData {
	id: string;
	score: number;
	roastText: string;
	roastMode: string;
	submission: {
		code: string;
		language: string;
	};
	issues: Array<{
		line: number | null;
		severity: string;
		description: string;
		suggestion: string;
	}>;
	improvements: Array<{
		originalCode: string;
		suggestedCode: string;
		explanation: string;
	}>;
}

export function ResultView({
	resultPromise,
}: {
	resultPromise: Promise<ResultData | null>;
}) {
	const result = use(resultPromise);

	if (!result || !result.submission) {
		return (
			<div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
				<span className="font-mono text-muted-foreground">
					Result not found
				</span>
			</div>
		);
	}

	const issues = result.issues || [];
	const criticalIssues = issues.filter((i) => i.severity === "high");

	function getVerdict(score: number): string {
		if (score <= 2) return "catastrophic_failure";
		if (score <= 4) return "needs_serious_help";
		if (score <= 6) return "below_average";
		if (score <= 8) return "acceptable";
		return "actually_decent";
	}

	const code = result.submission.code;
	const codeLines = code.split("\n");

	return (
		<main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background px-20 py-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
				<section className="flex items-center gap-12">
					<div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-red-accent">
						<span className="font-mono text-3xl font-bold text-red-accent">
							{result.score.toFixed(1)}
						</span>
					</div>

					<div className="flex flex-1 flex-col gap-4">
						<div className="rounded bg-red-accent/10 px-3 py-1">
							<span className="font-mono text-xs text-red-accent">
								verdict: {getVerdict(result.score)}
							</span>
						</div>

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

					<div className="rounded-lg border border-border bg-surface p-4">
						<pre className="overflow-x-auto font-mono text-xs text-foreground">
							<code>{code}</code>
						</pre>
					</div>
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
								<div
									key={index}
									className="rounded border border-border-primary bg-surface p-4"
								>
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
								</div>
							))}
							{criticalIssues.length === 0 && (
								<div className="rounded border border-border-primary bg-surface p-4">
									<p className="font-mono text-xs text-text-secondary">
										No critical issues found!
									</p>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
