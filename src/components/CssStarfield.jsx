import { useMemo } from 'react';

// Pure-CSS animated starfield — the fallback shown when WebGL is unavailable
// or blocked (e.g. a privacy/anti-fingerprint extension). No WebGL required,
// so it renders everywhere and keeps the hero alive instead of going black.
export default function CssStarfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 110 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.4 + 0.8,
        delay: Math.random() * 5,
        dur: 2.6 + Math.random() * 3.6,
        amber: Math.random() > 0.7,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* soft ember wash to give the field depth */}
      <div
        className="absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)' }}
      />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.amber ? '#f97316' : '#f2ede4',
            boxShadow: s.amber ? '0 0 6px #f97316' : '0 0 4px rgba(242,237,228,0.6)',
            animation: `k-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes k-twinkle { 0%,100% { opacity: 0.15; transform: translateY(0); } 50% { opacity: 0.95; transform: translateY(-5px); } }`}</style>
    </div>
  );
}
