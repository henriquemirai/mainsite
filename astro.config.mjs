// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://henriquemirai.com',

  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      {
        path: 'br',
        codes: ['pt-BR']
      }
    ],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
