'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '4rem 1rem', background: 'var(--color-surface-alt)' }}>
      <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '3rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
          {t('about')}
        </h1>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Welcome to <strong>BharatYatri Stay</strong>, India's premier aggregator for budget-friendly, culturally immersive, and spiritually enriching accommodations. We specialize in connecting travelers with verified dharamshalas, premium guest houses, and affordable hotels in the nation's most revered holy cities, starting with Prayagraj and Varanasi.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
          Our Mission
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Our mission is simple: to make spiritual and regional travel accessible to every Indian. We bridge the gap between traditional property owners and modern digital travelers. By keeping our commissions exceptionally low, we pass the savings directly to you, ensuring honest pricing without hidden fees.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>
          {t('studentInnovation')}
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          {t('mnnitDesc')} As a student-driven initiative, we bring the latest in web technology to solve real-world problems. We prioritize speed, security (like our 1-tap OTP login), and ease-of-use for both highly educated tourists and local pilgrims.
        </p>

        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--color-primary-light)', borderRadius: '1rem', border: '1px solid var(--color-primary)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Join Our Journey</h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
            Whether you are a traveler looking for a peaceful stay by the Ganges, or a property owner wanting to increase your bookings, BharatYatri Stay is your trusted partner.
          </p>
        </div>
      </div>
    </div>
  );
}
