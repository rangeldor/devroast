import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

import { appRouter } from "@/server/routers/_app";
import { getQueryClient } from "./query-client";

export const getServerQueryClient = cache(getQueryClient);

const caller = appRouter.createCaller({
	req: undefined,
});

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
	caller,
	getServerQueryClient,
);
