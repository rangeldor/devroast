import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

type LeaderboardRowRootProps = ComponentProps<"div"> & {
	className?: string;
};

const LeaderboardRowRoot = forwardRef<HTMLDivElement, LeaderboardRowRootProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge(
					"flex items-center border-b border-border px-5 py-4",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

LeaderboardRowRoot.displayName = "LeaderboardRowRoot";

type LeaderboardRowRankProps = ComponentProps<"span"> & {
	className?: string;
};

const LeaderboardRowRank = forwardRef<HTMLSpanElement, LeaderboardRowRankProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge(
					"w-10 font-mono text-sm text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

LeaderboardRowRank.displayName = "LeaderboardRowRank";

type LeaderboardRowScoreProps = ComponentProps<"span"> & {
	className?: string;
};

const LeaderboardRowScore = forwardRef<
	HTMLSpanElement,
	LeaderboardRowScoreProps
>(({ className, children, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={twMerge(
				"w-[60px] font-mono text-sm font-bold text-red-accent",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
});

LeaderboardRowScore.displayName = "LeaderboardRowScore";

type LeaderboardRowCodeProps = ComponentProps<"span"> & {
	className?: string;
};

const LeaderboardRowCode = forwardRef<HTMLSpanElement, LeaderboardRowCodeProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge(
					"flex-1 truncate font-mono text-xs text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

LeaderboardRowCode.displayName = "LeaderboardRowCode";

type LeaderboardRowLanguageProps = ComponentProps<"span"> & {
	className?: string;
};

const LeaderboardRowLanguage = forwardRef<
	HTMLSpanElement,
	LeaderboardRowLanguageProps
>(({ className, children, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={twMerge(
				"w-[100px] font-mono text-xs text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
});

LeaderboardRowLanguage.displayName = "LeaderboardRowLanguage";

export {
	LeaderboardRowRoot,
	LeaderboardRowRank,
	LeaderboardRowScore,
	LeaderboardRowCode,
	LeaderboardRowLanguage,
};
export type {
	LeaderboardRowRootProps,
	LeaderboardRowRankProps,
	LeaderboardRowScoreProps,
	LeaderboardRowCodeProps,
	LeaderboardRowLanguageProps,
};
