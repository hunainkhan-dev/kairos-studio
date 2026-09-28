import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 mix-blend-difference">
        <Link to="/" data-cursor="Home" className="font-display text-2xl font-extrabold tracking-tight">
          KAIROS
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`k-link-underline pb-1 transition-colors ${
                pathname === l.to ? 'text-ember' : 'hover:text-ember'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/studio"
          data-cursor="Say hi"
          className="hidden rounded-full border border-bone/40 px-5 py-2 text-sm transition-colors hover:bg-bone hover:text-ink md:inline-block"
        >
          Start a project
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-6 rounded-3xl border border-bone/10 bg-ink/95 p-6 backdrop-blur md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`block py-3 font-display text-3xl font-bold ${
                  pathname === l.to ? 'text-ember' : ''
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
