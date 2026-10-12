# upnestly-site

Website for Upnestly, an AI-native digital agency (Build · Grow · Run on one monthly retainer). Astro + Tailwind, Sveltia CMS, deployed via GitHub Actions.

## Stack

- **Astro 7** (static output) + **TypeScript** (strict) + **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Montserrat** (the only brand typeface), self-hosted via Fontsource
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
  data/site.json            # name, email, audit link
  data/plans.json           # pricing plans (editable in the CMS)
  data/nav.ts               # header navigation
  content/services/*.md     # one file per service → /services/<file-name>/
  content/work/*.md         # case studies (homepage, service pages)
  content.config.ts         # collection schema
  components/
    sections/               # homepage sections: Hero, Platforms, Services, Pricing,
                            # AiApproach, Work, Process, Team, Contact
    Header, Footer, Logo, Icon, Placeholder
  layouts/Base.astro        # <head>, ProfessionalService JSON-LD, reveal-on-scroll
  styles/global.css         # brand tokens (@theme) and shared components
  layouts/Legal.astro       # imprint & privacy layout
  pages/index.astro, imprint.astro, privacy.astro, 404.astro, admin/
  pages/services/index.astro      # services hub with plan comparison table
  pages/services/[slug].astro     # shared template for all service pages (Service, Breadcrumb, FAQ schema)
public/
  admin/config.yml          # Sveltia CMS
  logo/                     # logo PNGs exported from the brand standards PDF
```

## Brand

Colours and type follow the Upnestly standards (navy `#2D327D`, deep navy `#242056`, Montserrat). Web tints (`tint`, `line`, …) are defined in `src/styles/global.css`.

Logo, mark and favicons come from the designer's SVG exports. Those SVGs wrap high-resolution PNGs (the mark has shading), so `public/logo/` holds trimmed PNG + WebP versions:

| File | Use |
|---|---|
| `upnestly.*` / `upnestly-white.*` / `upnestly-black.*` | wordmark (header, footer) |
| `mark.*` / `mark-white.*` | “UP” dove mark, used large and cropped as a section decoration (`BrandMark.astro`) |

The navy in the logo files (`#090E50`) is darker than the standards' RGB value used for UI (`#2D327D`) — confirm with the designer which is final.

## Content editing

- Text in `[BRACKETS]` is placeholder content to replace.
- Services: CMS → *Services*, or edit `src/content/services/*.md`. `cro-ads.md` is the fully written example; the others still contain `[bracketed]` placeholders.
- Case studies: CMS → *Case studies*, or add a Markdown file to `src/content/work/`.
- Plans and prices: CMS → *Settings → Plans & pricing*.
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

- [ ] Real numbers: case study results; confirm plan prices in `src/data/plans.json`
- [ ] Project screenshots for case studies
- [ ] Fill service pages: development, seo-content, hosting-care, ai-automation (pains, steps, FAQ, hosting details)
- [ ] Confirm final navy (logo file vs. standards)
- [ ] German version (`/de/`)
- [ ] Booking link for the audit
- [ ] LinkedIn URL in `site.json` (top bar and footer link to `#` until then)
- [ ] Company details in `site.json` (imprint, footer) and a GDPR-reviewed privacy policy (`src/pages/privacy.astro`); then remove `noindex` from both legal pages
