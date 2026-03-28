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

  const features = [
    { icon: '💰', title: 'Honest Prices', desc: 'No hidden charges, no surge pricing. What you see is what you pay.' },
    { icon: '🛡️', title: 'Verified Stays', desc: 'Every property is personally verified for cleanliness and safety.' },
    { icon: '📱', title: 'Easy Booking', desc: 'Book in seconds. Pay at hotel. No app download needed.' },
    { icon: '🙏', title: 'Local Expertise', desc: 'We know these cities. Get stays near temples, ghats & attractions.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #ECFDF5 100%)',
        padding: '4rem 1rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(232,114,12,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(15,118,110,0.06)',
        }} />

        <div className="container animate-fade-in-up" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            fontWeight: 600,
            fontSize: '0.85rem',
            marginBottom: '1rem',
          }}>
            🇮🇳 #1 Budget Stay Platform for Pilgrims
          </span>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
            maxWidth: '700px',
            margin: '0 auto 1rem',
          }}>
            Affordable Stays in
            <span style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}> Holy Cities</span> of India
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            maxWidth: '550px',
            margin: '0 auto 2rem',
            lineHeight: 1.6,
          }}>
            Find clean, verified hotels, dharamshalas & guest houses in Prayagraj and Varanasi.
            Starting from just ₹300/night.
          </p>

          <SearchBar />

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '50+', label: 'Verified Stays' },
              { num: '2', label: 'Cities' },
              { num: '₹300', label: 'Starting Price' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{stat.num}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section style={{ padding: '4rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title">Explore Our Cities</h2>
            <p className="section-subtitle">Premium budget stays in India&apos;s most sacred destinations</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {cities.map(city => (
              <Link key={city.name} href={`/search?city=${city.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{
                  position: 'relative',
                  height: '220px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}>
                  <img src={city.img} alt={city.name} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                  }}>
                    <span style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{city.icon}</span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{city.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#d6d3d1' }}>{city.tagline} — {city.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section style={{ padding: '3rem 1rem', background: 'var(--color-surface-alt)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Popular Stays</h2>
              <p className="section-subtitle">Handpicked budget-friendly properties</p>
            </div>
            <Link href="/search" className="btn-outline" style={{ textDecoration: 'none' }}>
              View All →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem', animation: 'fadeIn 1s ease infinite alternate' }}>🏨</div>
              Loading stays...
            </div>
          ) : (
            <div className="stagger-children" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {hotels.slice(0, 6).map(hotel => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}

          {!loading && hotels.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No stays found yet.</p>
              <p style={{ fontSize: '0.9rem' }}>We are adding new properties every day!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '4rem 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Why BharatYatri Stay?</h2>
            <p className="section-subtitle">Built for Indian travelers, by Indians</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map((feat, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(232,114,12,0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>{feat.icon}</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{feat.desc}</p>
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
