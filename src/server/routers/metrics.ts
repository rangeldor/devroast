import { getShameLeaderboardWithMetrics } from "@/db/queries/leaderboard";
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
});

export type AppRouter = typeof metricsRouter;
