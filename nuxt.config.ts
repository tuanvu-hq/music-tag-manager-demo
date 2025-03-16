import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,
  devtools: { enabled: false },
  imports: { autoImport: false },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/modules/**/components", pathPrefix: false },
  ],
  modules: [
    "@pinia/nuxt",
    "@vueuse/motion/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],
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
  devServer: {
    // host: "0.0.0.0", // Can affect the performance.
  },
  runtimeConfig: {
    postgres: {
      user: process.env.NUXT_POSTGRES_USER,
      password: process.env.NUXT_POSTGRES_PASSWORD,
      port: process.env.NUXT_POSTGRES_PORT,
      host: process.env.NUXT_POSTGRES_HOST,
      database: process.env.NUXT_POSTGRES_DATABASE,
    },
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
});
