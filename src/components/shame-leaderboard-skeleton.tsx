"use client";

function LeaderboardRowSkeleton() {
	return (
		<div className="flex items-center border-b border-border px-5 py-4">
			<span className="w-10">
				<div className="h-5 w-8 animate-pulse rounded bg-muted" />
			</span>
			<span className="w-[60px]">
				<div className="h-5 w-12 animate-pulse rounded bg-muted" />
			</span>
			<span className="flex-1">
				<div className="h-4 w-full max-w-md animate-pulse rounded bg-muted" />
			</span>
			<span className="w-[100px]">
				<div className="h-4 w-16 animate-pulse rounded bg-muted" />
			</span>
		</div>
	);
}

export function ShameLeaderboardSkeleton() {
	return (
		<section className="flex w-full max-w-4xl flex-col gap-6 mt-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 animate-pulse rounded bg-muted" />
					<div className="h-6 w-44 animate-pulse rounded bg-muted" />
				</div>
				<div className="h-9 w-28 animate-pulse rounded border border-border" />
			</div>

			<span className="font-mono text-sm text-muted-foreground">
				// the worst code on the internet, ranked by shame
			</span>

			<div className="flex flex-col rounded-lg border border-border">
				<div className="flex h-10 items-center border-b border-border bg-surface px-5">
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

				<LeaderboardRowSkeleton />
				<LeaderboardRowSkeleton />
				<LeaderboardRowSkeleton />
			</div>

			<div className="flex justify-center px-4 py-4">
				<div className="h-4 w-64 animate-pulse rounded bg-muted" />
			</div>
		</section>
	);
}
