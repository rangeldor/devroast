import {
	NavbarLink,
	NavbarLogo,
	NavbarLogoPrompt,
	NavbarLogoText,
	NavbarRoot,
	NavbarSpacer,
} from "@/components/navbar";
import { ToggleSection } from "@/components/toggle-section";
import {
	AnalysisCardDescription,
	AnalysisCardHeader,
	AnalysisCardRoot,
	AnalysisCardTitle,
} from "@/components/ui/analysis-card";
import { Button } from "@/components/ui/button";
import {
	CodeBlockBody,
	CodeBlockCode,
	CodeBlockDot,
	CodeBlockFileName,
	CodeBlockHeader,
	CodeBlockLineNumbers,
	CodeBlockRoot,
} from "@/components/ui/code-block";
import { CodeBlockServer } from "@/components/ui/code-block.server";
import {
	DiffLineCode,
	DiffLinePrefix,
	DiffLineRoot,
} from "@/components/ui/diff-line";
import {
	LeaderboardRowCode,
	LeaderboardRowLanguage,
	LeaderboardRowRank,
	LeaderboardRowRoot,
	LeaderboardRowScore,
} from "@/components/ui/leaderboard-row";
import { ScoreRingRoot } from "@/components/ui/score-ring";
import { StatusBadgeRoot } from "@/components/ui/status-badge";

const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}`;

export default function ComponentsPage() {
	return (
		<div className="min-h-screen bg-background p-8">
			<div className="mx-auto max-w-4xl space-y-12">
				<h1 className="font-mono text-3xl font-bold text-foreground">
					// component_library
				</h1>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// typography
					</h2>
					<div className="space-y-4 rounded-lg border border-border bg-card p-8">
						<p className="font-mono text-4xl font-bold text-foreground">
							paste your code. get roasted.
						</p>
						<p className="font-mono text-2xl text-foreground">section title</p>
						<p className="font-mono text-sm text-muted-foreground">
							description text sample
						</p>
						<p className="font-mono text-xs text-muted-foreground">
							lang: javascript · 7 lines
						</p>
						<code className="font-mono text-sm" style={{ color: "#FFC799" }}>
							function calculateTotal()
						</code>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// buttons
					</h2>
					<div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-8">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
					</div>
				</section>

				<ToggleSection />

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// badge_status
					</h2>
					<div className="flex flex-wrap items-center gap-6 rounded-lg border border-border bg-card p-8">
						<StatusBadgeRoot variant="critical">critical</StatusBadgeRoot>
						<StatusBadgeRoot variant="warning">warning</StatusBadgeRoot>
						<StatusBadgeRoot variant="good">good</StatusBadgeRoot>
						<StatusBadgeRoot variant="verdict">
							needs_serious_help
						</StatusBadgeRoot>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// cards
					</h2>
					<div className="max-w-[480px]">
						<AnalysisCardRoot>
							<AnalysisCardHeader>
								<StatusBadgeRoot variant="critical" />
							</AnalysisCardHeader>
							<AnalysisCardTitle>
								using var instead of const/let
							</AnalysisCardTitle>
							<AnalysisCardDescription>
								The var keyword is function-scoped rather than block-scoped,
								which can lead to unexpected behavior and bugs. modern
								javascript uses const for immutable bindings and let for mutable
								ones.
							</AnalysisCardDescription>
						</AnalysisCardRoot>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// code_block
					</h2>
					<div className="max-w-[560px]">
						<CodeBlockRoot>
							<CodeBlockHeader>
								<CodeBlockDot color="red" />
								<CodeBlockDot color="amber" />
								<CodeBlockDot color="green" />
								<CodeBlockFileName>calculate.js</CodeBlockFileName>
							</CodeBlockHeader>
							<CodeBlockBody>
								<CodeBlockLineNumbers lines={5} />
								<CodeBlockCode>
									<CodeBlockServer code={sampleCode} language="javascript" />
								</CodeBlockCode>
							</CodeBlockBody>
						</CodeBlockRoot>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// diff_line
					</h2>
					<div className="max-w-[560px]">
						<DiffLineRoot variant="removed">
							<DiffLinePrefix>-</DiffLinePrefix>
							<DiffLineCode>var total = 0;</DiffLineCode>
						</DiffLineRoot>
						<DiffLineRoot variant="added">
							<DiffLinePrefix>+</DiffLinePrefix>
							<DiffLineCode>const total = 0;</DiffLineCode>
						</DiffLineRoot>
						<DiffLineRoot variant="context">
							<DiffLinePrefix> </DiffLinePrefix>
							<DiffLineCode>
								for (let i = 0; i &lt; items.length; i++) {"{"}
							</DiffLineCode>
						</DiffLineRoot>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// table_row
					</h2>
					<div className="max-w-[560px] rounded-lg border border-border bg-card">
						<LeaderboardRowRoot>
							<LeaderboardRowRank>#1</LeaderboardRowRank>
							<LeaderboardRowScore>2.1</LeaderboardRowScore>
							<LeaderboardRowCode>
								function calculateTotal(items) var total = 0; ...
							</LeaderboardRowCode>
							<LeaderboardRowLanguage>javascript</LeaderboardRowLanguage>
						</LeaderboardRowRoot>
					</div>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// navbar
					</h2>
					<NavbarRoot>
						<NavbarLogo>
							<NavbarLogoPrompt>&gt;</NavbarLogoPrompt>
							<NavbarLogoText>devroast</NavbarLogoText>
						</NavbarLogo>
						<NavbarSpacer />
						<NavbarLink href="/leaderboard">leaderboard</NavbarLink>
					</NavbarRoot>
				</section>

				<section className="space-y-4">
					<h2 className="font-mono text-xl font-semibold text-foreground">
						// score_ring
					</h2>
					<div className="flex flex-wrap gap-8 rounded-lg border border-border bg-card p-8">
						<ScoreRingRoot score={3.5} />
						<ScoreRingRoot score={1.2} />
						<ScoreRingRoot score={8.5} />
					</div>
				</section>
			</div>
		</div>
	);
}
