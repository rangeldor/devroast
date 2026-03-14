# Code Editor Specification

## Objetivo

Criar um editor de código com syntax highlighting para a homepage do DevRoast. O usuário cola um trecho de código e recebe cores conforme a linguagem (detectada automaticamente ou selecionada manualmente).

---

## Requisitos

1. **Syntax Highlighting** - Exibir código com cores baseadas na linguagem
2. **Detecção Automática** - Identificar a linguagem do código automaticamente
3. **Seleção Manual** - Permitir usuário escolher a linguagem
4. **Edição** - Usuário pode editar/colar código no editor
5. **Performance** - Leve e rápido para carregamento

---

## Opções Pesquisadas

### 1. Shiki (já instalado)
- **Tipo**: Highlighter apenas (não é editor editável)
- **Bundle**: ~500KB (lightweight)
- **Syntax**: Same as VS Code (TextMate grammars)
- **Linguagens**: 100+
- **Como usar**: Transforma código em HTML com cores (read-only)
- **Ideia para editor editável**: Combinar com textarea ou CodeJar

**Referência**: ray-so usa Shiki para renderizar código em imagens

### 2. Monaco Editor
- **Tipo**: Editor completo (editável)
- **Bundle**: ~5-10MB (muito grande)
- **Syntax**: Same as VS Code
- **Linguagens**: 70+ built-in
- **Pros**: IDE-like experience, IntelliSense, minimap
- **Cons**: Bundle muito grande, complexo para simples highlight

### 3. CodeMirror 6
- **Tipo**: Editor completo (editável)
- **Bundle**: ~300KB core (modular)
- **Syntax**: Leininger (TextMate-compatible)
- **Linguagens**: 100+
- **Pros**: Leve, modular, bom para React
- **Cons**: Menos "batteries-included" que Monaco

### 4. CodeJar + Shiki
- **Tipo**: Editor leve + highlighter
- **Bundle**: ~10KB (CodeJar) + Shiki
- **Approach**: Textarea/CodeJar para edição, Shiki para highlight em tempo real

### 5. Prism.js
- **Tipo**: Highlighter apenas
- **Bundle**: ~20KB base
- **Syntax**: Limitado comparado a Shiki
- **Con**: Não usa grammar completa do VS Code

---

## Análise do Ray-So

O ray.so (raycast/ray-so) usa:
- **Next.js** (já temos)
- **Shiki** para syntax highlighting
- **Tailwind CSS** (já temos)

O ray.so foca em **criar imagens de código** (não é um editor editável em tempo real). Para o DevRoast, precisamos de um editor editável.

---

## Recomendação

### CodeMirror 6 (Escolhido)
- **Por quê**: Leve (~300KB), autocomplete excelente, bracket matching, 100+ linguagens
- **Bundle**: ~300KB core + linguagens extras
- **Pros**:
  - Leve comparado a Monaco
  - Autocompletebuilt-in com language-server protocol
  - Bracket matching nativo
  - Extensível
  - Bom suporte a React (@codemirror/react)
- **Cons**: Menos "batteries-included" que Monaco

---

## Implementação Proposta

### Stack
- **Editor**: CodeMirror 6 (@codemirror/react)
- **Autocomplete**: @codemirror/autocomplete
- **Bracket Matching**: @codemirror/language
- **Syntax**: @codemirror/lang-* (javascript, python, rust, go, etc.)
- **Theme**: custom dark theme para combinar com DevRoast

### Estrutura

```
src/components/ui/
  code-editor/
    code-editor.tsx    # Componente principal (client)
    theme.ts          # Custom theme (dark mode DevRoast)
```

### Linguagens Suportadas (iniciais)
- JavaScript / TypeScript
- Python
- Rust
- Go
- Java
- C / C++
- Ruby
- PHP
- SQL
- HTML / CSS
- JSON / YAML
- Markdown
- Shell / Bash

### Features
- [x] CodeMirror 6 com React (@uiw/react-codemirror)
- [x] Syntax highlighting para linguagens acima
- [x] Autocomplete básico
- [x] Bracket matching
- [x] Line numbers
- [x] Dark theme custom
- [ ] Detecção automática de linguagem (via primeira linha ou extensão)
- [x] Dropdown para selecionar linguagem manualmente
