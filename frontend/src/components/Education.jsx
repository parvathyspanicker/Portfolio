import { motion } from 'framer-motion';

const education = [
  {
    degree: 'Integrated MCA',
    school: 'Amal Jyothi College of Engineering',
    univ: 'APJ Abdul Kalam Technological University',
    duration: '2021 – 2026',
    grade: 'CGPA: 7.2',
    icon: '🎓',
  },
  {
    degree: 'Senior Secondary (XII)',
    school: 'C.Kesavan Memorial Higher Secondary School',
    univ: 'Kerala State Board',
    duration: '2019 – 2021',
    grade: '83%',
    icon: '📚',
  },
];

const certifications = [
  { title: 'Meta Full Stack Developer Specialization', issuer: 'Coursera' },
  { title: 'Generative AI Certified Professional', issuer: 'Oracle OCI (Valid till Jul 2026)' },
  { title: 'Google Data Analytics Professional Certificate', issuer: 'Google' },
  { title: 'Python for Data Science', issuer: 'NPTEL' },
  { title: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Education() {
  return (
    <section id="education" style={{ padding: '7rem max(2.5rem, 8vw)', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-label">Academic & Professional Growth</span>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}>
            Education &{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Certifications</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Education */}
          <div>
            <h3 style={subheadStyle}>Academic Background</h3>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.12 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
            >
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bento-card"
                  style={{ padding: '1.6rem' }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '12px', flexShrink: 0,
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem',
                    }}>
                      {edu.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                        {edu.degree}
                      </h4>
                      <p style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--accent)', marginBottom: '0.15rem' }}>
                        {edu.school}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        {edu.univ}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.75rem', color: 'var(--text-mid)',
                          background: 'var(--bg)', padding: '0.2rem 0.75rem',
                          borderRadius: '60px', border: '1px solid var(--border)',
                          fontFamily: 'var(--font-mono)', fontWeight: 600,
                        }}>
                          {edu.duration}
                        </span>
                        <span style={{
                          fontSize: '0.88rem', fontWeight: 800, color: 'var(--text)',
                          fontFamily: 'var(--font-display)',
                        }}>
                          {edu.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <div>
            <h3 style={subheadStyle}>Certifications</h3>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 1.2rem',
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderLeft: '3px solid var(--accent)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-card)',
                    cursor: 'default',
                    transition: 'box-shadow 0.25s ease',
                  }}
                >
                  {/* Check icon */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--accent-light)', border: '1.5px solid rgba(232,98,26,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 800,
                  }}>
                    ✓
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.1rem', lineHeight: 1.4 }}>
                      {cert.title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cert.issuer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const subheadStyle = {
  fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: '0.16em', color: 'var(--text-muted)',
  fontFamily: 'var(--font-mono)', marginBottom: '1.5rem',
};
