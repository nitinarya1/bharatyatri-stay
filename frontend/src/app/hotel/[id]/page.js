'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { fetchHotel } from '@/lib/api';

export default function HotelDetailPage({ params }) {
  const { id } = use(params);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchHotel(id).then(res => {
      if (res.success) setHotel(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--color-text-muted)' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏨</div>
        Loading hotel details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Hotel Not Found</h2>
        <Link href="/search" className="btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Search
        </Link>
      </div>
    );
  }

  const propertyTypeLabels = {
    hotel: 'Hotel', dharamshala: 'Dharamshala', guest_house: 'Guest House', lodge: 'Lodge'
  };

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
          {' › '}
          <Link href="/search" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Search</Link>
          {' › '}
          <Link href={`/search?city=${hotel.city}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{hotel.city}</Link>
          {' › '}
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{hotel.name}</span>
        </div>

        {/* Image Gallery */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            borderRadius: '1.25rem',
            overflow: 'hidden',
            height: 'clamp(200px, 50vw, 400px)',
            marginBottom: '0.75rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <img
              src={hotel.images?.[activeImage] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
              alt={hotel.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {hotel.images?.length > 1 && (
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              overflowX: 'auto', 
              paddingBottom: '0.5rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              {hotel.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${hotel.name} ${i + 1}`}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 'clamp(60px, 15vw, 80px)',
                    height: 'clamp(45px, 12vw, 60px)',
                    objectFit: 'cover',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    border: activeImage === i ? '2.5px solid var(--color-primary)' : '2px solid transparent',
                    opacity: activeImage === i ? 1 : 0.6,
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '2rem',
          alignItems: 'flex-start',
        }} className="hotel-details-grid">
          {/* Left - Details */}
          <div>
            {/* Title */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  {propertyTypeLabels[hotel.propertyType]}
                </span>
                <span className="badge" style={{
                  background: hotel.rating >= 4 ? '#DCFCE7' : '#FEF9C3',
                  color: hotel.rating >= 4 ? '#16A34A' : '#CA8A04',
                }}>
                  ★ {hotel.rating?.toFixed(1)}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: 800, marginBottom: '0.35rem', lineHeight: 1.2 }}>{hotel.name}</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>📍 {hotel.address}</p>
            </div>

            {/* Description */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>About this property</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Amenities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                {hotel.amenities?.map((a, i) => (
                  <span key={i} style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '0.75rem',
                    background: 'white',
                    border: '1.5px solid var(--color-border)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Policies</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
              }}>
                <div style={{ padding: '1rem', borderRadius: '1rem', background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Check-in</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{hotel.policies?.checkIn}</div>
                </div>
                <div style={{ padding: '1rem', borderRadius: '1rem', background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Check-out</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{hotel.policies?.checkOut}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div className="glass-card" style={{
            padding: '1.5rem',
            position: 'sticky',
            top: '90px',
            zIndex: 10,
          }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Starting from</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{hotel.pricePerNight}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>/night</span>
              </div>
            </div>

            {/* Room Types */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Room Options</h4>
              {hotel.roomTypes?.map((room, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: i < hotel.roomTypes.length - 1 ? '1px solid var(--color-border)' : 'none',
                  fontSize: '0.85rem',
                }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{room.type}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: room.available > 0 ? 'var(--color-success)' : 'var(--color-error)',
                      fontWeight: 600,
                    }}>
                      {room.available > 0 ? `${room.available} left` : 'Sold out'}
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--color-text-primary)' }}>₹{room.price}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/checkout/${hotel._id}`}
              className="btn-primary"
              style={{
                width: '100%',
                textDecoration: 'none',
                textAlign: 'center',
                padding: '0.85rem',
                fontSize: '1rem',
                borderRadius: '50px',
              }}
            >
              Book Stay →
            </Link>

            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem',
              borderRadius: '0.75rem',
              background: 'var(--color-secondary-light)',
              textAlign: 'center',
              border: '1px dashed var(--color-secondary)',
            }}>
              <p style={{ fontSize: 'min(0.85rem, 3.5vw)', color: 'var(--color-secondary)', fontWeight: 600 }}>
                📞 Support: <a href={`tel:${hotel.contactPhone}`} style={{ fontWeight: 800, color: 'var(--color-secondary)', textDecoration: 'none' }}>{hotel.contactPhone}</a>
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .hotel-details-grid {
              grid-template-columns: 1fr !important;
            }
            :global(.glass-card) {
                position: relative !important;
                top: 0 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
