# Padrões de Componentes UI

## Estrutura de Arquivo

Cada componente deve estar em um arquivo individual em `src/components/ui/`.

Exemplo: `src/components/ui/button.tsx`

## Padrões Obrigatórios

### Named Exports
- **Sempre** use named exports, nunca default exports
- Exporte o componente e seus tipos separadamente

```typescript
export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
```

### Tipos

- Use `ComponentProps<"element">` do React para estender propriedades nativas
- Defina tipos para variants usando `VariantProps<typeof button>["variant"]` do tailwind-variants
- Combine com as propriedades nativas do elemento

```typescript
type ButtonProps = VariantProps<typeof button> &
  ComponentProps<"button"> & {
    className?: string;
  };
```

### tailwind-variants + tailwind-merge

- Use `tv()` para definir variants
- Use `twMerge()` para mesclar as classes do tv com o className externo
- Não é necessário usar clsx - twMerge já resolve conflitos de classes Tailwind

```typescript
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "classes base",
  variants: {
    variant: {
      primary: "bg-emerald-500",
      secondary: "bg-zinc-900",
    },
    size: {
      sm: "h-8 px-4",
      md: "h-10 px-6",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = VariantProps<typeof button> &
  ComponentProps<"button"> & {
    className?: string;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(button({ variant, size, className }), className)}
        {...props}
      />
    );
  },
);
```

### forwardRef

- Use `forwardRef` para expor a ref ao elemento DOM
- Defina o tipo da ref como `HTMLButtonElement` (ou elemento apropriado)
- Defina o tipo das props como o tipo de retorno

```typescript
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(button({ variant, size, className }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
```

## Dependências

Instale as seguintes bibliotecas:

```bash
npm install tailwind-merge tailwind-variants
```

## Importação

```typescript
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
```

## Por que não usar clsx?

O `twMerge` já resolve conflitos de classes Tailwind automaticamente. O `clsx` é útil para lógica condicional complexa, mas não é necessário quando se usa `tv()` do tailwind-variants combinado com `twMerge`.
