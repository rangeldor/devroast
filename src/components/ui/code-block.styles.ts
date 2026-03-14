import { tv, type VariantProps } from "tailwind-variants";

const codeBlock = tv({
	base: "w-full overflow-hidden rounded-md border border-border-primary font-mono text-sm",
	variants: {
		height: {
			sm: "h-40",
			md: "h-60",
			lg: "h-[360px]",
			auto: "h-auto",
		},
	},
	defaultVariants: {
		height: "md",
	},
});

export { codeBlock, tv };
export type { VariantProps as CodeBlockVariant };
