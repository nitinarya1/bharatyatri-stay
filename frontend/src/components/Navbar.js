"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Professional SVG Icons
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  About: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ),
  Contact: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
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
          <div style={{ position: 'relative', height: '42px', width: '42px', borderRadius: '10px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <Image 
              src="/logo.png" 
              alt="BharatYatri Logo" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: 'var(--color-secondary)',
              letterSpacing: '-0.02em',
            }}>
              BharatYatri
            </span>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: 700, 
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Stay Platform
            </span>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Home</Link>
          <Link href="/about" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>About Us</Link>
          
          <Link href="/search" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem' }}>
            <Icons.Search /> Find Stays
          </Link>

          {user ? (
            <Link href="/profile" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem' }}>
              <Icons.User /> Profile
            </Link>
          ) : (
            <Link href="/login" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem' }}>
              <Icons.User /> Login
            </Link>
          )}
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
            color: 'var(--color-secondary)',
            transition: 'transform 0.2s ease'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {menuOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-nav animate-slide-down glass shadow-large" style={{
          position: 'absolute',
          top: '100%',
          left: '0.5rem',
          right: '0.5rem',
          padding: '1.25rem',
          borderRadius: '1.25rem',
          border: '1px solid rgba(255,255,255,0.4)',
          zIndex: 50,
        }}>
          {[
            { name: 'Home', href: '/', icon: Icons.Home },
            { name: 'Find Stays', href: '/search', icon: Icons.Search },
            { name: 'About Us', href: '/about', icon: Icons.About },
            { name: 'Contact Us', href: '/contact', icon: Icons.Contact },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              onClick={() => setMenuOpen(false)} 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem', 
                color: 'var(--color-text-primary)', 
                textDecoration: 'none', 
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: '0.75rem',
                transition: 'background 0.2s ease',
                marginBottom: '0.25rem'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ color: 'var(--color-primary)' }}><item.icon /></span>
              {item.name}
            </Link>
          ))}
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
