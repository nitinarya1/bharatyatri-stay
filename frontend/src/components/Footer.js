'use client';
import Link from 'next/link';

function FooterLink({ href, children }) {
  return (
    <Link href={href} style={{ color: '#d6d3d1', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
      onMouseEnter={e => e.target.style.color = '#F28E2B'}
      onMouseLeave={e => e.target.style.color = '#d6d3d1'}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: '#002244',
      color: '#d6d3d1',
      padding: '3rem 0 1.5rem',
      marginTop: '4rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ position: 'relative', height: '48px', width: '160px', marginBottom: '1rem' }}>
              <img src="/logo.png" alt="BharatYatri Stay" style={{ height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#d6d3d1' }}>
              Budget-friendly stays for pilgrims and travelers in Prayagraj & Varanasi.
              Clean rooms, honest prices, trusted stays.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink href="/search?city=Prayagraj">Stays in Prayagraj</FooterLink>
              <FooterLink href="/search?city=Varanasi">Stays in Varanasi</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/privacy#refund">Refund & Cancellation</FooterLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <span>📞 +91 98765 43210</span>
              <span>📧 info@bharatyatristay.com</span>
              <span>📍 Prayagraj, Uttar Pradesh</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #292524',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: '#78716c',
        }}>
          <span>© 2026 BharatYatri Stay. All rights reserved.</span>
          <span>Made with ❤️ for Indian Travelers</span>
        </div>
      </div>
    </footer>
  );
}
