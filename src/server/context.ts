import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createContext(_opts?: FetchCreateContextFnOptions | null) {
	return {
		req: _opts?.req,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
