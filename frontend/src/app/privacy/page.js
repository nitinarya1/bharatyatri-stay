'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div style={{ padding: '4rem 1rem', background: 'var(--color-surface-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '3rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>Last Updated: March 2026</p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>1. What Information We Collect</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            We collect information that you directly provide to us, such as your name, phone number (used for OTP login), email address, and booking preferences. We also securely collect session data to improve your browsing experience.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>2. How We Use Your Information</h2>
          <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>To process your bookings and share necessary details with the specific property you are visiting.</li>
            <li>To send you OTPs via SMS for secure, password-less authentication.</li>
            <li>To respond to your customer support requests.</li>
            <li>To improve our platform and develop new features for the MNNIT student community and beyond.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>3. Information Sharing</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            We do not sell your personal data to third parties. We share your booking name and contact information exclusively with the property owner where you have confirmed a stay, to facilitate your check-in.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-primary)' }}>4. Data Security</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            We implement advanced encryption techniques (including JWT tokens for session management) to protect your personal information against unauthorized access or alteration.
          </p>
        </section>

      </div>
    </div>
  );
}
