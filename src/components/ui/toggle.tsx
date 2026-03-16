import { Switch } from "@base-ui/react/switch";
import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ToggleRootProps = ComponentProps<typeof Switch.Root> & {
	className?: string;
};

const ToggleRoot = forwardRef<HTMLButtonElement, ToggleRootProps>(
	({ className, children, checked, onCheckedChange, ...props }, ref) => {
		return (
			<div
				className={twMerge(
					"inline-flex cursor-pointer items-center gap-3 select-none",
					className,
				)}
			>
				<Switch.Root
					ref={ref}
					checked={checked}
					onCheckedChange={onCheckedChange}
					className={twMerge(
						"relative h-[22px] w-[40px] rounded-full p-[3px] transition-colors",
						checked ? "bg-green-primary" : "bg-zinc-900",
					)}
					{...props}
					suppressHydrationWarning
				>
					<Switch.Thumb
						className={twMerge(
							"block h-4 w-4 rounded-full transition-transform duration-200",
							checked
								? "translate-x-[18px] bg-black"
								: "translate-x-0 bg-zinc-500",
						)}
					/>
				</Switch.Root>
				{children && (
					<span
						className={twMerge(
							"font-mono text-xs transition-colors",
							checked ? "text-green-primary" : "text-zinc-500",
						)}
					>
						{children}
					</span>
				)}
			</div>
		);
	},
);

ToggleRoot.displayName = "ToggleRoot";

export { ToggleRoot };
export type { ToggleRootProps };
