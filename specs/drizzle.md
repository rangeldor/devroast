# Drizzle ORM Specification

## Visão Geral

Banco de dados para persistência do DevRoast - sistema anônimo onde usuários submeter código e recebem "roasts" sarcásticos. Baseado no design do Pencil.

### Screens do Design

1. **Screen 1 - Code Input** (Homepage)
   - Code editor com syntax highlighting
   - Language selector dropdown
   - Roast mode toggle (subtle / full_roast)
   - Submit button → roast_my_code
   - Footer stats: "X codes roasted", "avg score: Y/10"
   - Leaderboard preview (top 5)

2. **Screen 2 - Roast Results**
   - Score ring (0-10)
   - Roast summary (texto do roast)
   - Code preview com syntax highlighting
   - Issues grid (lista de problemas encontrados)
   - Diff block (sugestões de melhoria)

3. **Screen 3 - Shame Leaderboard**
   - Hero com stats: total codes, avg score
   - Leaderboard entries (rank, code preview, language, score, mode)
   - Ordenado por score ascendente (quanto menor, mais vergonhoso)

---

## Stack

- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Docker Compose)
- **Migrations**: Drizzle Kit

---

## Docker Compose

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## Enum

```typescript
export const roastModeEnum = pgEnum("roast_mode", [
  "subtle",      // Sugestões suaves
  "full_roast",  // Destruição total
]);

export const languageEnum = pgEnum("language", [
  "javascript",
  "typescript",
  "python",
  "rust",
  "go",
  "java",
  "csharp",
  "cpp",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "sql",
  "html",
  "css",
  "json",
  "yaml",
  "markdown",
  "bash",
  "other",
]);
```

---

## Tabelas

### code_submissions

Armazena as submissões de código feitas pelos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK, UUID único |
| `code` | `text` | Código submetido completo |
| `code_preview` | `text` | Primeiras linhas (para leaderboard) |
| `language` | `language_enum` | Linguagem do código |
| `created_at` | `timestamp` | Data de criação |
| `ip_hash` | `varchar(64)` | Hash do IP para rate limit |

### roast_results

Armazena o resultado do roast gerado pela IA.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK, UUID único |
| `submission_id` | `uuid` | FK para code_submissions |
| `roast_mode` | `roast_mode_enum` | Modo do roast |
| `score` | `integer` | Score de 0-10 (quanto menor, pior) |
| `roast_text` | `text` | Texto sarcástico do roast |
| `issues` | `jsonb` | Array de issues encontradas |
| `created_at` | `timestamp` | Data de criação |

### issue (type para jsonb)

```typescript
type Issue = {
  line: number;
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
};
```

### diff_lines

Armazena as linhas de diff/sugestões de melhoria.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `uuid` | PK, UUID único |
| `roast_result_id` | `uuid` | FK para roast_results |
| `line_number` | `integer` | Número da linha no código original |
| `original_code` | `text` | Código original |
| `suggested_code` | `text` | Código sugerido |
| `explanation` | `text` | Explicação da mudança |
| `created_at` | `timestamp` | Data de criação |

---

## Queries Comuns

### Inserir submissão + roast

```typescript
// 1. Criar submission
const submission = await db.insert(codeSubmissions).values({
  code: fullCode,
  codePreview: fullCode.substring(0, 200), // Primeiras 200 chars
  language: "javascript",
  ipHash: hash(ip),
});

// 2. Criar resultado do roast
const roast = await db.insert(roastResults).values({
  submissionId: submission.id,
  roastMode: "full_roast",
  score: 3,
  roastText: "Seu código é tão ruim que...",
  issues: [
    { line: 1, severity: "error", message: "variável sem uso", suggestion: "remova 'x'" }
  ],
});

// 3. Criar diffs
await db.insert(diffLines).values([
  {
    roastResultId: roast.id,
    lineNumber: 1,
    originalCode: "const x = 1;",
    suggestedCode: "// removido",
    explanation: "Variável declarada mas nunca usada",
  }
]);
```

### Leaderboard (Screen 3)

```typescript
const leaderboard = await db
  .select({
    id: codeSubmissions.id,
    codePreview: codeSubmissions.codePreview,
    language: codeSubmissions.language,
    score: roastResults.score,
    roastMode: roastResults.roastMode,
    createdAt: codeSubmissions.createdAt,
  })
  .from(codeSubmissions)
  .innerJoin(roastResults, eq(roastResults.submissionId, codeSubmissions.id))
  .orderBy(asc(roastResults.score))
  .limit(20);
```

### Stats Globais (Footer Homepage)

```typescript
const stats = await db
  .select({
    totalRoasted: count(),
    avgScore: avg(roastResults.score),
  })
  .from(roastResults);
```

---

## Estrutura de Arquivos

```
src/
  db/
    index.ts          # Conexão com o banco
    schema.ts         # Definição das tabelas
    migrations/       # Migrations do Drizzle Kit
    seed.ts          # Dados iniciais (estatísticas fake)
    queries/
      submissions.ts  # Queries relacionadas a submissions
      leaderboard.ts # Queries do leaderboard
      stats.ts       # Queries de estatísticas
```

---

## To-Dos

- [ ] Configurar Docker Compose com PostgreSQL
- [ ] Instalar dependências: `drizzle-orm`, `drizzle-kit`, `pg`
- [ ] Criar arquivo `src/db/schema.ts` com as tabelas e enums
- [ ] Criar arquivo `src/db/index.ts` com a conexão
- [ ] Configurar `drizzle.config.ts` para migrations
- [ ] Criar migration inicial com as tabelas
- [ ] Criar seed com dados de exemplo:
      - ~5-10 code_submissions fake
      - ~5-10 roast_results fake com scores variados
      - ~10-20 diff_lines fake
- [ ] Implementar `src/db/queries/submissions.ts`:
      - `createSubmission(code, language, ip)`
      - `createRoastResult(submissionId, mode, score, text, issues)`
      - `createDiffLines(roastResultId, diffs)`
- [ ] Implementar `src/db/queries/leaderboard.ts`:
      - `getLeaderboard(limit, offset?)`
      - `getLeaderboardPreview(limit: 5)`
- [ ] Implementar `src/db/queries/stats.ts`:
      - `getGlobalStats()`
- [ ] Testar conexão com o banco
- [ ] Testar queries

---

## Considerações

1. **Anonimato**: Não há dados de usuário, apenas código e resultados
2. **Performance**: 
   - Leaderboard precisa de índice em `(score, created_at)`
   - Code preview truncado para evitar dados grandes no leaderboard
3. **Rate Limiting**: Usar IP hash para limitar submissões (evitar spam)
4. **Dados Iniciais**: O seed deve criar dados realistas para demo

---

## Seed Sugerido

Criar ~10 submissions com:
- Linguagens variadas (JS, TS, Python, Rust)
- Scores variados (1-8)
- Modos variados (subtle, full_roast)
- Issues e diffs para alguns resultados

Exemplo de dados para o footer:
- Total: 2.847 codes roasted
- Avg score: 4.2/10
