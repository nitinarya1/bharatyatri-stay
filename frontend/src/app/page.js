'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import { fetchHotels } from '@/lib/api';

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels().then(res => {
      if (res.success) setHotels(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const cities = [
    {
      name: 'Prayagraj',
      tagline: 'City of Sangam',
      icon: '🕉️',
      desc: 'Holy confluence of Ganga, Yamuna & Saraswati',
      img: 'https://images.unsplash.com/photo-1609947017136-9daf32a16982?w=600'
    },
    {
      name: 'Varanasi',
      tagline: 'City of Lights',
      icon: '🪔',
      desc: 'Ancient spiritual capital on the banks of Ganga',
      img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600'
    }
  ];

  const FeaturesIcons = {
    Honest: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
    ),
    Verified: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>
    ),
    Easy: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    ),
    Local: () => (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3a10 10 0 1 1-6.21 17.89"/><path d="M7 23h4"/><path d="M8 16h4"/><path d="M9 13h2"/><path d="M10 10h2"/><path d="M11 7h2"/><path d="M12 4h2"/><circle cx="12" cy="12" r="1"/></svg>
    )
  };

  const features = [
    { icon: FeaturesIcons.Honest, title: 'Honest Prices', desc: 'No hidden charges, no surge pricing. What you see is what you pay.' },
    { icon: FeaturesIcons.Verified, title: 'Verified Stays', desc: 'Every property is personally verified for cleanliness and safety.' },
    { icon: FeaturesIcons.Easy, title: 'Easy Booking', desc: 'Book in seconds. Pay at hotel. No app download needed.' },
    { icon: FeaturesIcons.Local, title: 'Local Expertise', desc: 'We know these cities. Get stays near temples, ghats & attractions.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-grid" style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #ECFDF5 100%)',
        padding: '5rem 1rem 4rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(232,114,12,0.05)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'rgba(15,118,110,0.04)',
          filter: 'blur(40px)',
        }} />

        <div className="container animate-fade-in-up" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.25rem',
            borderRadius: '9999px',
            background: 'white',
            color: 'var(--color-primary)',
            fontWeight: 700,
            fontSize: '0.8rem',
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            🇮🇳 India&apos;s Preferred Pilgrim Stay Platform
          </span>

          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--color-secondary)',
            marginBottom: '1.25rem',
            maxWidth: '800px',
            margin: '0 auto 1.25rem',
            letterSpacing: '-0.02em'
          }}>
            Affordable Stays in
            <span style={{
              background: 'linear-gradient(135deg, var(--color-primary), #E8720C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}> Holy Cities</span> of India
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
            fontWeight: 500
          }}>
            Discover handpicked hotels, dharamshalas & guest houses curated for a peaceful pilgrimage experience.
          </p>

          <SearchBar />

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '50+', label: 'Verified Properties' },
              { num: '2', label: 'Spiritual Hubs' },
              { num: '₹300', label: 'Value Stays' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.25rem' }}>{stat.num}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section style={{ padding: '5rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Explore Spiritual Hubs</h2>
            <p className="section-subtitle">Comfortable budget stays in India&apos;s most sacred destinations</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}>
            {cities.map(city => (
              <Link key={city.name} href={`/search?city=${city.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card shadow-medium" style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}>
                  <img src={city.img} alt={city.name} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,27,61,0.9) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                  }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '0.25rem' }}>{city.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                      {city.tagline} • {city.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section style={{ padding: '5rem 1rem', background: 'var(--color-surface-alt)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Popular Stays</h2>
              <p className="section-subtitle">Our top-rated budget-friendly properties</p>
            </div>
            <Link href="/search" className="btn-outline" style={{ 
              textDecoration: 'none', 
              borderRadius: '50px',
              padding: '0.6rem 1.5rem',
              fontSize: '0.9rem'
            }}>
              View All Properties →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--color-text-muted)' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-primary-light)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
              <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              Loading curated stays...
            </div>
          ) : (
            <div className="stagger-children" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {hotels.slice(0, 6).map(hotel => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}

          {!loading && hotels.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Expanding Our Network</p>
              <p style={{ fontSize: '0.95rem' }}>New properties in sacred cities are being verified daily.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '6rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Why BharatYatri Stay?</h2>
            <p className="section-subtitle">A platform built for the unique needs of spiritual travelers</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}>
            {features.map((feat, i) => (
              <div key={i} className="glass shadow-medium" style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                borderRadius: '1.5rem',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div style={{ 
                  color: 'var(--color-primary)', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  marginBottom: '1.5rem',
                  background: 'var(--color-primary-light)',
                  width: '72px',
                  height: '72px',
                  borderRadius: '1.25rem',
                  alignItems: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <feat.icon />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-secondary)' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '3.5rem 1rem',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
            List Your Property With Us
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Own a hotel, dharamshala, or guest house? Get more bookings with zero listing fees.
          </p>
          <Link href="/contact" className="btn-primary" style={{
            background: 'white',
            color: 'var(--color-primary)',
            textDecoration: 'none',
            padding: '0.85rem 2rem',
            fontSize: '1rem',
          }}>
            Contact Us Today →
          </Link>
        </div>
      </section>
    </div>
  );
}
