"use client";

function MetricSkeleton() {
	return (
		<div className="flex flex-col items-center gap-1">
			<div className="h-[21px] w-20 animate-pulse rounded bg-muted" />
			<div className="h-3 w-16 animate-pulse rounded bg-muted" />
		</div>
	);
}

export function MetricsSkeleton() {
	return (
		<div className="flex items-center justify-center gap-8">
			<MetricSkeleton />
			<span className="text-muted-foreground">·</span>
			<MetricSkeleton />
		</div>
	);
}
