# DOCS

## General

### Disabled auto-import.

When the `auto-import` functionality is turned off, the `defineEventHandler` has to be imported manually from `h3`.

```ts
import { createError, defineEventHandler } from "h3";
```

### TypeORM - Decorators

#### Solution 1

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

### TypeORM - Top-level await is not available in the configured target environment ("es2019")

#### Solution 1

- Vue becomes buggy. Anything reactive used in the template will throw an error.

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "target": "esnext",
    "lib": ["esnext"]
  }
}
```

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
});
```

### TypeORM - Make it work with Nuxt.

#### Solution 1

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },
});
```

## Music Tag Manager

### `@types/youtube`

If the types are not automatically picked-up.

#### Solution 1

1. Add the following to the `tsconfig.json` file at the root.
2. Restart server.

```json
{
  // https://nuxt.com/docs/guide/concepts/typescript
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "typeRoots": ["node_modules/@types"],
    "types": ["youtube"]
  }
}
```
