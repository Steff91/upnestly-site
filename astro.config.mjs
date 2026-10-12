// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://upnestly.net',
  integrations: [sitemap({ filter: (page) => !page.includes('/admin/') && !page.includes('/thank-you/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
