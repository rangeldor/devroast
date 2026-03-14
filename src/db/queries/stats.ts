import { sql } from "drizzle-orm";
import { db } from "../index";
import { roastResults } from "../schema";

export interface GlobalStats {
	totalRoasted: number;
	avgScore: number | null;
}

export async function getGlobalStats(): Promise<GlobalStats> {
	const [result] = await db
		.select({
			totalRoasted: sql<number>`count(*)`,
			avgScore: sql<number | null>`avg(${roastResults.score})`,
		})
		.from(roastResults);

	return {
		totalRoasted: Number(result.totalRoasted),
		avgScore: result.avgScore ? Number(result.avgScore) : null,
	};
}
