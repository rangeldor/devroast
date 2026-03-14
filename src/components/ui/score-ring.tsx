import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

interface ScoreRingProps extends ComponentProps<"div"> {
	score: number;
	maxScore?: number;
	className?: string;
}

function getScoreColor(score: number, maxScore: number): string {
	const percentage = score / maxScore;

	if (percentage <= 0.33) {
		return "text-red-accent";
	}

	if (percentage <= 0.66) {
		return "text-amber-accent";
	}

	return "text-green-primary";
}

function getGradientColors(
	score: number,
	maxScore: number,
): {
	red: string;
	green: string;
	amber: string;
} {
	const percentage = score / maxScore;

	if (percentage <= 0.33) {
		return { red: "#EF4444", green: "#22C55E", amber: "#F59E0B" };
	}

	if (percentage <= 0.66) {
		return { red: "#EF4444", green: "#22C55E", amber: "#F59E0B" };
	}

	return { red: "#EF4444", green: "#22C55E", amber: "#F59E0B" };
}

const ScoreRingRoot = forwardRef<HTMLDivElement, ScoreRingProps>(
	({ score, maxScore = 10, className, ...props }, ref) => {
		const colors = getGradientColors(score, maxScore);
		const scoreColor = getScoreColor(score, maxScore);
		const percentage = (score / maxScore) * 100;
		const dashOffset = 565.48 - (565.48 * percentage) / 100;

		return (
			<div
				ref={ref}
				className={twMerge("relative h-[180px] w-[180px]", className)}
				{...props}
			>
				<svg
					className="h-full w-full -rotate-[90deg]"
					viewBox="0 0 200 200"
					role="img"
					aria-label={`Score: ${score} out of ${maxScore}`}
				>
					<title>Score Ring</title>
					<circle
						cx="100"
						cy="100"
						r="90"
						fill="none"
						stroke="var(--border)"
						strokeWidth="4"
					/>
					<circle
						cx="100"
						cy="100"
						r="90"
						fill="none"
						stroke="url(#gradient)"
						strokeWidth="4"
						strokeLinecap="round"
						strokeDasharray="565.48"
						strokeDashoffset={dashOffset}
					/>
					<defs>
						<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor={colors.green} />
							<stop offset="35%" stopColor={colors.amber} />
							<stop offset="100%" stopColor={colors.red} />
						</linearGradient>
					</defs>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className={twMerge("font-mono text-4xl font-bold", scoreColor)}>
						{score.toFixed(1)}
					</span>
					<span className="font-mono text-xs text-muted-foreground">
						/ {maxScore}
					</span>
				</div>
			</div>
		);
	},
);

ScoreRingRoot.displayName = "ScoreRingRoot";

export { ScoreRingRoot };
export type { ScoreRingProps };
