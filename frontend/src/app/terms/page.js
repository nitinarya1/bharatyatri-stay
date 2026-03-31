'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '4rem 1rem', background: 'var(--color-surface-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '3rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Last Updated: March 2026</p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>1. Acceptance of Terms</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            By accessing or using the BharatYatri Stay platform, you agree to be bound by these Terms of Service. If you do not agree to all of the terms and conditions, then you may not access the website or use any services.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>2. Booking and Payments</h2>
          <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>All bookings are subject to availability and confirmation by the property owner.</li>
            <li>In case of "Pay at Hotel", the property reserves the right to request advance payment during high-demand seasons.</li>
            <li>For UPI/Online payments, refunds for cancellations will be processed according to the individual property's cancellation policy.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>3. User Responsibilities</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            Users are required to provide a valid government-issued ID upon check-in. The primary guest must be at least 18 years of age. BharatYatri Stay acts purely as an aggregator and is not liable for disputes arising on the physical premises of the property.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>4. Reviews and Conduct</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            Guests are encouraged to leave honest reviews. We reserve the right to remove any remarks that contain hate speech, explicit content, or provably false claims.
          </p>
        </section>

      </div>
    </div>
  );
}
