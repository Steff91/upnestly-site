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

## Languages

English lives at the root (`/pricing/`), German under `/de/` (`/de/pricing/`) — same slugs in both. Every page exists in both languages; the **EN / DE switcher** in the header (and in the mobile menu) links to the same page in the other language. Pages carry `hreflang` alternates, and the sitemap lists both versions.

- Pages live in `src/pages/[...lang]/` and are built once per language. The language comes from the URL (`getLang(Astro.url)` in `src/i18n/index.ts`).
- UI text inside components and pages sits next to the markup as `{ en: {…}, de: {…} }` dictionaries.
- Editable data has one JSON per language: `src/data/en/*.json` and `src/data/de/*.json`. Language-neutral data (email, legal details, LinkedIn) stays in `src/data/site.json`.
- Markdown content has one folder per language: `src/content/<collection>/en/` and `…/de/`. **Use the same file name in both** — it is the URL slug and links the two versions.
- Internal links go through `localize(href, lang)`, which adds `/de` for German.
- Plan names (Essentials, Growth, Scale, Custom) stay identical in both languages — the contact form uses them as `?plan=` values.
- German text uses the formal *Sie* and standard German spelling (ß). Have a native speaker review it before launch.

## Structure

```
src/
  i18n/index.ts             # languages, getLang(), localize(), switchLang(), price formatting
  i18n/data.ts              # getSite() / getPlans() / getPricing() / getAi() / getTeam() / getNav() per language
  i18n/content.ts           # getLocalized(collection, lang), slugOf(entry)
  data/site.json            # language-neutral: name, email, links, legal details
  data/{en,de}/site.json    # tagline, description, top bar text, hours, city, country
  data/{en,de}/plans.json   # pricing plans (editable in the CMS)
  data/{en,de}/pricing.json # /pricing/: annual discount, comparison table, add-ons, terms, FAQ
  data/{en,de}/team.json    # /team/: members (names, photos, bios), how we work, values, network
  data/{en,de}/ai.json      # /services/ai-automation/: use cases, pipeline, process, tools, FAQ, Custom price
  content/services/{en,de}/*.md  # one file per service → /services/<file-name>/
  content/work/{en,de}/*.md      # case studies → /work/<file-name>/ (featured ones on the homepage)
  content.config.ts         # collection schema
  components/
    sections/               # homepage sections: Hero, Platforms, Services, Pricing,
                            # AiApproach, Work, Process, Team, Contact
    Header, Footer, Logo, Icon, Placeholder
  layouts/Base.astro        # <head>, ProfessionalService JSON-LD, reveal-on-scroll
  styles/global.css         # brand tokens (@theme) and shared components
  layouts/Legal.astro       # legal layout (side nav, prose styles)
  content/legal/{en,de}/*.md  # privacy & cookie policy → /privacy/, /cookies/
  components/CookieBanner.astro  # consent: necessary / analytics / marketing
  pages/[...lang]/                # every page, built for / and /de/
    index, imprint, [legal], audit, contact, thank-you, team, pricing
    services/index, services/[slug], services/ai-automation   # AI page is excluded from [slug]
    work/index, work/[slug]
  pages/404.astro, admin/, robots.txt.ts   # single-language
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
- The CMS has an (EN) and a (DE) entry for every collection and data file. When you change one language, update the other too.
- Services: CMS → *Services (EN/DE)*, or edit `src/content/services/{en,de}/*.md`. `cro-ads.md` is the fully written example; the others still contain `[bracketed]` placeholders.
- Case studies: CMS → *Case studies (EN/DE)*, or add a Markdown file to `src/content/work/en/` **and** `src/content/work/de/` with the same name.
- Plans and prices: CMS → *Settings → Plans & pricing (EN/DE)*. German prices use the German format (`1.990 €`).
- Forms: `/audit/` and `/contact/` share `InquiryForm.astro`. Links preselect the interest with `?plan=audit|ai|essentials|growth|scale|custom` and `&billing=annual`.

## Preview mode (pre-launch)

Until launch, every build is hidden from search engines and AI crawlers:

- every page carries `<meta name="robots" content="noindex, nofollow, …">`
- `/robots.txt` disallows everything, and the sitemap is empty

- a **“Coming soon” password screen** covers every page (default password `upnestly2026`; override with the `PREVIEW_PASSWORD` build variable). Once entered, the browser remembers it. This is for sharing previews — not real security, the content is still in the HTML.

To launch, set the GitHub repository **variable** `SITE_LIVE` to `true` and redeploy — the gate, noindex and robots block all switch off.

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
- [ ] German version: native-speaker review of all German text (`src/data/de/`, `src/content/*/de/`, `de:` dictionaries in components)
- [ ] Optional: switch the CMS to Sveltia's built-in i18n mode (one entry with EN/DE side by side) — check the current Sveltia docs first
- [ ] Form endpoint: set `site.json → formAction` (e.g. Formspree / Web3Forms) and point its success redirect to `/thank-you/`. Until then the form opens the visitor's email app, prefilled
- [ ] Audit & contact pages: response time, report turnaround, how the call is booked ([bracketed] text)
- [ ] Confirm VAT handling for EU clients (pricing terms), annual discount and add-on rates
- [ ] LinkedIn URL in `site.json` (top bar and footer link to `#` until then)
- [ ] Legal: company details in `site.json` (imprint), final texts in `src/content/legal/privacy.md` and `cookies.md` — all marked as example text; have them reviewed, then set `noindex: false` (and remove `noindex` on `/imprint/`)
- [ ] Before adding analytics or ad pixels: load them as `<script type="text/plain" data-consent="analytics|marketing">` (see `CookieBanner.astro`) and update the cookie policy
