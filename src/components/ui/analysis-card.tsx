import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const analysisCard = tv({
	base: "rounded-lg border border-border bg-card p-5",
	variants: {},
});

type AnalysisCardRootProps = ComponentProps<"div"> & {
	className?: string;
};

const AnalysisCardRoot = forwardRef<HTMLDivElement, AnalysisCardRootProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge(analysisCard({ className }))}
				{...props}
			>
				{children}
			</div>
		);
	},
);

AnalysisCardRoot.displayName = "AnalysisCardRoot";

type AnalysisCardHeaderProps = ComponentProps<"div"> & {
	className?: string;
};

const AnalysisCardHeader = forwardRef<HTMLDivElement, AnalysisCardHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge("mb-3 flex items-center gap-2", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

AnalysisCardHeader.displayName = "AnalysisCardHeader";

type AnalysisCardTitleProps = ComponentProps<"p"> & {
	className?: string;
};

const AnalysisCardTitle = forwardRef<
	HTMLParagraphElement,
	AnalysisCardTitleProps
>(({ className, children, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={twMerge("font-mono text-sm text-foreground", className)}
			{...props}
		>
			{children}
		</p>
	);
});

AnalysisCardTitle.displayName = "AnalysisCardTitle";

type AnalysisCardDescriptionProps = ComponentProps<"p"> & {
	className?: string;
};

const AnalysisCardDescription = forwardRef<
	HTMLParagraphElement,
	AnalysisCardDescriptionProps
>(({ className, children, ...props }, ref) => {
	return (
		<p
			ref={ref}
			className={twMerge(
				"font-mono text-xs leading-relaxed text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</p>
	);
});

AnalysisCardDescription.displayName = "AnalysisCardDescription";

export {
	AnalysisCardRoot,
	AnalysisCardHeader,
	AnalysisCardTitle,
	AnalysisCardDescription,
};
export type {
	AnalysisCardRootProps,
	AnalysisCardHeaderProps,
	AnalysisCardTitleProps,
	AnalysisCardDescriptionProps,
};
