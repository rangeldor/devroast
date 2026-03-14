import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";
import { type CodeBlockVariant, codeBlock } from "./code-block.styles";

type CodeBlockRootProps = ComponentProps<"div"> & {
	className?: string;
};

const CodeBlockRoot = forwardRef<HTMLDivElement, CodeBlockRootProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={twMerge(codeBlock({ className }))} {...props}>
				{children}
			</div>
		);
	},
);

CodeBlockRoot.displayName = "CodeBlockRoot";

type CodeBlockHeaderProps = ComponentProps<"div"> & {
	className?: string;
};

const CodeBlockHeader = forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge(
					"flex h-10 items-center gap-3 border-b border-border px-4",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CodeBlockHeader.displayName = "CodeBlockHeader";

type CodeBlockDotProps = ComponentProps<"span"> & {
	color?: "red" | "amber" | "green";
	className?: string;
};

const CodeBlockDot = forwardRef<HTMLSpanElement, CodeBlockDotProps>(
	({ color = "red", className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge(
					"h-3 w-3 rounded-full",
					color === "red" && "bg-red-accent",
					color === "amber" && "bg-amber-accent",
					color === "green" && "bg-green-primary",
					className,
				)}
				{...props}
			/>
		);
	},
);

CodeBlockDot.displayName = "CodeBlockDot";

type CodeBlockFileNameProps = ComponentProps<"span"> & {
	className?: string;
};

const CodeBlockFileName = forwardRef<HTMLSpanElement, CodeBlockFileNameProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge(
					"ml-auto font-mono text-xs text-muted-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

CodeBlockFileName.displayName = "CodeBlockFileName";

type CodeBlockBodyProps = ComponentProps<"div"> & {
	className?: string;
};

const CodeBlockBody = forwardRef<HTMLDivElement, CodeBlockBodyProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge("flex font-mono text-sm", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CodeBlockBody.displayName = "CodeBlockBody";

type CodeBlockLineNumbersProps = ComponentProps<"div"> & {
	lines: number;
	className?: string;
};

const CodeBlockLineNumbers = forwardRef<
	HTMLDivElement,
	CodeBlockLineNumbersProps
>(({ lines, className, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={twMerge(
				"flex flex-col gap-1 border-r border-border bg-background px-3 py-3 text-right font-mono text-xs text-muted-foreground",
				className,
			)}
			{...props}
		>
			{/* Using index as key is acceptable for line numbers */}
			{Array.from({ length: lines }, (_, i) => (
				<span key={i}>{i + 1}</span>
			))}
		</div>
	);
});

CodeBlockLineNumbers.displayName = "CodeBlockLineNumbers";

type CodeBlockCodeProps = ComponentProps<"div"> & {
	className?: string;
};

const CodeBlockCode = forwardRef<HTMLDivElement, CodeBlockCodeProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge("flex-1 overflow-x-auto px-3 py-3", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

CodeBlockCode.displayName = "CodeBlockCode";

export {
	CodeBlockRoot,
	CodeBlockHeader,
	CodeBlockDot,
	CodeBlockFileName,
	CodeBlockBody,
	CodeBlockLineNumbers,
	CodeBlockCode,
};
export type {
	CodeBlockRootProps,
	CodeBlockHeaderProps,
	CodeBlockDotProps,
	CodeBlockFileNameProps,
	CodeBlockBodyProps,
	CodeBlockLineNumbersProps,
	CodeBlockCodeProps,
	CodeBlockVariant,
};
