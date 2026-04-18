import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFine) return;
    document.body.classList.add('custom-cursor-active');

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    const onMove = e => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      if (ringRef.current) {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Detect hover on interactive elements
    const enters = e => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) setHovering(true);
    };
    const leaves = e => {
      if (e.target.closest('a, button, input, textarea, [role="button"]')) setHovering(false);
    };
    document.addEventListener('mouseover', enters);
    document.addEventListener('mouseout', leaves);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', enters);
      document.removeEventListener('mouseout', leaves);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', zIndex: 99998, pointerEvents: 'none',
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--accent)',
          transition: 'transform 0.05s linear, opacity 0.2s',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', zIndex: 99997, pointerEvents: 'none',
          width: 32, height: 32, borderRadius: '50%',
          border: hovering ? '2px solid var(--accent)' : '1.5px solid var(--text-muted)',
          transform: 'translate(-100px, -100px)',
          transition: 'border 0.2s ease, width 0.2s ease, height 0.2s ease',
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
        }}
      />

      <style>{`
        body.custom-cursor-active,
        body.custom-cursor-active * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
