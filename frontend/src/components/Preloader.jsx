import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'var(--bg)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 64, height: 64, borderRadius: '16px',
              background: 'var(--text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', fontWeight: 900, color: 'var(--bg)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
            }}
          >
            PSP
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: '180px' }}>
            <div style={{
              height: '2px', width: '100%',
              background: 'var(--border)',
              borderRadius: '1px', overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%', background: 'var(--accent)',
                  borderRadius: '1px',
                  width: `${progress}%`,
                  transition: 'width 0.08s linear',
                }}
              />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: '0.6rem',
            }}>
              <span style={{
                fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)', fontWeight: 500,
                letterSpacing: '0.06em',
              }}>
                Loading
              </span>
              <span style={{
                fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
                color: 'var(--accent)', fontWeight: 700,
              }}>
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
