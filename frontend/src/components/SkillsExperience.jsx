import { useRef } from 'react';
import { motion } from 'framer-motion';

/* ── Data ────────────────────────────────────────────────────────────── */
const skills = [
  { num: '01', category: 'Languages',       items: ['Java', 'Python', 'JavaScript', 'C', 'C++'],                                               accent: '#E8621A' },
  { num: '02', category: 'Web & Frameworks', items: ['React.js', 'Node.js', 'Express.js', 'Django', 'ASP.NET', 'HTML', 'CSS'],                   accent: '#0F0F0F' },
  { num: '03', category: 'Database & Cloud', items: ['MongoDB', 'MySQL', 'REST APIs', 'DBMS'],                                                   accent: '#E8621A' },
  { num: '04', category: 'Tools & Concepts', items: ['Git', 'GitHub', 'Postman', 'VS Code', 'OOP', 'Data Structures'],                           accent: '#0F0F0F' },
];

const ALL_SKILLS = [
  'Java', 'Python', 'JavaScript', 'C', 'C++', 'React.js', 'Node.js',
  'Express.js', 'Django', 'Flask', 'MongoDB', 'MySQL', 'REST APIs',
  'Git', 'GitHub', 'Postman', 'OOP', 'Data Structures', 'CNN', 'ASP.NET',
];

const experience = [
  {
    role: 'Python Django Intern',
    company: 'Zoople Technologies',
    year: '2024',
    desc: 'Built and maintained robust backend services. Implemented RESTful API endpoints and handled server-side logic using Django.',
    tags: ['Django', 'Python', 'REST API'],
  },
  {
    role: 'Machine Learning Intern',
    company: 'ICFOSS',
    year: '2023',
    desc: 'Worked with real-world ML datasets, performed data preprocessing, and assisted in implementing and evaluating ML model performance.',
    tags: ['Python', 'ML', 'Data Science'],
  },
];

/* ── Infinite marquee ────────────────────────────────────────────────── */
function SkillsMarquee() {
  const doubled = [...ALL_SKILLS, ...ALL_SKILLS];
  return (
    <div style={{
      overflow: 'hidden', width: '100%',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '0.9rem 0', marginBottom: '5rem',
      background: 'var(--bg-card)',
      position: 'relative',
    }}>
      {/* fade edges */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--bg-card) 0%, transparent 8%, transparent 92%, var(--bg-card) 100%)',
      }} />
      <div style={{ display: 'flex', gap: '2.5rem', width: 'max-content', animation: 'marquee 30s linear infinite' }}>
        {doubled.map((s, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', opacity: 0.7 }} />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 3D Tilt card wrapper ────────────────────────────────────────────── */
function TiltCard({ children, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${y * -9}deg) rotateY(${x * 9}deg) translateY(-4px)`;
    el.style.boxShadow = 'var(--shadow-hover)';
  };
  const onLeave = () => {
    ref.current.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    ref.current.style.boxShadow = 'var(--shadow-card)';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ ...style, transition: 'transform 0.35s ease, box-shadow 0.35s ease', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

/* ── Animations ──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ── Component ───────────────────────────────────────────────────────── */
export default function SkillsExperience() {
  return (
    <section id="skills" style={{ padding: '7rem 0 0', position: 'relative' }}>
      {/* Section header */}
      <div style={{ padding: '0 max(2.5rem, 8vw)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '1160px', margin: '0 auto 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <span className="section-label">What I bring</span>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
              Skills &{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Experience</span>
            </h2>
          </div>
          <p style={{ maxWidth: '360px', color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            A multidisciplinary developer with hands-on experience across the modern software stack.
          </p>
        </motion.div>
      </div>

      {/* Infinite marquee strip */}
      <SkillsMarquee />

      <div style={{ padding: '0 max(2.5rem, 8vw)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          {/* Bento skill grid */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            transition={{ staggerChildren: 0.08 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))', gap: '1.2rem', marginBottom: '4.5rem' }}
          >
            {skills.map((group, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TiltCard style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.8rem', boxShadow: 'var(--shadow-card)', overflow: 'hidden', position: 'relative' }}>
                  {/* Glow on accent cards */}
                  {group.accent === '#E8621A' && (
                    <div style={{
                      position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(232,98,26,0.1), transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                  )}
                  {/* Ghost number */}
                  <div style={{
                    fontSize: '4rem', fontWeight: 900, lineHeight: 1,
                    color: group.accent === '#E8621A' ? 'rgba(232,98,26,0.08)' : 'rgba(15,15,15,0.06)',
                    fontFamily: 'var(--font-display)', letterSpacing: '-0.04em',
                    marginBottom: '0.4rem', userSelect: 'none',
                    position: 'relative', zIndex: 1,
                  }}>
                    {group.num}
                  </div>
                  <h3 style={{
                    fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase',
                    letterSpacing: '0.16em', color: group.accent,
                    fontFamily: 'var(--font-mono)', marginBottom: '1.2rem',
                    position: 'relative', zIndex: 1,
                  }}>
                    {group.category}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                    {group.items.map((item, j) => (
                      <motion.span
                        key={j}
                        whileHover={{ scale: 1.07, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                        className="skill-pill"
                        style={{ transition: 'all 0.2s ease' }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <hr className="hr-full" style={{ marginBottom: '4rem' }} />

          {/* Experience title */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">Professional Journey</span>
            <h3 className="display-heading" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
              Work <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Experience</span>
            </h3>
          </motion.div>

          {/* Experience cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', paddingBottom: '1rem' }}>
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TiltCard style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '2rem', boxShadow: 'var(--shadow-card)', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 10,
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 800, color: 'var(--text)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {exp.year}
                    </div>
                    <div style={{
                      padding: '0.25rem 0.75rem', borderRadius: 60,
                      background: 'var(--accent-light)', border: '1px solid rgba(232,98,26,0.2)',
                      fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                    }}>
                      Internship
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{exp.role}</h4>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.8rem' }}>{exp.company}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.72, marginBottom: '1.2rem' }}>{exp.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {exp.tags.map((t, j) => (
                      <span key={j} className="skill-pill" style={{ fontSize: '0.74rem' }}>{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: '5rem' }} />
    </section>
  );
}
