import { router } from "../index";
import { metricsRouter } from "./metrics";
import { roastRouter } from "./roast";

export const appRouter = router({
	metrics: metricsRouter,
	roast: roastRouter,
});

export type AppRouter = typeof appRouter;
