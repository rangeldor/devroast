import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const diffLine = tv({
	base: "flex px-4 py-2 font-mono text-sm",
	variants: {
		variant: {
			removed: "bg-[#1A0A0A] text-muted-foreground",
			added: "bg-[#0A1A0F] text-foreground",
			context: "text-muted-foreground",
		},
	},
	defaultVariants: {
		variant: "context",
	},
});

type DiffLineVariant = VariantProps<typeof diffLine>["variant"];

type DiffLineRootProps = VariantProps<typeof diffLine> &
	ComponentProps<"div"> & {
		className?: string;
	};

const DiffLineRoot = forwardRef<HTMLDivElement, DiffLineRootProps>(
	({ className, variant, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge(diffLine({ variant, className }))}
				{...props}
			>
				{children}
			</div>
		);
	},
);

DiffLineRoot.displayName = "DiffLineRoot";

type DiffLinePrefixProps = ComponentProps<"span"> & {
	className?: string;
};

const DiffLinePrefix = forwardRef<HTMLSpanElement, DiffLinePrefixProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge("w-4 font-mono text-sm", className)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

DiffLinePrefix.displayName = "DiffLinePrefix";

type DiffLineCodeProps = ComponentProps<"span"> & {
	className?: string;
};

const DiffLineCode = forwardRef<HTMLSpanElement, DiffLineCodeProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge("flex-1 font-mono text-sm", className)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

DiffLineCode.displayName = "DiffLineCode";

export { DiffLineRoot, DiffLinePrefix, DiffLineCode };
export type {
	DiffLineRootProps,
	DiffLineVariant,
	DiffLinePrefixProps,
	DiffLineCodeProps,
};
