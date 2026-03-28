'use client';
import Link from 'next/link';

export default function HotelCard({ hotel }) {
  const propertyTypeLabels = {
    hotel: 'Hotel',
    dharamshala: 'Dharamshala',
    guest_house: 'Guest House',
    lodge: 'Lodge',
  };

  const propertyTypeColors = {
    hotel: { bg: '#EFF6FF', color: '#2563EB' },
    dharamshala: { bg: '#FFF7ED', color: '#EA580C' },
    guest_house: { bg: '#F0FDF4', color: '#16A34A' },
    lodge: { bg: '#FAF5FF', color: '#9333EA' },
  };

  const typeStyle = propertyTypeColors[hotel.propertyType] || propertyTypeColors.hotel;

  return (
    <Link href={`/hotel/${hotel._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card" style={{ cursor: 'pointer' }}>
        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
            alt={hotel.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Property Type Badge */}
          <span style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            padding: '0.25rem 0.6rem',
            borderRadius: '0.5rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            background: typeStyle.bg,
            color: typeStyle.color,
            backdropFilter: 'blur(4px)',
          }}>
            {propertyTypeLabels[hotel.propertyType]}
          </span>
          {/* City Badge */}
          <span style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            padding: '0.25rem 0.6rem',
            borderRadius: '0.5rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
          }}>
            📍 {hotel.city}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '1rem' }}>
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            marginBottom: '0.25rem',
            color: 'var(--color-text-primary)',
          }}>
            {hotel.name}
          </h3>

          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginBottom: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {hotel.address}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
            <span style={{
              background: hotel.rating >= 4 ? 'var(--color-success)' : hotel.rating >= 3 ? 'var(--color-warning)' : 'var(--color-error)',
              color: 'white',
              padding: '0.15rem 0.45rem',
              borderRadius: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}>
              ★ {hotel.rating?.toFixed(1)}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              ({hotel.totalReviews} reviews)
            </span>
          </div>

          {/* Amenities */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
            {hotel.amenities?.slice(0, 3).map((amenity, i) => (
              <span key={i} style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.35rem',
                background: 'var(--color-surface-alt)',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}>
                {amenity}
              </span>
            ))}
            {hotel.amenities?.length > 3 && (
              <span style={{
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.35rem',
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                fontWeight: 600,
              }}>
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '0.75rem',
          }}>
            <div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                ₹{hotel.pricePerNight}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '0.25rem' }}>
                /night
              </span>
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-secondary)',
            }}>
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
