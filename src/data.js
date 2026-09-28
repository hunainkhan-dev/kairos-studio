// Central content for the Kairos studio demo. Mock data — no backend.

export const services = [
  'Brand Strategy',
  'Art Direction',
  'Web Design',
  'Motion',
  'Film',
  'Development',
];

export const capabilities = [
  {
    n: '01',
    title: 'Brand & Identity',
    desc: 'Naming, positioning, visual systems and the guidelines to keep them alive.',
    items: ['Strategy', 'Logo & wordmark', 'Type systems', 'Guidelines'],
  },
  {
    n: '02',
    title: 'Digital & Web',
    desc: 'Sites and products designed to feel inevitable and built to load fast.',
    items: ['Art direction', 'UX / UI', 'Front-end build', 'CMS'],
  },
  {
    n: '03',
    title: 'Motion & Film',
    desc: 'Launch films, social cutdowns and interface motion that carries the story.',
    items: ['Direction', 'Animation', '3D / WebGL', 'Sound'],
  },
];

export const work = [
  {
    slug: 'solaire',
    title: 'Solaire',
    tag: 'Brand + Web',
    year: '2026',
    discipline: 'Identity, Web, Motion',
    blurb: 'A solar-tech brand reintroduced with warmth — an identity that makes clean energy feel human.',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
  },
  {
    slug: 'meridian',
    title: 'Meridian',
    tag: 'Campaign',
    year: '2025',
    discipline: 'Art Direction, Film',
    blurb: 'A global campaign built around a single idea — time zones as a story about staying connected.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
  },
  {
    slug: 'fold-studio',
    title: 'Fold Studio',
    tag: 'Identity',
    year: '2025',
    discipline: 'Brand, Guidelines',
    blurb: 'An architecture practice given a flexible mark that folds, stacks and reconfigures like their work.',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
  },
  {
    slug: 'cobalt',
    title: 'Cobalt',
    tag: 'Product Film',
    year: '2024',
    discipline: 'Direction, 3D',
    blurb: 'A launch film for a hardware startup — CG product hero cuts timed to an original score.',
    img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80',
  },
];

export const stats = [
  { value: '40+', label: 'Brands shipped' },
  { value: '6', label: 'Disciplines under one roof' },
  { value: '2019', label: 'Studio founded' },
  { value: '11', label: 'Awards & features' },
];

export const team = [
  { name: 'Ava Renner', role: 'Founder · Creative Director' },
  { name: 'Milo Vance', role: 'Design Director' },
  { name: 'Sena Ito', role: 'Motion Lead' },
  { name: 'Theo Marsh', role: 'Technical Director' },
];

export const process = [
  { n: '01', title: 'Listen', desc: 'We start with the business, not the moodboard — goals, audience, constraints.' },
  { n: '02', title: 'Frame', desc: 'One sharp idea the whole project can hang on, agreed before we design a pixel.' },
  { n: '03', title: 'Make', desc: 'Design, motion and build in tight loops so you see it move early and often.' },
  { n: '04', title: 'Launch', desc: 'We ship it, measure it and stay on to help it grow after go-live.' },
];
