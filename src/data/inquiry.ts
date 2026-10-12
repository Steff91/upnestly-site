// Options for the inquiry form's "What are you interested in?" select.
// The value is what links pass as ?plan=… (e.g. /contact/?plan=growth&billing=annual).
import plans from './plans.json';

export const interestOptions = [
  { value: 'audit', label: 'Free 20-minute audit' },
  { value: 'ai', label: 'AI opportunity check' },
  ...plans.plans.map((p) => ({
    value: p.name.toLowerCase(),
    label: p.name === 'Custom' ? 'Custom project or retainer' : `${p.name} plan — ${p.price} / month`,
  })),
];

/** Plans that have a monthly / annual billing choice. */
export const billablePlans = plans.plans.filter((p) => p.name !== 'Custom').map((p) => p.name.toLowerCase());

export const planHref = (planName: string) => `/contact/?plan=${planName.toLowerCase()}`;

export const platformOptions = ['WordPress', 'WooCommerce', 'Shopify', 'Webflow', 'Magento', 'Custom code', 'No website yet', 'Not sure'];
