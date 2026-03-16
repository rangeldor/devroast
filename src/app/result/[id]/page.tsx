import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { ResultView } from "@/components/result-content";
import { serverCaller } from "@/lib/trpc/server";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const result = await serverCaller.roast.getById({ id });

	if (!result) {
		return {
			title: "Roast Not Found | DevRoast",
			description: "This roast could not be found",
		};
	}

	return {
		title: `${result.score.toFixed(1)}/10 - ${result.roastMode ? "Full Roast" : "Roast"} | DevRoast`,
		description: result.roastText,
		openGraph: {
			title: `DevRoast - Score: ${result.score.toFixed(1)}/10`,
			description: result.roastText,
			images: [
				{
					url: `/result/${id}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: `Roast result: ${result.score.toFixed(1)}/10`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			images: [`/result/${id}/opengraph-image`],
		},
	};
}

export default function ResultPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
					<span className="font-mono text-muted-foreground">loading...</span>
				</div>
			}
		>
			<ResultContent params={params} />
		</Suspense>
	);
}

async function ResultContent({ params }: { params: Promise<{ id: string }> }) {
	"use cache";
	cacheLife("minutes");

	const { id } = await params;
	const result = await serverCaller.roast.getById({ id });

	if (!result || !result.submission) {
		return (
			<div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
				<span className="font-mono text-muted-foreground">
					Result not found
				</span>
			</div>
		);
	}

	return (
		<ResultView
			id={result.id}
			score={result.score}
			roastText={result.roastText}
			roastMode={result.roastMode}
			code={result.submission.code}
			language={result.submission.language}
			issues={
				result.issues as Array<{
					line: number | null;
					severity: string;
					description: string;
					suggestion: string;
				}>
			}
			improvements={
				result.improvements as Array<{
					originalCode: string;
					suggestedCode: string;
					explanation: string;
				}>
			}
		/>
	);
}
