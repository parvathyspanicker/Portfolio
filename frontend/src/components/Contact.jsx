import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const contactInfo = [
  { icon: <Mail size={17} />, label: 'Email', value: 'Parvathyspanicker50@gmail.com', href: 'mailto:Parvathyspanicker50@gmail.com' },
  { icon: <Phone size={17} />, label: 'Phone', value: '+91 9744827356', href: 'tel:+919744827356' },
  { icon: <MapPin size={17} />, label: 'Location', value: 'Kottayam, Kerala', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else throw new Error();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '7rem max(2.5rem, 8vw)', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Blob */}
      <div className="blob-accent" style={{ width: 500, height: 500, bottom: -100, left: '20%' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>Let's work together</span>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Get In{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Touch</span>
          </h2>
          <p style={{ color: 'var(--text-mid)', maxWidth: '480px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
            I'm actively looking for Software Engineer Trainee opportunities. Whether you have a role in mind or just want to connect — my inbox is always open.
          </p>
        </motion.div>

        {/* Contact info pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem',
            marginBottom: '3.5rem',
          }}
        >
          {contactInfo.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.65rem 1.2rem',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '60px', boxShadow: 'var(--shadow-card)',
            }}>
              <span style={{ color: 'var(--accent)' }}>{c.icon}</span>
              {c.href ? (
                <a href={c.href} style={{
                  fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                >
                  {c.value}
                </a>
              ) : (
                <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)' }}>
                  {c.value}
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Main grid: form + social */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          {/* Left — social + note */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="bento-card" style={{ padding: '2rem', marginBottom: '1.2rem' }}>
              <h3 className="display-heading" style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>
                Let's build something{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>great</span>.
              </h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.8rem' }}>
                I'm passionate about creating elegant solutions to complex problems. Let's talk about how I can contribute to your team.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {[
                  { icon: <FaGithub size={17} />, href: 'https://github.com/parvathyspanicker', label: 'GitHub' },
                  { icon: <FaLinkedin size={17} />, href: 'https://www.linkedin.com/in/parvathyspanicker', label: 'LinkedIn' },
                ].map((s, i) => (
                  <motion.a
                    key={i} href={s.href} target="_blank" rel="noreferrer"
                    className="btn-outline"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ fontSize: '0.88rem', textDecoration: 'none' }}
                  >
                    {s.icon} {s.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="bento-card" style={{ padding: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 10px #22c55e',
                flexShrink: 0,
              }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>Available for Work</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Open to full-time & internship roles
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  name="name" value={form.name} onChange={handleChange} required
                  placeholder="Your name" className="form-input"
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="your@email.com" className="form-input"
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} required
                placeholder="Tell me about the opportunity..." rows={5}
                className="form-input" style={{ resize: 'vertical' }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ justifyContent: 'center', width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
            >
              {status === 'sending' ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                  Sending…
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Send size={16} /> Send Message
                </span>
              )}
            </motion.button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.9rem' }}
              >
                <CheckCircle size={15} /> Message sent! I'll reply soon.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.9rem' }}
              >
                <XCircle size={15} /> Failed to send. Check if backend is running.
              </motion.p>
            )}
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            textAlign: 'center', marginTop: '6rem', paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            color: 'var(--text-muted)', fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Designed & Built with{' '}
          <span style={{ color: 'var(--accent)' }}>♥</span>{' '}
          by Parvathy S Panicker · {new Date().getFullYear()}
        </motion.div>
      </div>
    </section>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)',
  textTransform: 'uppercase', letterSpacing: '0.1em',
  fontFamily: 'var(--font-mono)', marginBottom: '0.4rem',
};
