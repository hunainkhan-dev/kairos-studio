import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { team, process, stats } from '../data.js';

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const ease = [0.33, 1, 0.68, 1];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const budgets = ['< $5k', '$5k – $15k', '$15k – $40k', '$40k +'];

export default function Studio() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState({ name: '', email: '', budget: budgets[1], message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (name.length < 2 || name.length > 80) er.name = 'Please enter your name.';
    if (!EMAIL_RE.test(email) || email.length > 120) er.email = 'Enter a valid email address.';
    if (message.length < 10) er.message = 'Tell us a little more (10+ characters).';
    if (message.length > 1200) er.message = 'That is a bit long — keep it under 1200 characters.';
    return er;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    // Demo only — no real network call. Simulate a request.
    setTimeout(() => setStatus('sent'), 900);
  };

  return (
    <motion.div {...pageMotion}>
      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-40 md:px-12">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ember">The studio</p>
        <h1 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.02] md:text-7xl">
          We&apos;re a small team who believe the work should{' '}
          <span className="italic text-ember">feel</span> like something. No templates. No filler.
        </h1>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <div className="grid gap-6 md:grid-cols-4">
          {process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="rounded-3xl border border-bone/10 p-6"
            >
              <span className="font-display text-sm text-ember">{p.n}</span>
              <h3 className="mt-3 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-bone/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <h2 className="mb-10 font-display text-3xl font-extrabold md:text-5xl">The people</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="rounded-3xl border border-bone/10 bg-rust/20 p-6">
              <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-ember to-rust" />
              <h3 className="font-display text-xl font-bold">{m.name}</h3>
              <p className="text-sm text-bone/50">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid gap-12 rounded-[2rem] border border-bone/10 bg-rust/20 p-8 md:grid-cols-2 md:p-14">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ember">Start a project</p>
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Tell us what you&apos;re making.
            </h2>
            <p className="mt-6 max-w-md text-bone/60">
              The more context the better — where you are now, where you want to be,
              and roughly when. We reply to every real enquiry within two working days.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-extrabold text-ember">{s.value}</div>
                  <div className="text-sm text-bone/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {status === 'sent' ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-start justify-center rounded-3xl border border-ember/40 bg-ink/40 p-10"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ember text-ink">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="font-display text-3xl font-bold">Thanks, {form.name.trim().split(' ')[0]}.</h3>
              <p className="mt-3 text-bone/60">
                Your message is in. In a real build this would hit our inbox — here it&apos;s a
                demonstration of the flow, validated and ready to wire to email or a CRM.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <Field label="Your name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={set('name')}
                  maxLength={80}
                  autoComplete="name"
                  className="k-input"
                  placeholder="Ada Lovelace"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  maxLength={120}
                  autoComplete="email"
                  className="k-input"
                  placeholder="you@company.com"
                />
              </Field>
              <div>
                <label className="mb-2 block text-sm text-bone/60">Budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setForm((f) => ({ ...f, budget: b }))}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                        form.budget === b
                          ? 'border-ember bg-ember text-ink'
                          : 'border-bone/20 text-bone/70 hover:border-ember/50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="About the project" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={set('message')}
                  maxLength={1200}
                  rows={4}
                  className="k-input resize-none"
                  placeholder="We're launching a new brand and need a site that feels premium…"
                />
              </Field>
              <button
                type="submit"
                disabled={status === 'sending'}
                data-cursor="Send"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-8 py-3 font-medium text-ink transition-transform hover:scale-[1.03] disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  'Send enquiry'
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .k-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(242,237,228,0.15);
          background: rgba(12,11,9,0.4);
          padding: 0.85rem 1rem;
          color: #f2ede4;
          outline: none;
          transition: border-color 0.2s;
        }
        .k-input:focus { border-color: #f97316; }
        .k-input::placeholder { color: rgba(242,237,228,0.3); }
      `}</style>
    </motion.div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-bone/60">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-sm text-ember">{error}</p>}
    </div>
  );
}
