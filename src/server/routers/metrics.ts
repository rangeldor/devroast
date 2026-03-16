import { avg, count, sql } from "drizzle-orm";
import { cacheLife } from "next/cache";

import { db } from "@/db";
import {
	getLeaderboard,
	getShameLeaderboardWithMetrics,
} from "@/db/queries/leaderboard";
import { roastResults } from "@/db/schema";
import { publicProcedure, router } from "../index";

const mockMetrics = {
	totalRoasts: 2847,
	avgScore: 4.2,
};

export const metricsRouter = router({
	getStats: publicProcedure.query(async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return mockMetrics;
	}),
	getShameLeaderboard: publicProcedure.query(async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return getShameLeaderboardWithMetrics();
	}),
	getFullLeaderboard: publicProcedure.query(async () => {
		"use cache";
		cacheLife("hours");

		const entries = await getLeaderboard(20, 0);
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
	}),
});

export type AppRouter = typeof metricsRouter;
