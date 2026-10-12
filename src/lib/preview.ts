// Pre-launch preview gate settings.
// The password can be overridden with the PREVIEW_PASSWORD env variable at build time.
import { createHash } from 'node:crypto';

export const previewGateOn = import.meta.env.PUBLIC_SITE_LIVE !== 'true';
const password = import.meta.env.PREVIEW_PASSWORD || 'upnestly2026';
export const previewHash = createHash('sha256').update(password).digest('hex');
