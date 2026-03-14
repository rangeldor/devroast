import { router } from "../index";
import { metricsRouter } from "./metrics";

export const appRouter = router({
	metrics: metricsRouter,
});

export type AppRouter = typeof appRouter;
