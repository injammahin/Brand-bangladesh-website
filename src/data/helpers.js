import content from './content';

export const pillarById = (id) => content.pillars.find((p) => p.id === id);
export const regionById = (id) => content.regions.find((r) => r.id === id);
export const issueById = (id) => content.issues.find((i) => i.id === id);
export const storyById = (id) => content.stories.find((s) => s.id === id);

/** Search index across both languages */
export function buildSearchIndex() {
  const items = [];
  content.stories.forEach((s) => items.push({ type: 'story', icon: 'fa-feather', title: s.title, to: `/article/${s.id}`, hay: [s.title, s.ex] }));
  content.issues.forEach((i) => items.push({ type: 'issue', icon: 'fa-book-open', title: i.title, to: `/publication/${i.id}`, hay: [i.title, i.dek, ...i.articles.map((a) => a.t)] }));
  content.pillars.forEach((p) => items.push({ type: 'pillar', icon: p.icon, title: p.name, to: `/pillars/${p.id}`, hay: [p.name, p.line, ...p.subs] }));
  content.regions.forEach((r) => items.push({ type: 'region', icon: 'fa-location-dot', title: r.name, to: `/regions/${r.id}`, hay: [r.name, r.line, ...r.tags] }));
  content.stats.forEach((s) => items.push({ type: 'stat', icon: 'fa-chart-simple', title: s.label, to: '/numbers', hay: [s.label, s.src] }));
  return items.map((it) => ({
    ...it,
    hay: it.hay.map((o) => `${o.en} ${o.bn}`).join(' ').toLowerCase(),
  }));
}
