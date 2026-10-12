// Content collections keep one folder per language: src/content/<collection>/en/*.md and …/de/*.md.
import { getCollection, type CollectionKey } from 'astro:content';
import type { Lang } from './index';

/** File name without the language folder: "de/cro-ads" → "cro-ads" (used as the URL slug). */
export const slugOf = (entry: { id: string }) => entry.id.split('/').slice(1).join('/');

/** All entries of a collection in one language. */
export const getLocalized = async <C extends CollectionKey>(collection: C, lang: Lang) =>
  (await getCollection(collection)).filter((e) => e.id.startsWith(`${lang}/`));
