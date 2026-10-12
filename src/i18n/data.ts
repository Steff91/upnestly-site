// Editable data per language (src/data/en|de/*.json) merged with the language-neutral site.json.
import base from '../data/site.json';
import enSite from '../data/en/site.json';
import deSite from '../data/de/site.json';
import enPlans from '../data/en/plans.json';
import dePlans from '../data/de/plans.json';
import enPricing from '../data/en/pricing.json';
import dePricing from '../data/de/pricing.json';
import enAi from '../data/en/ai.json';
import deAi from '../data/de/ai.json';
import enTeam from '../data/en/team.json';
import deTeam from '../data/de/team.json';
import { localize, type Lang } from './index';

const sites = { en: { ...base, ...enSite }, de: { ...base, ...deSite } };
const plans = { en: enPlans, de: dePlans };
const pricing = { en: enPricing, de: dePricing };
const ai = { en: enAi, de: deAi };
const team = { en: enTeam, de: deTeam };

export const getSite = (lang: Lang) => {
  const s = sites[lang];
  return { ...s, auditUrl: localize(s.auditUrl, lang), contactUrl: localize(s.contactUrl, lang) };
};
export const getPlans = (lang: Lang) => plans[lang];
export const getPricing = (lang: Lang) => pricing[lang];
export const getAi = (lang: Lang) => ai[lang];
export const getTeam = (lang: Lang) => team[lang];

export const getNav = (lang: Lang) =>
  (lang === 'de'
    ? [
        { href: '/services/', label: 'Leistungen' },
        { href: '/pricing/', label: 'Preise' },
        { href: '/services/ai-automation/', label: 'KI & Automatisierung' },
        { href: '/work/', label: 'Projekte' },
        { href: '/team/', label: 'Team' },
      ]
    : [
        { href: '/services/', label: 'Services' },
        { href: '/pricing/', label: 'Pricing' },
        { href: '/services/ai-automation/', label: 'AI & Automation' },
        { href: '/work/', label: 'Work' },
        { href: '/team/', label: 'Team' },
      ]
  ).map((i) => ({ ...i, href: localize(i.href, lang) }));
