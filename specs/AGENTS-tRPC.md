# tRPC Patterns

## Estrutura de Arquivos

```
src/
├── server/
│   ├── index.ts              # initTRPC + exports (t, router, publicProcedure)
│   ├── context.ts            # createContext + tipos
│   └── routers/
│       ├── _app.ts           # AppRouter (merge de todos os routers)
│       └── [feature].ts     # Routers individuais
└── lib/
    └── trpc/
        ├── client.ts        # createTRPCReact<AppRouter> (Client Components)
        ├── server.ts        # createHydrationHelpers (Server Components)
        ├── query-client.ts  # QueryClient singleton
        └── provider.tsx     # TRPCProvider (wrapper da app)
```

## Regras de Nomenclatura

- **Routers**: `featureRouter` (ex: `metricsRouter`)
- **Procedures**: `camelCase` (ex: `getStats`, `submitCode`)
- **Arquivos de router**: `[feature].ts`
- **Exports**: Named exports apenas

## Padrões de Implementação

### Server Setup (src/server/)

**index.ts** - Inicialização:
```typescript
export const t = initTRPC.context<typeof createContext>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
```

**context.ts** - Contexto:
```typescript
export function createContext(_opts?: FetchCreateContextFnOptions | null) {
  return { req: _opts?.req };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
```

### Router (src/server/routers/)

```typescript
import { publicProcedure, router } from "../index";

export const metricsRouter = router({
  getStats: publicProcedure.query(async () => {
    // lógica
    return data;
  }),
});
```

### Client Components (src/lib/trpc/client.ts)

```typescript
"use client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
```

**Uso em componentes**:
```typescript
const { data } = trpc.metrics.getStats.useQuery();
```

### Server Components (src/lib/trpc/server.ts)

```typescript
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";

export const getServerQueryClient = cache(getQueryClient);

const caller = appRouter.createCaller({ req: undefined });

export const { trpc, HydrateClient } = createHydrationHelpers(caller, getServerQueryClient);
```

### QueryClient (src/lib/trpc/query-client.ts)

```typescript
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
```

### Provider (src/lib/trpc/provider.tsx)

```typescript
"use client";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: getUrl() })],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

## Regras

1. Sempre usar `publicProcedure` para procedures públicas
2. Usar `zod` para validação de inputs nas procedures
3. Nunca expor credenciais no contexto
4. Manter staleTime mínimo de 60s
5. Usar `cache()` do React para Server QueryClient
6. Provider deve ser `"use client"` e envolvê toda a app
7. Tipos compartilhados via import de `AppRouter`

## API Reference

- https://trpc.io/docs/server/routers
- https://trpc.io/docs/client/tanstack-react-query
- https://trpc.io/docs/client/tanstack-react-query/server-components
