'use client';
import { useLanguage } from '@/context/LanguageContext';
import SearchBar from '@/components/SearchBar';
import FeaturedHotels from '@/components/FeaturedHotels';
import Image from 'next/image';

const Icons = {
  Safety: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Budget: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>,
  Easy: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-grid">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '6rem 0 8rem 0',
        background: 'linear-gradient(rgba(18, 82, 49, 0.05), white)',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div className="container animate-slide-up">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 1.25rem',
            background: 'var(--color-primary-light)',
            borderRadius: '50px',
            marginBottom: '2rem',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            {t('studentInnovation')}
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 900, 
            color: 'var(--color-secondary)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto 1.5rem auto'
          }}>
            {t('heroTitle1')} <span style={{ color: 'var(--color-primary)' }}>{t('heroTitle2')}</span>
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--color-text-secondary)', 
            fontWeight: 500,
            maxWidth: '700px', 
            margin: '0 auto 3rem auto' 
          }}>
            {t('heroDesc')}
          </p>

          <SearchBar />
        </div>
      </section>

      {/* Trust Message (MNNIT Promotion) */}
      <section style={{ background: 'white', padding: '4rem 0' }}>
        <div className="container">
          <div className="glass shadow-large" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            padding: '3.5rem',
            borderRadius: '2.5rem',
            background: 'var(--color-primary)',
            color: 'white',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.25rem' }}>{t('mnnitTitle')}</h2>
              <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: 1.6, fontWeight: 500 }}>
                {t('mnnitDesc')}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.75rem', borderRadius: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>100%</div>
                <div style={{ opacity: 0.8, fontSize: '0.95rem', fontWeight: 700 }}>{t('verifiedProperties')}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.75rem', borderRadius: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{t('low')}</div>
                <div style={{ opacity: 0.8, fontSize: '0.95rem', fontWeight: 700 }}>{t('commission')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-secondary)', letterSpacing: '-0.02em' }}>{t('exploreHubs')}</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', fontWeight: 600 }}>{t('curatedStays')}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-border)' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-border)' }} />
            </div>
          </div>
          <FeaturedHotels />
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '7rem 0', background: '#F8FAFC' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.75rem', fontWeight: 900, marginBottom: '4.5rem', color: 'var(--color-secondary)' }}>{t('whyUs')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            
            <div className="glass" style={{ padding: '3.5rem', borderRadius: '2.5rem', background: 'white', textAlign: 'center', transition: 'transform 0.3s' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.75rem', display: 'inline-block' }}><Icons.Safety /></div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>{t('safeSecure')}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500, lineHeight: 1.6 }}>{t('safeSecureDesc')}</p>
            </div>

            <div className="glass" style={{ padding: '3.5rem', borderRadius: '2.5rem', background: 'white', textAlign: 'center', border: '2.5px solid var(--color-primary)', transform: 'scale(1.05)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.75rem', display: 'inline-block' }}><Icons.Budget /></div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>{t('budgetStays')}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500, lineHeight: 1.6 }}>{t('budgetStaysDesc')}</p>
            </div>

            <div className="glass" style={{ padding: '3.5rem', borderRadius: '2.5rem', background: 'white', textAlign: 'center', transition: 'transform 0.3s' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '1.75rem', display: 'inline-block' }}><Icons.Easy /></div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>{t('easyBooking')}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500, lineHeight: 1.6 }}>{t('easyBookingDesc')}</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
