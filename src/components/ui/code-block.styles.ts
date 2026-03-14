import { tv, type VariantProps } from "tailwind-variants";

const codeBlock = tv({
	base: "w-full overflow-hidden rounded-lg border border-border-primary bg-input font-mono text-sm",
	variants: {
		height: {
			sm: "h-40",
			md: "h-60",
			lg: "h-[360px]",
		},
	},
	defaultVariants: {
		height: "md",
	},
});

export { codeBlock, tv };
export type { VariantProps as CodeBlockVariant };
