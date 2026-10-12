// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Pre-launch builds (PUBLIC_SITE_LIVE not "true") ship no sitemap entries.
const live = process.env.PUBLIC_SITE_LIVE === 'true';

export default defineConfig({
  site: 'https://upnestly.net',
  integrations: [sitemap({ filter: (page) => live && !page.includes('/admin/') && !page.includes('/thank-you/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
