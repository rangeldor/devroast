import { JetBrains_Mono } from "next/font/google";

import {
	NavbarLink,
	NavbarLogo,
	NavbarLogoPrompt,
	NavbarLogoText,
	NavbarRoot,
	NavbarSpacer,
} from "@/components/navbar";

import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className={`${jetbrainsMono.variable} dark`}>
			<body className="min-h-screen antialiased bg-background text-foreground">
				<Providers>
					<NavbarRoot>
						<NavbarLogo>
							<NavbarLogoPrompt>&gt;</NavbarLogoPrompt>
							<Link href={"/"}>
								<NavbarLogoText>devroast</NavbarLogoText>
							</Link>
						</NavbarLogo>
						<NavbarSpacer />
						<NavbarLink href="/leaderboard">leaderboard</NavbarLink>
					</NavbarRoot>
					{children}
				</Providers>
			</body>
		</html>
	);
}
