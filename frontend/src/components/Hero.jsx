import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import HeroScene from './HeroScene';

/* ── Count-up number ─────────────────────────────────────────────────── */
function CountUp({ target, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target) || 0;
    if (!num) { setCount(target); return; }
    let cur = 0;
    const step = num / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{typeof count === 'number' && count < parseInt(target) ? '' : '+'}</span>;
}

/* ── Animation variants ──────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Stunning Staggered Text Component ────────────────────────────── */
function StunningText({ text, delayOffset = 0, outline = false }) {
  const chars = text.split('');
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.2em', margin: '-0.1em 0' }}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 120, rotateZ: 5, opacity: 0.3 }}
          animate={{ y: 0, rotateZ: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1], // Very sleek Vercel/Apple curve
            delay: delayOffset + index * 0.04
          }}
          style={{
            display: 'inline-block',
            WebkitTextStroke: outline ? '2px var(--text)' : 'none',
            WebkitTextFillColor: outline ? 'transparent' : 'var(--text)',
            color: 'var(--text)', // Fallback
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

const stats = [
  { num: '3', label: 'Systems Built' },
  { num: '2', label: 'Internships' },
  { num: '5', label: 'Certifications' },
];

/* ── Hero Component ───────────────────────────────────────────────────── */
export default function Hero() {
  // Delicate Parallax logic for the massive name typography
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, v => v * 15), { stiffness: 40, damping: 20 });
  const py = useSpring(useTransform(my, v => v * 15), { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <section id="hero" style={sectionStyle}>
      <HeroScene />

      <div style={innerStyle}>
        {/* Top bar (Hidden logic for name since we display the name big) */}
        <motion.div
           initial={{ opacity: 0, y: -12 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.1 }}
           className="hero-top-bar"
        >
          <span className="section-label">Software Engineer</span>
          <div className="hero-socials">
            {[
              { icon: <FaGithub size={16} />,  href: 'https://github.com/parvathyspanicker',          label: 'GitHub' },
              { icon: <FaLinkedin size={16} />, href: 'https://www.linkedin.com/in/parvathyspanicker', label: 'LinkedIn' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="hero-social-link">
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Main 2-Column Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="hero-grid">
          
          {/* ── LEFT content ── */}
          <div className="hero-content">
            {/* Badge */}
            <motion.div variants={item}>
              <span className="hero-badge">
                <span className="pulse-dot" />
                Available for software roles
              </span>
            </motion.div>

            {/* Core Name Typography With Stunning Movement */}
            <motion.h1 className="hero-title" style={{ x: px, y: py }}>
              <StunningText text="Parvathy" delayOffset={0.1} />
              <br />
              <StunningText text="S Panicker." delayOffset={0.5} outline={true} />
            </motion.h1>

            {/* Description */}
            <motion.p variants={item} className="hero-desc">
              Software Engineer dedicated to building robust backends, scalable architecture, and seamless AI integrations. 
              My focus is creating technology that simply works perfectly.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={item} className="hero-buttons">
              <a href="#projects" className="btn-primary" style={{ padding: '0.9rem 2.2rem', gap: '0.6rem' }}>
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline" style={{ padding: '0.9rem 2.2rem', gap: '0.6rem' }}>
                <Mail size={16} /> Contact Me
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="hero-stats">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="stat-number">
                    <CountUp target={s.num} />
                  </div>
                  <div className="stat-label">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT content (Photo) ── */}
          <motion.div variants={item} className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img 
                src="/profile.jpg" 
                alt="Parvathy S Panicker"
                className="hero-image"
              />
              {/* Animated glassmorphic overlay for the stunning feel */}
              <div className="glass-sheen" />
            </div>
            
            {/* Subtle decorative corners to frame the image professionally */}
            <div className="corner-tl" />
            <div className="corner-br" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        /* ── Hero CSS ── */
        .hero-top-bar {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1rem;
        }
        .hero-socials { display: flex; gap: 0.8rem; }
        .hero-social-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.2rem; border-radius: 60px;
          border: 1px solid var(--border); background: rgba(255,255,255,0.03);
          font-size: 0.85rem; font-weight: 500; color: var(--text-mid);
          transition: all 0.2s ease; backdrop-filter: blur(8px);
        }
        .hero-social-link:hover { border-color: var(--accent); color: var(--text); background: var(--accent-light); }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.4rem 1rem; border-radius: 60px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--border);
          color: var(--text); font-size: 0.8rem; font-weight: 600;
          backdrop-filter: blur(10px);
        }
        .pulse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 7vw, 6.2rem);
          font-weight: 900; line-height: 1.05;
          letter-spacing: -0.03em; color: var(--text);
          margin: 1.5rem 0 1.2rem;
        }

        .hero-desc {
          font-size: clamp(1.05rem, 1.5vw, 1.2rem);
          color: var(--text-mid); line-height: 1.7; width: 100%; max-width: 580px;
          margin-bottom: 2.5rem; font-weight: 400;
        }

        .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }

        .hero-stats {
          display: flex; gap: 3.5rem; margin-top: 4.5rem;
          flex-wrap: wrap; border-top: 1px solid var(--border); padding-top: 2.5rem;
          max-width: 600px;
        }
        .stat-number {
          font-size: 2.2rem; font-weight: 800; font-family: var(--font-display);
          letter-spacing: -0.04em; line-height: 1; color: var(--text);
        }
        .stat-label {
          font-size: 0.75rem; color: var(--text-muted); font-weight: 600;
          margin-top: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* ── Image Styles ── */
        .hero-image-wrapper {
          position: relative;
          z-index: 10;
        }
        .hero-image-frame {
          width: 380px; height: 500px;
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 4px 10px rgba(255,92,0,0.1);
          border: 1px solid var(--border);
          background: var(--bg-card);
          position: relative;
        }
        .hero-image {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          transition: transform 0.8s ease;
        }
        .hero-image-frame:hover .hero-image {
          transform: scale(1.04);
        }
        
        .glass-sheen {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 60%, rgba(255,92,0,0.1) 100%);
          z-index: 2;
        }

        .corner-tl, .corner-br {
          position: absolute; width: 40px; height: 40px;
          pointer-events: none;
        }
        .corner-tl {
          top: -10px; left: -10px;
          border-top: 3px solid var(--text); border-left: 3px solid var(--text);
        }
        .corner-br {
          bottom: -10px; right: -10px;
          border-bottom: 3px solid var(--text); border-right: 3px solid var(--text);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
           .hero-title { font-size: 4rem; }
           .hero-image-frame { width: 300px; height: 400px; }
        }
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
          .hero-desc { margin: 0 auto 2.5rem; }
          .hero-buttons, .hero-stats { justify-content: center; margin-left: auto; margin-right: auto; }
          .hero-image-wrapper { margin: 0 auto; margin-top: 2rem; width: fit-content; }
        }
      `}</style>
    </section>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────── */
const sectionStyle = {
  minHeight: '100vh',
  padding: '0 max(2.5rem, 8vw)',
  paddingTop: '5rem', paddingBottom: '4rem',
  position: 'relative', overflow: 'hidden',
};
const innerStyle  = { maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 };
