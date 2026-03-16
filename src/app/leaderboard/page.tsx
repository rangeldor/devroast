import type { Metadata } from "next";
import { cacheLife } from "next/cache";

import { LeaderboardRow } from "@/components/leaderboard-row";
import { renderCodeHighlight } from "@/db/queries/leaderboard";
import { serverCaller } from "@/lib/trpc/server";

export const metadata: Metadata = {
	title: "Leaderboard | DevRoast",
	description: "The most roasted code on the internet",
};

export default async function LeaderboardPage() {
	"use cache";
	cacheLife("hours");

	const data = await serverCaller.metrics.getFullLeaderboard();

	const entriesWithRank = await Promise.all(
		data.entries.map(async (entry, index) => {
			const codeLines = entry.codePreview.split("\n");
			const previewCode = codeLines.slice(0, 3).join("\n");

			const [highlightedCode, highlightedPreview] = await Promise.all([
				renderCodeHighlight(entry.codePreview, entry.language),
				renderCodeHighlight(previewCode, entry.language),
			]);

			return {
				...entry,
				rank: `#${index + 1}`,
				highlightedCode,
				highlightedPreview,
			};
		}),
	);

	return (
		<main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background px-20 py-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
				<section className="flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<span className="font-mono text-2xl font-bold text-green-primary">
							&gt;
						</span>
						<h1 className="font-mono text-2xl font-bold text-foreground">
							shame_leaderboard
						</h1>
					</div>

					<p className="font-mono text-sm text-muted-foreground">
						// the most roasted code on the internet
					</p>

					<div className="flex items-center gap-2">
						<span className="font-mono text-xs text-text-tertiary">
							{data.totalRoasts.toLocaleString()} submissions
						</span>
						<span className="font-mono text-xs text-text-tertiary">·</span>
						<span className="font-mono text-xs text-text-tertiary">
							avg score: {data.avgScore}/10
						</span>
					</div>
				</section>

				<section className="flex flex-col gap-5">
					<div className="overflow-x-auto rounded-lg border border-border">
						<div className="w-full min-w-0">
							<div className="flex justify-start items-center border-b border-border bg-surface">
								<div className="flex items-center h-10 w-10 px-2 font-mono text-xs font-medium text-muted-foreground">
									rank
								</div>
								<div className="flex items-center justify-start h-10 w-[60px] px-2 font-mono text-xs font-medium text-muted-foreground">
									score
								</div>
								<div className="flex items-center justify-start h-10 flex-1 px-2 font-mono text-xs font-medium text-muted-foreground">
									code
								</div>
								<div className="flex items-center justify-start h-10 w-[100px] px-2 font-mono text-xs font-medium text-muted-foreground">
									lang
								</div>
							</div>

							<div className="flex flex-col">
								{entriesWithRank.map((entry) => (
									<LeaderboardRow
										key={entry.id}
										entry={entry}
										highlightedCode={entry.highlightedCode}
										highlightedPreview={entry.highlightedPreview}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
