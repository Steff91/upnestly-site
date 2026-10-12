// robots.txt — blocks every crawler until the site is launched.
// Launch: set the GitHub repository variable SITE_LIVE=true (Settings → Secrets and variables → Actions → Variables).
import type { APIRoute } from 'astro';

const live = import.meta.env.PUBLIC_SITE_LIVE === 'true';

export const GET: APIRoute = ({ site }) => {
  const body = live
    ? `User-agent: *\nDisallow: /admin/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
    : `# Pre-launch: keep the whole site out of search engines and AI crawlers\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
