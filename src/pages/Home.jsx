import { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { services, capabilities, work, stats } from '../data.js';
import CssStarfield from '../components/CssStarfield.jsx';
import GLBoundary from '../components/GLBoundary.jsx';

const ParticleField = lazy(() => import('../three/ParticleField.jsx'));

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const ease = [0.33, 1, 0.68, 1];

// Is WebGL actually usable? Returns false if a browser/extension blocks it,
// so we can fall back to the CSS starfield instead of a black hero.
function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function Home() {
  const reduced = useReducedMotion();
  const [show3D, setShow3D] = useState(false);
  const [glOk, setGlOk] = useState(true);
  const [count, setCount] = useState(2600);

  useEffect(() => {
    setCount(window.innerWidth < 768 ? 1200 : 2600);
    setGlOk(webglAvailable());
    // Defer mounting until after first paint for a fast LCP. The animated
    // starfield always renders (WebGL when available, CSS otherwise).
    const id = requestAnimationFrame(() => setShow3D(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div {...pageMotion}>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24 md:px-12">
        {/* Animated starfield — real WebGL when available, CSS fallback when
            it's blocked (privacy extensions, reduced-motion, no GPU). Always on. */}
        {show3D && (
          <div className="absolute inset-0 z-0">
            {glOk ? (
              <GLBoundary fallback={<CssStarfield />}>
                <Suspense fallback={<CssStarfield />}>
                  <ParticleField count={count} />
                </Suspense>
              </GLBoundary>
            ) : (
              <CssStarfield />
            )}
          </div>
        )}
        {/* Ember glow accent */}
        <div className="pointer-events-none absolute right-6 top-1/4 z-0 h-72 w-72 rounded-full bg-ember/20 blur-[120px] md:right-40" />

        <div className="relative z-10">
          <p className="mb-8 max-w-md text-sm uppercase tracking-[0.3em] text-ember">
            Creative studio · est. 2019
          </p>
          <h1 className="k-hero-title font-display font-extrabold">
            {['We build', 'brands that'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.34, ease }}
                className="block italic text-ember"
              >
                move.
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 max-w-xl text-lg text-bone/60"
          >
            A small studio of designers, directors and developers making brands,
            sites and films that actually feel like something.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 flex items-center gap-3 text-sm text-bone/50"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" /> Scroll to see the work
          </motion.div>
        </div>
      </section>

      {/* Services marquee */}
      <div className="overflow-hidden border-y border-bone/10 bg-ember py-6 text-ink">
        <div className="flex whitespace-nowrap" style={{ animation: reduced ? 'none' : 'k-marquee 22s linear infinite' }}>
          {Array.from({ length: 3 }).map((_, k) => (
            <span key={k} className="flex items-center gap-6">
              {services.map((s) => (
                <span key={s} className="mx-6 font-display text-3xl font-bold">{s} ✳</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ember">What we do</p>
          <h2 className="font-display text-4xl font-extrabold md:text-6xl">
            Three disciplines, one team, no hand-offs.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="group rounded-3xl border border-bone/10 bg-rust/20 p-8 transition-colors hover:border-ember/50"
            >
              <span className="font-display text-sm text-ember">{c.n}</span>
              <h3 className="mt-4 font-display text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-bone/60">{c.desc}</p>
              <ul className="mt-6 space-y-2 text-sm text-bone/50">
                {c.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-ember" /> {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured work teaser */}
      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12 md:pb-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-4xl font-extrabold md:text-6xl">Selected work</h2>
          <Link to="/work" data-cursor="View all" className="k-link-underline hidden pb-1 text-sm text-bone/60 hover:text-ember md:block">
            All projects →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {work.slice(0, 2).map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
            >
              <Link to="/work" data-cursor="View" className={`group block ${i % 2 === 1 ? 'md:mt-16' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <img
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ember/0 transition-colors duration-500 group-hover:bg-ember/20">
                    <div className="flex h-16 w-16 scale-0 items-center justify-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:scale-100">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-display text-3xl font-bold transition-colors group-hover:text-ember">{w.title}</h3>
                  <span className="text-sm text-bone/40">{w.year}</span>
                </div>
                <p className="text-sm text-bone/50">{w.tag}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-bone/10 bg-rust/20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-12 text-center md:py-16">
              <div className="font-display text-4xl font-extrabold text-ember md:text-6xl">{s.value}</div>
              <div className="mt-2 text-sm text-bone/50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`@keyframes k-marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </motion.div>
  );
}
