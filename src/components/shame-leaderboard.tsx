import Link from "next/link";
import type { ShameLeaderboardData } from "@/db/queries/leaderboard";
import { LeaderboardRow } from "./leaderboard-row";
import { Button } from "./ui/button";

interface ShameLeaderboardProps {
	data: ShameLeaderboardData;
}

export async function ShameLeaderboard({ data }: ShameLeaderboardProps) {
	const entriesWithRank = data.entries.map((entry, index) => ({
		...entry,
		rank: `#${index + 1}`,
	}));

	return (
		<section className="flex w-full max-w-4xl flex-col gap-6 mt-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="font-mono text-lg font-bold text-green-primary">
						//
					</span>
					<span className="font-mono text-lg font-bold text-foreground">
						shame_leaderboard
					</span>
				</div>
				<Link href={"/leaderboard"}>
					<Button variant="outline">$ view_all &gt;&gt;</Button>
				</Link>
			</div>

			<span className="font-mono text-sm text-muted-foreground">
				// the worst code on the internet, ranked by shame
			</span>

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
						{entriesWithRank.map((item) => (
							<LeaderboardRow key={item.id} entry={item} />
						))}
					</div>
				</div>
			</div>

			<div className="flex justify-center px-4 py-4">
				<span className="font-mono text-xs text-muted-foreground">
					showing top 3 of {data.totalRoasts.toLocaleString()} ·{" "}
					<Link href="/leaderboard" className="hover:text-green-primary">
						view full leaderboard &gt;&gt;
					</Link>
				</span>
			</div>
		</section>
	);
}
