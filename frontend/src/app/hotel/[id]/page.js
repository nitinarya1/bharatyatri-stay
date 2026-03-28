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
            borderRadius: '1rem',
            overflow: 'hidden',
            height: '350px',
            marginBottom: '0.75rem',
          }}>
            <img
              src={hotel.images?.[activeImage] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
              alt={hotel.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {hotel.images?.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {hotel.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${hotel.name} ${i + 1}`}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: '80px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    border: activeImage === i ? '2.5px solid var(--color-primary)' : '2px solid transparent',
                    opacity: activeImage === i ? 1 : 0.6,
                    transition: 'all 0.2s',
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
                  ★ {hotel.rating?.toFixed(1)} ({hotel.totalReviews} reviews)
                </span>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>{hotel.name}</h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>📍 {hotel.address}</p>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>About this property</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Amenities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {hotel.amenities?.map((a, i) => (
                  <span key={i} style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '0.5rem',
                    background: 'var(--color-surface-alt)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                  }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            {hotel.nearbyAttractions?.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Nearby Attractions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {hotel.nearbyAttractions.map((a, i) => (
                    <span key={i} style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                      📍 {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Policies */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Policies</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.75rem',
              }}>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-surface-alt)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Check-in</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{hotel.policies?.checkIn}</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-surface-alt)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Check-out</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{hotel.policies?.checkOut}</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-surface-alt)', gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Cancellation</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{hotel.policies?.cancellation}</div>
                </div>
              </div>
              {hotel.policies?.idRequired && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-warning)', fontWeight: 500, marginTop: '0.5rem' }}>
                  ⚠️ Government-issued ID required at check-in
                </p>
              )}
            </div>

            {/* Map */}
            {hotel.mapLink && (
              <a href={hotel.mapLink} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none' }}>
                📍 View on Google Maps
              </a>
            )}
          </div>

          {/* Right - Booking Card */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '2px solid var(--color-border)',
            background: 'white',
            position: 'sticky',
            top: '80px',
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Starting from</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{hotel.pricePerNight}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>/night</span>
              </div>
            </div>

            {/* Room Types */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Room Options</h4>
              {hotel.roomTypes?.map((room, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 0',
                  borderBottom: i < hotel.roomTypes.length - 1 ? '1px solid var(--color-border)' : 'none',
                  fontSize: '0.85rem',
                }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{room.type}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      color: room.available > 0 ? 'var(--color-success)' : 'var(--color-error)',
                      marginLeft: '0.5rem',
                    }}>
                      {room.available > 0 ? `${room.available} left` : 'Sold out'}
                    </span>
                  </div>
                  <span style={{ fontWeight: 700 }}>₹{room.price}</span>
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
              }}
            >
              Book Now →
            </Link>

            {/* Contact */}
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              background: 'var(--color-secondary-light)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 500 }}>
                📞 Call Hotel: <a href={`tel:${hotel.contactPhone}`} style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{hotel.contactPhone}</a>
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .hotel-details-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
