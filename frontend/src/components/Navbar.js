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
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', height: '100%', textDecoration: 'none' }}>
          <div style={{ position: 'relative', height: '56px', width: '200px' }}>
            <Image 
              src="/logo.png" 
              alt="BharatYatri Stay" 
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            Home
          </Link>
          <Link href="/search" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            Find Stays
          </Link>
          <Link href="/about" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            About
          </Link>
          <Link href="/contact" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
            Contact
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
