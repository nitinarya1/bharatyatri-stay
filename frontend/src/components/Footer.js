'use client';
import Link from 'next/link';

const Icons = {
  Phone: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Mail: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
};


function FooterLink({ href, children }) {
  return (
    <Link href={href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s', fontWeight: 500 }}
      onMouseEnter={e => e.target.style.color = '#F28E2B'}
      onMouseLeave={e => e.target.style.color = '#94a3b8'}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: '#0a192f',
      color: '#94a3b8',
      padding: '5rem 0 2rem',
      marginTop: '5rem',
      borderTop: '1px solid #1e293b'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ position: 'relative', height: '48px', width: '180px', marginBottom: '1.5rem', filter: 'brightness(1.1)' }}>
              <img src="/logo.png" alt="BharatYatri Stay" style={{ height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#94a3b8', maxWidth: '300px' }}>
              BharatYatri Stay is India&apos;s leading platform for budget-conscious spiritual travelers. We offer curated, verified stays near India&apos;s most sacred destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Cities
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <FooterLink href="/search?city=Prayagraj">Prayagraj Stays</FooterLink>
              <FooterLink href="/search?city=Varanasi">Varanasi Stays</FooterLink>
              <FooterLink href="/about">About Our Mission</FooterLink>
              <FooterLink href="/contact">Partner With Us</FooterLink>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/privacy#refund">Booking & Refunds</FooterLink>
              <FooterLink href="/contact">Help Center</FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#F28E2B' }}><Icons.Phone /></span>
                <span>+91 91234 56789</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#F28E2B' }}><Icons.Mail /></span>
                <span>hello@bharatyatristay.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#F28E2B' }}><Icons.MapPin /></span>
                <span>Prayagraj, UP, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.8rem',
          color: '#64748b',
          fontWeight: 500
        }}>
          <div>© 2026 BharatYatri Stay Platform. Built for Pilgrims.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
