export const metadata = {
  title: 'Terms & Conditions | BharatYatri Stay',
  description: 'Terms and conditions for using BharatYatri Stay platform.',
};

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using BharatYatri Stay ("Platform"), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our Platform.'
    },
    {
      title: '2. Services',
      content: 'BharatYatri Stay is a hotel aggregator platform that connects travelers with budget hotels, dharamshalas, and guest houses. We facilitate bookings but do not own or operate any properties listed on our Platform.'
    },
    {
      title: '3. Booking & Reservation',
      content: 'All bookings made through our Platform are subject to availability. Upon successful booking, you will receive a confirmation with your Booking ID. Please carry a valid Government-issued photo ID (Aadhaar Card, Passport, Driving License, or Voter ID) at check-in.'
    },
    {
      title: '4. Payment',
      content: 'We offer two payment modes: "Pay at Hotel" where you pay directly at the property, and "UPI Advance" where you pay in advance to confirm your booking. All prices are in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.'
    },
    {
      title: '5. Cancellation & Refund',
      content: 'Cancellation policies vary by property and are displayed on each hotel\'s detail page. Generally, free cancellation is available up to 24 hours before check-in. Refunds for advance payments will be processed within 7-10 business days.'
    },
    {
      title: '6. Guest Responsibilities',
      content: 'Guests are expected to follow the rules and policies of the property they are staying at. Any damage to property will be the guest\'s responsibility. Illegal activities, substance abuse, and creating disturbance are strictly prohibited.'
    },
    {
      title: '7. Limitation of Liability',
      content: 'BharatYatri Stay acts as an intermediary between guests and property owners. We are not liable for any issues arising from your stay, including but not limited to service quality, property condition, or personal injury. We do our best to verify every property but cannot guarantee all claims made by property owners.'
    },
    {
      title: '8. Changes to Terms',
      content: 'We reserve the right to update these terms at any time. Continued use of the Platform after changes constitutes acceptance of the new terms.'
    },
    {
      title: '9. Contact',
      content: 'For any queries regarding these terms, please contact us at info@bharatyatristay.com or call +91 98765 43210.'
    }
  ];

  return (
    <div style={{ padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Terms & Conditions</h1>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Last updated: March 2026
        </p>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          Please read these terms carefully before using our platform.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {sections.map((section, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                {section.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
