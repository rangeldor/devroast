import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
	base: "inline-flex items-center justify-center gap-2 font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary:
				"bg-green-primary text-black hover:brightness-110 active:brightness-80",
			secondary:
				"bg-secondary text-secondary-foreground hover:brightness-110 active:brightness-125 border border-border",
			outline:
				"border border-border bg-transparent hover:bg-secondary hover:border-border-focus",
			ghost: "bg-transparent text-foreground hover:bg-secondary",
		},
		size: {
			sm: "h-8 px-3 text-xs",
			md: "h-9 px-4 text-xs",
			lg: "h-10 px-5 text-sm",
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
