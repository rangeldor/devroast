import type { Metadata } from "next";

import {
	CodeBlockBody,
	CodeBlockCode,
	CodeBlockHeader,
	CodeBlockLineNumbers,
	CodeBlockRoot,
} from "@/components/ui/code-block";

export const metadata: Metadata = {
	title: "Leaderboard | DevRoast",
	description: "The most roasted code on the internet",
};

const leaderboardEntries = [
	{
		rank: "#1",
		rankNumber: "1",
		score: "1.2",
		language: "javascript",
		lines: 3,
		code: [
			'eval(prompt("enter code"))',
			"document.write(response)",
			"// trust the user lol",
		],
	},
	{
		rank: "#2",
		rankNumber: "2",
		score: "1.8",
		language: "typescript",
		lines: 3,
		code: [
			"if (x == true) { return true; }",
			"else if (x == false) { return false; }",
			"else { return !false; }",
		],
	},
	{
		rank: "#3",
		rankNumber: "3",
		score: "2.3",
		language: "sql",
		lines: 2,
		code: ["SELECT * FROM users WHERE 1=1", "AND password = 'admin' --"],
	},
	{
		rank: "#4",
		rankNumber: "4",
		score: "2.7",
		language: "java",
		lines: 3,
		code: [
			"public class Main {",
			"    public static void main(String[] args) {",
			"        // TODO: implement",
		],
	},
	{
		rank: "#5",
		rankNumber: "5",
		score: "3.1",
		language: "javascript",
		lines: 3,
		code: [
			"function foo() {",
			"  return arguments;",
			"} // no arguments passed",
		],
	},
];

export default function LeaderboardPage() {
	return (
		<main className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background px-20 py-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
				<section className="flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<span className="font-mono text-2xl font-bold text-green-primary">
							&gt;
						</span>
						<h1 className="font-mono text-2xl font-bold text-foreground">
							shame_leaderboard
						</h1>
					</div>

					<p className="font-mono text-sm text-muted-foreground">
						// the most roasted code on the internet
					</p>

					<div className="flex items-center gap-2">
						<span className="font-mono text-xs text-text-tertiary">
							2,847 submissions
						</span>
						<span className="font-mono text-xs text-text-tertiary">·</span>
						<span className="font-mono text-xs text-text-tertiary">
							avg score: 4.2/10
						</span>
					</div>
				</section>

				<section className="flex flex-col gap-5">
					{leaderboardEntries.map((entry) => (
						<article key={entry.rank} className="flex flex-col">
							<CodeBlockRoot>
								<CodeBlockHeader>
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1.5">
											<span className="font-mono text-sm text-text-tertiary">
												#
											</span>
											<span className="font-mono text-sm font-bold text-amber-accent">
												{entry.rankNumber}
											</span>
										</div>
										<div className="flex items-center gap-1.5">
											<span className="font-mono text-xs text-text-tertiary">
												score:
											</span>
											<span className="font-mono text-sm font-bold text-red-accent">
												{entry.score}
											</span>
										</div>
									</div>
									<div className="ml-auto flex items-center gap-3">
										<span className="font-mono text-xs text-text-secondary">
											{entry.language}
										</span>
										<span className="font-mono text-xs text-text-tertiary">
											{entry.lines} lines
										</span>
									</div>
								</CodeBlockHeader>
								<CodeBlockBody>
									<CodeBlockLineNumbers lines={entry.lines} />
									<CodeBlockCode className="px-4 py-4">
										{entry.code.map((line, index) => (
											<code
												key={index}
												className="block font-mono text-xs leading-[1.5] text-foreground"
											>
												{line}
											</code>
										))}
									</CodeBlockCode>
								</CodeBlockBody>
							</CodeBlockRoot>
						</article>
					))}
				</section>
			</div>
		</main>
	);
}
