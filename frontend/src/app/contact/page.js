'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Contact Us</h1>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Have a question or want to list your property? Reach out to us!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Get in Touch</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '0.75rem',
                  background: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>📞</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Phone</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>+91 98765 43210</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Mon-Sat, 9 AM - 8 PM</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '0.75rem',
                  background: 'var(--color-secondary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>📧</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Email</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>info@bharatyatristay.com</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>We reply within 24 hours</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '0.75rem',
                  background: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>📍</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Office</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Prayagraj, Uttar Pradesh, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '0.75rem',
                  background: '#DCFCE7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>💬</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>WhatsApp</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>+91 98765 43210</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Quick responses!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid var(--color-border)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>✅</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Thank you!</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>We&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Send us a Message</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                  <input type="text" className="input-field" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <input type="email" className="input-field" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    <input type="tel" className="input-field" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <textarea className="input-field" placeholder="Your message..." rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required style={{ resize: 'vertical' }} />
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message →</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
