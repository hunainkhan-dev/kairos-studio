import { useEffect, useRef, useState } from 'react';

// Context-aware cursor. Grows and shows a label when hovering elements
// tagged with data-cursor. Disabled on touch / reduced-motion (see CSS).
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const enabled = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    enabled.current = true;
    document.body.classList.add('cursor-on');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf;

    const move = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e) => {
      const t = e.target.closest('[data-cursor], a, button');
      if (!t) {
        setActive(false);
        setLabel('');
        return;
      }
      setActive(true);
      setLabel(t.getAttribute('data-cursor') || '');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
      document.body.classList.remove('cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="k-cursor -ml-1 -mt-1 h-2 w-2 rounded-full bg-bone" />
      <div
        ref={ring}
        className="k-cursor flex items-center justify-center rounded-full border border-bone/70 text-[10px] font-medium uppercase tracking-wider text-bone transition-[width,height] duration-200"
        style={{
          width: active ? 72 : 34,
          height: active ? 72 : 34,
          marginLeft: active ? -36 : -17,
          marginTop: active ? -36 : -17,
          backgroundColor: active && label ? 'rgba(249,115,22,0.9)' : 'transparent',
          borderColor: active && label ? 'transparent' : 'rgba(242,237,228,0.6)',
          color: active && label ? '#0c0b09' : '#f2ede4',
        }}
      >
        {active ? label : ''}
      </div>
    </>
  );
}
