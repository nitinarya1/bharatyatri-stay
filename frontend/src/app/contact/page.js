'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '4rem 1rem', background: 'var(--color-surface-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
          {t('contactUs')}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          We're here to help you 24/7. Reach out to us for any queries about your bookings, property listings, or general support.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Contact Details */}
          <div className="glass shadow-medium" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'white' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Corporate Office</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Address</strong>
                <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>MNNIT Campus, Teliarganj<br/>Prayagraj, Uttar Pradesh 211004</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Phone Support</strong>
                <a href="tel:+919876543210" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' }}>+91 98765 43210</a>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Email Us</strong>
                <a href="mailto:support@bharatyatri.com" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none' }}>support@bharatyatri.com</a>
              </div>
            </div>
          </div>

          {/* Quick Form */}
          <div className="glass shadow-medium" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'var(--color-primary)', color: 'white' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Your Name" style={{ padding: '0.85rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
              <input type="email" placeholder="Your Email" style={{ padding: '0.85rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
              <textarea placeholder="How can we help?" rows="4" style={{ padding: '0.85rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
              <button className="btn-primary" style={{ background: 'white', color: 'var(--color-primary)', border: 'none', padding: '0.85rem', borderRadius: '50px', fontWeight: 800, marginTop: '0.5rem', cursor: 'not-allowed' }}>
                Submit Enquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
