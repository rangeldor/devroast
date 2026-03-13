import { JetBrains_Mono } from "next/font/google";

import "./globals.css";

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
				{children}
			</body>
		</html>
	);
}
