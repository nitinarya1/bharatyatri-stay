"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo & Brand Name */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ position: 'relative', height: '40px', width: '40px', borderRadius: '8px', overflow: 'hidden' }}>
            <Image 
              src="/logo.png" 
              alt="BharatYatri Logo" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--color-secondary)',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-sans)'
            }}>
              BharatYatri
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 600, 
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Stay Platform
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            Home
          </Link>
          <Link href="/about" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            About Us
          </Link>
          <Link href="/contact" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            Contact
          </Link>
          <Link href="/search" className="btn-primary" style={{ padding: '0.6rem 1.25rem', borderRadius: '50px', fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(242, 142, 43, 0.2)' }}>
            🔍 Find Stays
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            fontSize: '1.5rem',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-nav animate-slide-down" style={{
          padding: '1rem',
          borderTop: '1px solid var(--color-border)',
          background: 'white',
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--color-border)' }}>
            🏠 Home
          </Link>
          <Link href="/search" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--color-border)' }}>
            🔍 Find Stays
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--color-border)' }}>
            ℹ️ About Us
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.75rem 0', color: 'var(--color-text-primary)', textDecoration: 'none', fontWeight: 500 }}>
            📞 Contact
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
