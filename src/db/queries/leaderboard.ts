import { asc, desc, sql } from "drizzle-orm";
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
