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
  data/pricing.json         # /pricing/: annual discount, comparison table, add-ons, terms, FAQ
  data/team.json            # /team/: members (names, photos, bios), how we work, values, network
  data/ai.json              # /services/ai-automation/: use cases, pipeline, process, tools, FAQ, Custom price
  data/nav.ts               # header navigation
  content/services/*.md     # one file per service → /services/<file-name>/
  content/work/*.md         # case studies → /work/<file-name>/ (featured ones on the homepage)
  content.config.ts         # collection schema
  components/
    sections/               # homepage sections: Hero, Platforms, Services, Pricing,
                            # AiApproach, Work, Process, Team, Contact
    Header, Footer, Logo, Icon, Placeholder
  layouts/Base.astro        # <head>, ProfessionalService JSON-LD, reveal-on-scroll
  styles/global.css         # brand tokens (@theme) and shared components
  layouts/Legal.astro       # legal layout (side nav, prose styles)
  content/legal/*.md        # privacy & cookie policy → /privacy/, /cookies/
  components/CookieBanner.astro  # consent: necessary / analytics / marketing
  pages/index.astro, imprint.astro, privacy.astro, 404.astro, admin/
  pages/pricing.astro             # full pricing page (monthly/annual toggle, comparison table)
  pages/services/index.astro      # services hub with plan comparison table
  pages/work/index.astro, [slug].astro  # work overview (discipline filter) + case study template
  pages/services/ai-automation.astro  # dedicated AI page (pipeline, savings calculator) — excluded from [slug]
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
- Forms: `/audit/` and `/contact/` share `InquiryForm.astro`. Links preselect the interest with `?plan=audit|ai|essentials|growth|scale|custom` and `&billing=annual`.

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
- [ ] Team page: names, portraits, bios, LinkedIn URLs, values and network (`src/data/team.json`)
- [ ] Replace the six lorem-ipsum case studies in `src/content/work/` with real projects and screenshots
- [ ] AI page: Custom AI project price (`ai.json → customFrom`), catalogue results, FAQ on model training and the EU AI Act
- [ ] Fill service pages: development, seo-content, hosting-care (pains, steps, FAQ, hosting details)
- [ ] Confirm final navy (logo file vs. standards)
- [ ] German version (`/de/`)
- [ ] Form endpoint: set `site.json → formAction` (e.g. Formspree / Web3Forms) and point its success redirect to `/thank-you/`. Until then the form opens the visitor's email app, prefilled
- [ ] Audit & contact pages: response time, report turnaround, how the call is booked ([bracketed] text)
- [ ] Confirm VAT handling for EU clients (pricing terms), annual discount and add-on rates
- [ ] LinkedIn URL in `site.json` (top bar and footer link to `#` until then)
- [ ] Legal: company details in `site.json` (imprint), final texts in `src/content/legal/privacy.md` and `cookies.md` — all marked as example text; have them reviewed, then set `noindex: false` (and remove `noindex` on `/imprint/`)
- [ ] Before adding analytics or ad pixels: load them as `<script type="text/plain" data-consent="analytics|marketing">` (see `CookieBanner.astro`) and update the cookie policy
