import { CodeInputSection } from "@/components/code-input-section";
import { LeaderboardPreview } from "@/components/leaderboard-preview";

export default function Home() {
	return (
		<main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center bg-background pt-20">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-20 gap-12">
				<CodeInputSection />
				<LeaderboardPreview />
			</div>
		</main>
	);
}
