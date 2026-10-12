# upnestly-site

Website for Upnestly, an AI-native digital agency (Build · Grow · Run on one monthly retainer). Astro + Tailwind, Sveltia CMS, deployed via GitHub Actions.

## Stack

- **Astro 7** (static output) + **TypeScript** (strict) + **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Montserrat** (brand typeface) + **IBM Plex Mono** (labels), self-hosted via Fontsource
- **Sveltia CMS** at `/admin` (Git-based, edits commit straight to `main`)
- **GitHub Actions** → `astro check` + build → `rsync` to own server

Requires Node `>=22.12`.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + build → dist/
npm run preview
```

## Structure

```
src/
  data/site.json            # name, email, audit link, retainer price/hours
  data/nav.ts               # header navigation
  content/work/*.md         # case studies on the homepage
  content.config.ts         # collection schema
  components/
    sections/               # homepage sections: Hero, Platforms, Services, Retainer,
                            # AiApproach, Work, Process, Team, Contact
    Header, Footer, Logo, Icon, Placeholder
  layouts/Base.astro        # <head>, ProfessionalService JSON-LD, reveal-on-scroll
  styles/global.css         # brand tokens (@theme) and shared components
  pages/index.astro, 404.astro, admin/
public/
  admin/config.yml          # Sveltia CMS
  logo/                     # logo PNGs exported from the brand standards PDF
```

## Brand

Colours and type follow the Upnestly standards (navy `#2D327D`, deep navy `#242056`, Montserrat). Web tints (`tint`, `line`, …) are defined in `src/styles/global.css`.

The logo and favicons are raster exports from the standards PDF. Replace `public/logo/*` and the favicons with the designer's vector files.

## Content editing

- Text in `[BRACKETS]` is placeholder content to replace.
- Case studies: CMS → *Case studies*, or add a Markdown file to `src/content/work/`.
- Retainer price and hours: CMS → *Settings → Site & contact*.
- Audit button: set `auditUrl` to a booking link (e.g. Calendly) instead of `mailto:`.

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`. Add repository secrets:

| Secret        | Value                                           |
|---------------|-------------------------------------------------|
| `SSH_HOST`    | server hostname / IP                            |
| `SSH_USER`    | deploy user (write access to the web root only) |
| `SSH_KEY`     | private key of a dedicated deploy key pair      |
| `REMOTE_PATH` | web root, e.g. `/var/www/upnestly/`             |

Without `SSH_HOST` the workflow only builds (useful as a CI check).

## TODO

- [ ] Real numbers: years of experience, retainer price and hours, case study results
- [ ] Project screenshots for case studies
- [ ] Vector logo (SVG) and favicon from the designer
- [ ] German version (`/de/`)
- [ ] Booking link for the audit, privacy page and imprint
