import { asc, avg, count, desc, sql } from "drizzle-orm";
import { codeToHtml } from "shiki";

import { db } from "../index";
import { codeSubmissions, roastResults } from "../schema";

export interface LeaderboardEntry {
	id: string;
	codePreview: string;
	language: string;
	score: number;
	roastMode: string;
	createdAt: Date;
}

export async function getLeaderboard(
	limit: number = 20,
	offset: number = 0,
): Promise<LeaderboardEntry[]> {
	const results = await db
		.select({
			id: codeSubmissions.id,
			codePreview: codeSubmissions.codePreview,
			language: codeSubmissions.language,
			score: roastResults.score,
			roastMode: roastResults.roastMode,
			createdAt: codeSubmissions.createdAt,
		})
		.from(codeSubmissions)
		.innerJoin(
			roastResults,
			sql`${roastResults.submissionId} = ${codeSubmissions.id}`,
		)
		.orderBy(asc(roastResults.score), desc(codeSubmissions.createdAt))
		.limit(limit)
		.offset(offset);

	return results;
}

export async function getLeaderboardPreview(
	limit: number = 5,
): Promise<LeaderboardEntry[]> {
	return getLeaderboard(limit, 0);
}

export interface ShameLeaderboardData {
	entries: LeaderboardEntry[];
	totalRoasts: number;
	avgScore: number;
}

export async function getShameLeaderboardWithMetrics(): Promise<ShameLeaderboardData> {
	const entries = await getLeaderboard(3, 0);

	const [stats] = await db
		.select({
			totalRoasts: count(),
			avgScore: sql<number>`round(${avg(roastResults.score)}::numeric, 1)`,
		})
		.from(roastResults);

	return {
		entries,
		totalRoasts: stats?.totalRoasts ?? 0,
		avgScore: stats?.avgScore ?? 0,
	};
}

export async function renderCodeHighlight(code: string, language: string) {
	const html = await codeToHtml(code, {
		lang: language,
		theme: "vesper",
	});
	return html;
}
