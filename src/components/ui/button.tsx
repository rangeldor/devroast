import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center gap-2 font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary: "bg-emerald-500 text-black hover:bg-emerald-600",
			secondary: "bg-zinc-900 text-white hover:bg-zinc-800",
			outline: "border border-zinc-300 bg-transparent hover:bg-zinc-100",
			ghost: "bg-transparent hover:bg-zinc-100",
		},
		size: {
			sm: "h-8 px-4 text-xs",
			md: "h-10 px-6 text-sm",
			lg: "h-12 px-8 text-base",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

type ButtonVariant = VariantProps<typeof button>["variant"];
type ButtonSize = VariantProps<typeof button>["size"];

type ButtonProps = VariantProps<typeof button> &
	ComponentProps<"button"> & {
		className?: string;
	};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={twMerge(button({ variant, size, className }), className)}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
