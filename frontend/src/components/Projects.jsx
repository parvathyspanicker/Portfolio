import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    num: '01',
    title: 'NeuroCare AI',
    tag: 'Healthcare · AI · Full-Stack',
    desc: 'A cloud-based healthcare system featuring MRI image upload with CNN-based predictions, role-based authentication (Patient, Doctor, Admin), and real-time doctors chat with typing indicators.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Flask', 'Python', 'CNN'],
    github: 'https://github.com/parvathyspanicker/neuro',
    link: 'https://neuro-orpin.vercel.app/',
    featured: true,
  },
  {
    num: '02',
    title: 'Library Management System',
    tag: 'Desktop · Java · DBMS',
    desc: 'Java desktop application automating library operations: book issue, return and record management. Designed with OOP principles and MySQL for efficient data storage and retrieval.',
    tech: ['Java', 'MySQL', 'OOP', 'DBMS'],
    github: '#',
    link: '#',
    featured: false,
  },
  {
    num: '03',
    title: 'Happy Tails',
    tag: 'Web · PHP · jQuery',
    desc: 'A web-based pet care management platform with appointment booking, service request handling, UI testing and form validation. Dynamic interactions powered by AJAX and jQuery.',
    tech: ['PHP', 'MySQL', 'Bootstrap', 'AJAX', 'jQuery', 'JavaScript'],
    github: '#',
    link: '#',
    featured: false,
  },
];

/* ── 3D tilt row ─────────────────────────────────────────────────────── */
function TiltRow({ children, style }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
    el.style.background = 'rgba(0,0,0,0.02)';
  };
  const onLeave = () => {
    ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    ref.current.style.background = 'transparent';
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ ...style, transition: 'transform 0.35s ease, background 0.3s ease', transformStyle: 'preserve-3d', borderRadius: 12 }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative amber glow for light background */}
      <div style={{
        position: 'absolute', top: -200, right: -200, width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,0,0.06), transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -150, left: '10%', width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,0,0.04), transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '7rem max(2.5rem, 8vw)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}
        >
          <div>
            <span className="section-label" style={{ color: 'var(--text-muted)' }}>What I've built</span>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: 'var(--text)' }}>
              Featured{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Projects</span>
            </h2>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {projects.length} projects
          </span>
        </motion.div>

        {/* Project rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <TiltRow style={{
                padding: '2.5rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '2rem',
                alignItems: 'flex-start',
              }}>
                {/* Number */}
                <span style={{
                  fontSize: '0.76rem', fontWeight: 800,
                  color: p.featured ? 'var(--accent)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.12em',
                  paddingTop: '0.4rem',
                }}>
                  {p.num}
                </span>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                      fontWeight: 800, color: 'var(--text)',
                      letterSpacing: '-0.025em',
                      transition: 'color 0.2s ease',
                    }}>
                      {p.title}
                    </h3>
                    {p.featured && (
                      <span style={{
                        padding: '0.25rem 0.8rem', borderRadius: 60,
                        background: 'var(--accent)', color: '#fff',
                        fontSize: '0.68rem', fontWeight: 800,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        alignSelf: 'center', flexShrink: 0,
                        boxShadow: '0 0 15px rgba(255,106,0,0.3)',
                        animation: 'featuredPulse 2.5s ease-in-out infinite',
                      }}>
                        ★ Featured
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.82rem', color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)', marginBottom: '0.9rem',
                    letterSpacing: '0.04em', fontWeight: 600
                  }}>
                    {p.tag}
                  </p>
                  <p style={{ color: 'var(--text-mid)', lineHeight: 1.78, fontSize: '0.93rem', marginBottom: '1.6rem', maxWidth: '600px' }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {p.tech.map((t, j) => (
                      <span key={j} style={{
                        padding: '0.3rem 0.75rem', borderRadius: 60,
                        border: '1px solid var(--border)',
                        fontSize: '0.76rem', fontWeight: 500,
                        color: 'var(--text-mid)',
                        fontFamily: 'var(--font-mono)',
                        transition: 'all 0.2s ease',
                        background: 'var(--bg)'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-mid)'; }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '0.3rem', flexShrink: 0 }}>
                  <motion.a
                    href={p.github} target="_blank" rel="noreferrer"
                    whileHover={{ y: -3, backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    style={iconBtnStyle} title="GitHub"
                  >
                    <FaGithub size={17} />
                  </motion.a>
                  <motion.a
                    href={p.link} target="_blank" rel="noreferrer"
                    whileHover={{ y: -3, backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                    style={iconBtnStyle} title="Live Demo"
                  >
                    <ExternalLink size={17} />
                  </motion.a>
                </div>
              </TiltRow>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}
          style={{ marginTop: '3.5rem', textAlign: 'center' }}
        >
          <a
            href="https://github.com/parvathyspanicker" target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500,
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            View all on GitHub <FaGithub size={14} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes featuredPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(255,106,0,0.2); }
          50%       { box-shadow: 0 0 25px rgba(255,106,0,0.5); }
        }
      `}</style>
    </section>
  );
}

const iconBtnStyle = {
  width: 38, height: 38,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 10,
  border: '1px solid var(--border)',
  color: 'var(--text-muted)',
  transition: 'all 0.22s ease',
  textDecoration: 'none',
  background: 'var(--bg-card)'
};
