"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./client";
import { getQueryClient } from "./query-client";

function getUrl() {
	if (typeof window !== "undefined") return "/api/trpc";
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api/trpc`;
	return "http://localhost:3000/api/trpc";
}

export function TRPCProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => getQueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: getUrl(),
				}),
			],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}