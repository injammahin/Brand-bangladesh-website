import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PHOTOS, SEEDS, ISSUE_POOLS } from '@/data/photos';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const KEYS = Object.keys(PHOTOS);
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Resolve a content seed to a photo key: direct match, issue page (`bb-i-x-3`), or a stable pick */
function photoKey(seed) {
  if (SEEDS[seed]) return SEEDS[seed];
  if (PHOTOS[seed]) return seed;
  const m = seed.match(/^(.*)-(\d+)$/);
  if (m && ISSUE_POOLS[m[1]]) { const pool = ISSUE_POOLS[m[1]]; return pool[Number(m[2]) % pool.length]; }
  return KEYS[hash(seed) % KEYS.length];
}

/** Real Bangladesh photo for a seed, self-hosted in /public/photos at 960 and 1920px — replace with CMS/CDN images in production */
export const img = (seed, w = 1200) => `/photos/${photoKey(seed)}-${w > 900 ? 1920 : 960}.jpg`;

/** Commons page for a seed's photo (credits) */
export const imgCredit = (seed) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(PHOTOS[photoKey(seed)][0].split('/').pop())}`;

export const pad = (n) => String(n).padStart(2, '0');
