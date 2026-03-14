import Link from "next/link";

import {
	LeaderboardRowCode,
	LeaderboardRowLanguage,
	LeaderboardRowRank,
	LeaderboardRowRoot,
	LeaderboardRowScore,
} from "@/components/ui/leaderboard-row";

const leaderboardData = [
	{
		rank: "#1",
		score: "1.2",
		code: "function calculateTotal(items) var total = 0; for (var i = 0; i < items.length; i++) { ...",
		language: "javascript",
	},
	{
		rank: "#2",
		score: "2.1",
		code: "const result = data.filter(x => x.active).map(x => x.value.reduce((a,b) => a + b))",
		language: "typescript",
	},
	{
		rank: "#3",
		score: "2.8",
		code: "if (condition) { doSomething(); } else if (condition2) { doSomethingElse(); } ...",
		language: "python",
	},
];

export function LeaderboardPreview() {
	return (
		<section className="flex w-full max-w-4xl flex-col gap-6">
			<div className="flex items-center justify-between">
				<span className="font-mono text-lg font-semibold text-foreground">
					// top_ranked_shame
				</span>
				<Link
					href="/leaderboard"
					className="font-mono text-xs text-muted-foreground hover:text-green-primary"
				>
					view_all &gt;&gt;
				</Link>
			</div>

			<p className="font-mono text-xs text-muted-foreground">
				// the worst code on the internet, ranked by shame
			</p>

			<div className="flex flex-col rounded-lg border border-border-primary">
				<div className="flex h-10 items-center border-b border-border-primary bg-surface px-5">
					<span className="w-10 font-mono text-xs text-muted-foreground">
						rank
					</span>
					<span className="w-[60px] font-mono text-xs text-muted-foreground">
						score
					</span>
					<span className="flex-1 font-mono text-xs text-muted-foreground">
						code
					</span>
					<span className="w-[100px] font-mono text-xs text-muted-foreground">
						lang
					</span>
				</div>

				{leaderboardData.map((item) => (
					<LeaderboardRowRoot key={item.rank}>
						<LeaderboardRowRank>{item.rank}</LeaderboardRowRank>
						<LeaderboardRowScore>{item.score}</LeaderboardRowScore>
						<LeaderboardRowCode>{item.code}</LeaderboardRowCode>
						<LeaderboardRowLanguage>{item.language}</LeaderboardRowLanguage>
					</LeaderboardRowRoot>
				))}
			</div>

			<div className="flex justify-center gap-1 px-4">
				<span className="font-mono text-xs text-muted-foreground">
					showing top 3 of 2,847 ·
				</span>
				<Link
					href="/leaderboard"
					className="font-mono text-xs text-muted-foreground hover:text-green-primary"
				>
					view full leaderboard &gt;&gt;
				</Link>
			</div>
		</section>
	);
}
