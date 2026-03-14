# tRPC Integration

## Objetivo
Adicionar uma camada de API typesafe ao projeto utilizando tRPC, integrado com Next.js App Router e TanStack React Query, permitindo comunicação tipada entre client e server sem necessidade de API REST manual.

---

## Requisitos

- [ ] Configurar tRPC com Next.js App Router
- [ ] Criar estrutura de routers e procedures
- [ ] Integrar com TanStack React Query
- [ ] Suporte a Server Components (RSC)
- [ ] Suporte a Client Components
- [ ] API route handler para `/api/trpc`
- [ ] Prefetching de queries no servidor
- [ ] Mutations com tipagem completa

---

## Opções Pesquisadas

### 1. tRPC com TanStack React Query (Recomendado)

- **Prós**:
  - Typesafe completo - tipos compartilhados entre client/server
  - Integração nativa com Next.js App Router
  - Suporte a Server Components com prefetching
  - Sem necessidade de geração de código
  - Documentação excelente
  - Padrão "render as you fetch" suportado

- **Contras**:
  - Curves de aprendizado para quem não conhece React Query
  - Algumas experimental features para Server Actions

- **Referências**:
  - https://trpc.io/docs/client/tanstack-react-query/server-components
  - https://trpc.io/docs/client/tanstack-react-query/setup

### 2. tRPC com Server Actions

- **Prós**:
  - Sintaxe mais simples para mutations
  - Integrado com Next.js nativamente

- **Contras**:
  - Features ainda em modo experimental
  - Menos flexibilidade que a abordagem principal

### 3. tRPC com fetch API direta

- **Prós**:
  - Sem dependência do React Query

- **Contras**:
  - Perde benefícios do React Query (caching, invalidation)
  - Mais código manual para implementar funcionalidades básicas

---

## Recomendação

Utilizar **tRPC com TanStack React Query** pois:
1. Integração oficial e bem mantida
2. Suporte nativo a Server Components do Next.js App Router
3. Tipagem completa automática
4. Ecoossistema maduro com diversas integrações
5. Permite "hydrate" de dados do servidor para o cliente

---

## Implementação Proposta

### Stack
- `@trpc/server` - Core do tRPC
- `@trpc/client` - Cliente HTTP
- `@trpc/react-query` - Integração React Query
- `@trpc/next` - Integração Next.js
- `@tanstack/react-query` - React Query v5
- `zod` - Validação de schemas

### Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts    # API Route Handler
│   └── ...
├── server/
│   ├── index.ts               # initTRPC instance
│   ├── context.ts             # Contexto da requisição
│   ├── routers/
│   │   ├── _app.ts            # Router principal (merge de todos)
│   │   └── greeting.ts        # Exemplo de router
│   └── trpc.ts                # Server utilities (createCallerFactory)
└── lib/
    ├── trpc/
    │   ├── client.ts           # createTRPCReact para Client Components
    │   ├── server.ts          # Server utilities para RSC
    │   └── query-client.ts    # QueryClient singleton
    └── trpc.ts                # Proxy exports
```

### Features

#### 1. Setup do Servidor
- [ ] Instalar dependências (`npm install @trpc/server @trpc/client @trpc/react-query @trpc/next zod`)
- [ ] Criar `src/server/index.ts` com `initTRPC`
- [ ] Criar `src/server/context.ts` para contexto de requisição
- [ ] Criar `src/server/trpc.ts` com utilitários server-side
- [ ] Criar routers de exemplo em `src/server/routers/`
- [ ] Criar API route handler em `src/app/api/trpc/[trpc]/route.ts`

#### 2. Setup do Client
- [ ] Criar `src/lib/trpc/query-client.ts` com makeQueryClient
- [ ] Criar `src/lib/trpc/client.ts` com createTRPCReact
- [ ] Criar `src/lib/trpc/server.ts` para Server Components
- [ ] Criar `src/app/trpc-provider.tsx` para wrap da aplicação

#### 3. Utilização em Server Components
- [ ] Usar `trpc` exportado de `src/lib/trpc/server.ts`
- [ ] Utilizar `prefetch` ou `trpc.xxx.queryOptions()`
- [ ] Utilizar `HydrateClient` para hidratação

#### 4. Utilização em Client Components
- [ ] Usar hook `useTRPC` ou `trpc.xxx.useQuery()`
- [ ] Utilizar `queryOptions` para opções do React Query

---

## To-Dos

1. Instalar dependências do tRPC
2. Configurar estrutura de diretórios server/routers
3. Criar arquivo de inicialização (initTRPC)
4. Criar contexto de requisição
5. Criar router de exemplo
6. Configurar API route handler
7. Configurar Client Provider
8. Configurar Server utilities
9. Criar exemplo de uso em page
10. Testar comunicação client/server

---

## Referências

- https://trpc.io/docs/client/tanstack-react-query/server-components
- https://trpc.io/docs/client/tanstack-react-query/setup
- https://github.com/trpc/trpc
- https://tanstack.com/query/latest