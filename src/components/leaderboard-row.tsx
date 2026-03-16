"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LeaderboardRowProps {
	entry: {
		id: string;
		codePreview: string;
		language: string;
		score: number;
		rank: string;
	};
	highlightedCode: string;
	highlightedPreview: string;
}

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
		>
			<title>{isExpanded ? "Show less" : "Show more"}</title>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

export function LeaderboardRow({
	entry,
	highlightedCode,
	highlightedPreview,
}: LeaderboardRowProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const codeLines = entry.codePreview.split("\n");
	const hasMoreLines = codeLines.length > 3;

	return (
		<Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
			<div className="flex flex-col border-b border-border">
				<div className="flex min-h-[88px] w-full">
					<div className="flex w-10 shrink-0 items-start px-2 py-4 font-mono text-sm text-muted-foreground">
						{entry.rank}
					</div>
					<div className="flex w-[60px] shrink-0 items-start px-2 py-4 font-mono text-sm font-bold text-red-accent">
						{entry.score.toFixed(1)}
					</div>
					<div className="relative flex min-w-0 flex-1 items-start overflow-hidden px-2 py-4">
						<div
							className="shiki vesper-dark font-mono text-xs"
							style={{
								whiteSpace: "pre",
								overflowX: "auto",
								maxWidth: "100%",
								height: isExpanded ? "auto" : "66px",
								transition: "height 300ms ease-out",
							}}
							dangerouslySetInnerHTML={{
								__html: isExpanded ? highlightedCode : highlightedPreview,
							}}
						/>
					</div>
					<div className="flex w-[100px] shrink-0 items-start px-2 py-4 font-mono text-xs text-muted-foreground">
						{entry.language}
					</div>
				</div>

				{hasMoreLines && (
					<div className="flex justify-center px-2 pb-3">
						<Collapsible.Trigger
							render={
								<Button
									variant="ghost"
									size="sm"
									className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
								>
									<ChevronIcon isExpanded={isExpanded} />
									{isExpanded ? "show less" : "show more"}
								</Button>
							}
						/>
					</div>
				)}
			</div>
		</Collapsible.Root>
	);
}
