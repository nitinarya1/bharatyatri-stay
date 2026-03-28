import Link from 'next/link';

export const metadata = {
  title: 'About Us | BharatYatri Stay',
  description: 'Learn about BharatYatri Stay - your trusted partner for budget-friendly stays in holy cities of India.',
};

export default function AboutPage() {
  return (
    <div style={{ padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>About BharatYatri Stay</h1>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Making travel affordable for every Indian
        </p>

        <div style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          <div style={{
            padding: '2rem',
            borderRadius: '1rem',
            background: 'var(--color-primary-light)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>🙏</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Our Mission</h2>
            <p>
              To provide every pilgrim, student, and budget traveler access to clean, safe, and affordable accommodation in India&apos;s sacred and culturally rich cities.
            </p>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>The Problem We Solve</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Every year, millions of devotees and travelers visit Prayagraj, Varanasi, and other holy cities. Most of them struggle to find trustworthy budget stays. Big hotel chains charge high commissions which inflate the room prices. Many local dharamshalas and guest houses remain unlisted online, making them invisible to travelers.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>Our Solution</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            BharatYatri Stay bridges this gap. We personally verify local hotels, dharamshalas, and guest houses and list them on our platform with honest pricing. No hidden charges, no surge pricing. What you see is what you pay.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            margin: '2rem 0',
          }}>
            {[
              { icon: '✅', title: 'Verified Properties', desc: 'Every property is visited and verified by our team.' },
              { icon: '💰', title: 'Best Prices', desc: 'Direct partnerships with hotels mean lower prices for you.' },
              { icon: '🕉️', title: 'Temple Proximity', desc: 'Stays near major temples, ghats, and attractions.' },
              { icon: '🤝', title: 'Local Trust', desc: 'We are locals who understand your needs.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
              }}>
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.8rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get in Touch →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
