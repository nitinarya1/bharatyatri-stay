export const metadata = {
  title: 'Privacy Policy & Refund Policy | BharatYatri Stay',
  description: 'Privacy policy and refund/cancellation policy for BharatYatri Stay.',
};

export default function PrivacyPage() {
  return (
    <div style={{ padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Privacy & Refund Policy</h1>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          Last updated: March 2026
        </p>

        {/* Privacy Policy */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
            🔒 Privacy Policy
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Information We Collect</h3>
              <p>We collect personal information that you provide when making a booking, including your name, phone number, and email address. We may also collect usage data to improve our services.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>How We Use Your Data</h3>
              <p>Your information is used solely for processing bookings, communicating with you about your reservation, and improving our services. We do not sell your personal data to third parties.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Data Security</h3>
              <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal data. Contact us at info@bharatyatristay.com to exercise these rights.</p>
            </div>
          </div>
        </div>

        {/* Refund & Cancellation */}
        <div id="refund">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
            💸 Refund & Cancellation Policy
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <div style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-success)', marginBottom: '0.5rem' }}>✅ Free Cancellation</h3>
              <p>Most properties offer free cancellation up to 24 hours before check-in. The specific cancellation policy for each property is displayed on the hotel detail page.</p>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              background: '#FEF3C7',
              border: '1px solid #FDE68A',
            }}>
              <h3 style={{ fontWeight: 700, color: '#92400E', marginBottom: '0.5rem' }}>⚠️ Late Cancellation</h3>
              <p>Cancellations made less than 24 hours before check-in may incur a charge equivalent to one night&apos;s stay, depending on the property&apos;s policy.</p>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Refund Process</h3>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Pay at Hotel:</strong> No refund processing needed as no advance payment is made.</li>
                <li><strong>UPI Advance:</strong> Refunds will be processed within 7-10 business days to the original payment method.</li>
                <li><strong>No-show:</strong> If you do not arrive at the property without cancelling, you will be charged the full booking amount.</li>
              </ul>
            </div>

            <div style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
            }}>
              <h3 style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Contact for Cancellations</h3>
              <p>To cancel a booking, please contact us at <strong>+91 98765 43210</strong> or email <strong>info@bharatyatristay.com</strong> with your Booking ID.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
