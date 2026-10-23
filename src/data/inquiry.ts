// Options for the inquiry form's "What are you interested in?" select.
// The value is what links pass as ?plan=… (e.g. /contact/?plan=growth&billing=annual). Values are the same in every language.
import { getPlans } from '../i18n/data';
import { fromPrice, localize, type Lang } from '../i18n';

export const interestOptions = (lang: Lang) => [
  { value: 'audit', label: lang === 'de' ? 'Kostenloser 20-Minuten-Audit' : 'Free 20-minute audit' },
  { value: 'ai', label: lang === 'de' ? 'KI-Potenzial-Check' : 'AI opportunity check' },
  { value: 'processes', label: lang === 'de' ? 'Business-App, CRM oder Prozesse' : 'Business app, CRM or processes' },
  ...getPlans(lang).plans.map((p) => ({
    value: p.name.toLowerCase(),
    label:
      p.name === 'Custom'
        ? lang === 'de' ? 'Individuelles Projekt oder Retainer' : 'Custom project or retainer'
        : lang === 'de' ? `${p.name}-Plan — ${fromPrice(p.price, lang)} ${p.period}` : `${p.name} plan — ${fromPrice(p.price, lang)} ${p.period}`,
  })),
];

/** Plans that have a monthly / annual billing choice. */
export const billablePlans = getPlans('en').plans.filter((p) => p.name !== 'Custom').map((p) => p.name.toLowerCase());

export const planHref = (planName: string, lang: Lang = 'en') => localize(`/contact/?plan=${planName.toLowerCase()}`, lang);

export const platformOptions = (lang: Lang) =>
  ['WordPress', 'WooCommerce', 'Shopify', 'Webflow', 'Magento'].concat(
    lang === 'de' ? ['Custom Code', 'Noch keine Website', 'Weiß ich nicht'] : ['Custom code', 'No website yet', 'Not sure'],
  );
