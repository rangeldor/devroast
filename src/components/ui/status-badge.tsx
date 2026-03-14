import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const statusBadge = tv({
	base: "inline-flex items-center gap-2 font-mono text-xs font-normal",
	variants: {
		variant: {
			critical: "text-red-accent",
			warning: "text-amber-accent",
			good: "text-green-primary",
			verdict: "text-red-accent",
		},
	},
	defaultVariants: {
		variant: "good",
	},
});

type StatusBadgeVariant = VariantProps<typeof statusBadge>["variant"];

type StatusBadgeRootProps = VariantProps<typeof statusBadge> &
	ComponentProps<"div"> & {
		className?: string;
	};

const StatusBadgeRoot = forwardRef<HTMLDivElement, StatusBadgeRootProps>(
	({ className, variant, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge(statusBadge({ variant, className }))}
				{...props}
			>
				<span
					className={twMerge(
						"h-2 w-2 rounded-full",
						variant === "critical" && "bg-red-accent",
						variant === "warning" && "bg-amber-accent",
						variant === "good" && "bg-green-primary",
						variant === "verdict" && "bg-red-accent",
					)}
				/>
				{children}
			</div>
		);
	},
);

StatusBadgeRoot.displayName = "StatusBadgeRoot";

type StatusBadgeTextProps = ComponentProps<"span"> & {
	className?: string;
};

const StatusBadgeText = forwardRef<HTMLSpanElement, StatusBadgeTextProps>(
	({ className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge("font-mono text-xs", className)}
				{...props}
			/>
		);
	},
);

StatusBadgeText.displayName = "StatusBadgeText";

export { StatusBadgeRoot, StatusBadgeText };
export type { StatusBadgeRootProps, StatusBadgeVariant };
