import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'About',     href: '#hero' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection]   = useState('hero');
  const [mobileOpen, setMobileOpen]         = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      const winH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(winH > 0 ? (window.scrollY / winH) * 100 : 0);
      const sections = ['hero', 'skills', 'projects', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '0.9rem 3rem' : '1.4rem 3rem',
          background: scrolled ? 'rgba(9,9,11,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            style={{
              width: 38, height: 38, borderRadius: '10px',
              background: 'var(--text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.85rem', fontWeight: 800, color: 'var(--bg)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
            }}
          >
            PSP
          </motion.div>
          <span style={{
            fontWeight: 700, fontSize: '1rem',
            color: 'var(--text)', letterSpacing: '-0.02em',
            fontFamily: 'var(--font-body)',
          }}>
            Parvathy
            <span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul
          className="desktop-nav"
          style={{
            display: 'flex', gap: '0.2rem', listStyle: 'none',
            margin: 0, padding: 0,
          }}
        >
          {links.map(l => {
            const id = l.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{
                    padding: '0.45rem 0.9rem',
                    borderRadius: '60px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--accent)' : 'var(--text-mid)',
                    background: isActive ? 'var(--accent-light)' : 'transparent',
                    display: 'block',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(15,15,15,0.05)'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-mid)'; e.currentTarget.style.background = 'transparent'; }}}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right — CTA + mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <motion.a
            href="mailto:Parvathyspanicker50@gmail.com"
            className="btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.88rem', textDecoration: 'none' }}
          >
            Hire Me ✦
          </motion.a>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none', background: 'var(--bg-card)',
              border: '1px solid var(--border)', borderRadius: '8px',
              padding: '0.5rem', cursor: 'pointer',
              flexDirection: 'column', gap: '4px',
              alignItems: 'center', justifyContent: 'center',
              width: 38, height: 38,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 18, height: 2,
                background: 'var(--text)', borderRadius: 1,
                transition: 'all 0.3s ease',
                transform: i === 0 && mobileOpen ? 'rotate(45deg) translate(3px,3px)'
                         : i === 2 && mobileOpen ? 'rotate(-45deg) translate(3px,-3px)'
                         : 'none',
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
            background: 'rgba(9,9,11,0.95)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem 2rem',
            display: 'flex', flexDirection: 'column', gap: '0.6rem',
          }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--text)', fontSize: '1.05rem', fontWeight: 600,
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}
