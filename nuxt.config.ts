// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    routeRules: {
      '/quotes': { cors: true }
    }
  },

  compatibilityDate: '2025-01-12'
})