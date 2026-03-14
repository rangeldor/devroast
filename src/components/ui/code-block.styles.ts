import { tv, type VariantProps } from "tailwind-variants";

const codeBlock = tv({
	base: "w-full overflow-hidden rounded-lg border border-border bg-input font-mono text-sm",
	variants: {},
});

export { codeBlock };
export type { VariantProps as CodeBlockVariant };
