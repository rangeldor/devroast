import Link from "next/link";

import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

type NavbarRootProps = ComponentProps<"nav"> & {
	className?: string;
};

const NavbarRoot = forwardRef<HTMLElement, NavbarRootProps>(
	({ className, children, ...props }, ref) => {
		return (
			<nav
				ref={ref as React.RefObject<HTMLDivElement>}
				className={twMerge(
					"flex h-14 w-full items-center border-b border-border-primary bg-background px-10",
					className,
				)}
				{...props}
			>
				{children}
			</nav>
		);
	},
);

NavbarRoot.displayName = "NavbarRoot";

type NavbarLogoProps = ComponentProps<"div"> & {
	className?: string;
};

const NavbarLogo = forwardRef<HTMLDivElement, NavbarLogoProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={twMerge("flex items-center gap-2", className)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

NavbarLogo.displayName = "NavbarLogo";

type NavbarLogoPromptProps = ComponentProps<"span"> & {
	className?: string;
};

const NavbarLogoPrompt = forwardRef<HTMLSpanElement, NavbarLogoPromptProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge(
					"font-mono text-xl font-bold text-green-primary",
					className,
				)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

NavbarLogoPrompt.displayName = "NavbarLogoPrompt";

type NavbarLogoTextProps = ComponentProps<"span"> & {
	className?: string;
};

const NavbarLogoText = forwardRef<HTMLSpanElement, NavbarLogoTextProps>(
	({ className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={twMerge(
					"font-mono text-lg font-medium text-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

NavbarLogoText.displayName = "NavbarLogoText";

const NavbarSpacer = () => <div className="flex-1" />;

type NavbarLinkProps = ComponentProps<typeof Link> & {
	className?: string;
};

const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
	({ className, children, href, ...props }, ref) => {
		return (
			<Link
				ref={ref}
				href={href}
				className={twMerge(
					"font-mono text-sm text-muted-foreground hover:text-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</Link>
		);
	},
);

NavbarLink.displayName = "NavbarLink";

export {
	NavbarRoot,
	NavbarLogo,
	NavbarLogoPrompt,
	NavbarLogoText,
	NavbarSpacer,
	NavbarLink,
};
export type {
	NavbarRootProps,
	NavbarLogoProps,
	NavbarLogoPromptProps,
	NavbarLogoTextProps,
	NavbarLinkProps,
};
