import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { work } from '../data.js';

gsap.registerPlugin(ScrollTrigger);

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const ease = [0.33, 1, 0.68, 1];

export default function Work() {
  const reduced = useReducedMotion();
  const panel = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const el = track.current;
        if (!el) return;
        const distance = () => el.scrollWidth - window.innerWidth + 96;
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: panel.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <motion.div {...pageMotion}>
      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-40 md:px-12">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ember">Selected work</p>
        <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] md:text-8xl">
          The work is <span className="italic text-ember">the argument.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-bone/60">
          A few projects that show how we think. Every one started as a business
          problem and ended as something people wanted to share.
        </p>
        <p className="mt-6 hidden text-sm text-bone/40 md:block">Scroll — the case studies move sideways →</p>
      </section>

      {/* Desktop: pinned horizontal scroll */}
      <section ref={panel} className="relative hidden h-screen overflow-hidden md:block">
        <div ref={track} className="flex h-full items-center gap-8 px-12">
          {work.map((w, i) => (
            <article
              key={w.slug}
              className="group relative h-[70vh] w-[70vw] max-w-[820px] shrink-0 overflow-hidden rounded-[2rem] border border-bone/10"
            >
              <img src={w.img} alt={w.title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-extrabold text-bone/20">0{i + 1}</span>
                  <span className="rounded-full border border-bone/30 px-4 py-1 text-xs uppercase tracking-wider">{w.discipline}</span>
                </div>
                <div>
                  <p className="text-sm text-ember">{w.tag} · {w.year}</p>
                  <h2 className="mt-2 font-display text-5xl font-extrabold">{w.title}</h2>
                  <p className="mt-4 max-w-md text-bone/70">{w.blurb}</p>
                </div>
              </div>
            </article>
          ))}
          {/* Closing card */}
          <div className="flex h-[70vh] w-[50vw] max-w-[520px] shrink-0 flex-col items-start justify-center rounded-[2rem] border border-ember/30 bg-rust/20 p-12">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">Want to be next?</h2>
            <p className="mt-4 text-bone/60">We take on a handful of projects a quarter so each one gets the attention it needs.</p>
            <Link to="/studio" data-cursor="Say hi" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-medium text-ink transition-transform hover:scale-105">
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile / reduced-motion: vertical stack */}
      <section className="mx-auto max-w-2xl space-y-10 px-6 py-12 md:hidden">
        {work.map((w, i) => (
          <motion.article
            key={w.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden rounded-3xl border border-bone/10"
          >
            <img src={w.img} alt={w.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-6">
              <p className="text-sm text-ember">{w.tag} · {w.year}</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold">{w.title}</h2>
              <p className="mt-3 text-sm text-bone/60">{w.blurb}</p>
            </div>
          </motion.article>
        ))}
        <Link to="/studio" className="block rounded-3xl border border-ember/30 bg-rust/20 p-8 text-center">
          <span className="font-display text-2xl font-bold">Want to be next? →</span>
        </Link>
      </section>
    </motion.div>
  );
}
