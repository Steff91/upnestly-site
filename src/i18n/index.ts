// Two languages: English at the root (/pricing/), German under /de/ (/de/pricing/). Same slugs in both.
export const langs = ['en', 'de'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'en';

export const langMeta: Record<Lang, { html: string; og: string; label: string; short: string }> = {
  en: { html: 'en', og: 'en_GB', label: 'English', short: 'EN' },
  de: { html: 'de', og: 'de_DE', label: 'Deutsch', short: 'DE' },
};

/** Language of a URL: /de/… is German, everything else English. */
export const getLang = (url: URL): Lang => (url.pathname === '/de' || url.pathname.startsWith('/de/') ? 'de' : 'en');

/** Path without the language prefix: /de/pricing/ → /pricing/ */
export const stripLang = (path: string) => path.replace(/^\/de(?=\/|$)/, '') || '/';

/** Prefix an internal link for the given language. External links, anchors and mailto: are left alone. */
export const localize = (href: string, lang: Lang) => {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const base = stripLang(href);
  return lang === 'en' ? base : `/de${base}`;
};

/** The same page in another language. */
export const switchLang = (path: string, to: Lang) => localize(stripLang(path), to);

/** getStaticPaths params for pages under src/pages/[...lang]/ */
export const langParams = () => langs.map((l) => ({ params: { lang: l === defaultLang ? undefined : l } }));

/** Pick the value for the current language: pick(lang, { en: '…', de: '…' }) */
export const pick = <T>(lang: Lang, values: Record<Lang, T>): T => values[lang];

/** Locale-aware number formatting for prices (1,990 vs. 1.990). */
export const formatNumber = (n: number, lang: Lang) => n.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US');

/** Euro price in the local format: €1,990 (en) / 1.990 € (de). */
export const formatPrice = (n: number, lang: Lang) => (lang === 'de' ? `${formatNumber(n, lang)} €` : `€${formatNumber(n, lang)}`);

/** Digits of a price string: "€1,990" / "1.990 €" → 1990 */
export const priceNumber = (price: string) => Number(price.replace(/[^\d]/g, ''));
