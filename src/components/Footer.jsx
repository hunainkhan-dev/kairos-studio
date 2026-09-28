import { Link } from 'react-router-dom';

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Behance', href: 'https://behance.net' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 px-6 pb-10 pt-20 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-ember">Have something in mind?</p>
        <Link
          to="/studio"
          data-cursor="Let's talk"
          className="group inline-block font-display font-extrabold leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)' }}
        >
          <span className="transition-colors group-hover:text-ember">Let&apos;s talk</span>
        </Link>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-bone/10 pt-8 text-sm text-bone/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Kairos Studio — a portfolio case study</span>
          <span className="order-3 md:order-2">Built to demonstrate the craft, not a real agency</span>
          <div className="order-2 flex gap-6 md:order-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
