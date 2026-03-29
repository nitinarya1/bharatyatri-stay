'use client';
import Link from 'next/link';

const Icons = {
  Star: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
  Location: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
};

export default function HotelCard({ hotel }) {
  const propertyTypeLabels = {
    hotel: 'Premium Hotel',
    dharamshala: 'Dharamshala',
    guest_house: 'Guest House',
    lodge: 'Comfort Lodge',
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
      <div className="card shadow-medium" style={{ 
        cursor: 'pointer',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        background: 'white',
        border: '1px solid var(--color-border)'
      }}>
        {/* Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img
            src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
            alt={hotel.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          {/* Property Type Badge */}
          <span style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '50px',
            fontSize: '0.65rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            background: typeStyle.bg,
            color: typeStyle.color,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.5)'
          }}>
            {propertyTypeLabels[hotel.propertyType]}
          </span>
          {/* City Badge */}
          <span className="glass" style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '50px',
            fontSize: '0.65rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            color: 'var(--color-secondary)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <Icons.Location /> {hotel.city}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--color-secondary)',
              letterSpacing: '-0.01em',
              flex: 1,
              paddingRight: '1rem'
            }}>
              {hotel.name}
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              background: hotel.rating >= 4 ? '#F0FDF4' : '#FFFBEB',
              color: hotel.rating >= 4 ? '#16A34A' : '#D97706',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 800
            }}>
              <Icons.Star />
              {hotel.rating?.toFixed(1)}
            </div>
          </div>

          <p style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontWeight: 500
          }}>
            {hotel.address}
          </p>

          {/* Amenities */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {hotel.amenities?.slice(0, 3).map((amenity, i) => (
              <span key={i} style={{
                fontSize: '0.7rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '0.5rem',
                background: 'var(--color-secondary-light)',
                color: 'var(--color-secondary)',
                fontWeight: 700,
              }}>
                {amenity}
              </span>
            ))}
            {hotel.amenities?.length > 3 && (
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600, alignSelf: 'center' }}>
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Price & CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1rem',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.1rem' }}>Starting from</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  ₹{hotel.pricePerNight}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  /night
                </span>
              </div>
            </div>
            <div style={{
              background: 'var(--color-secondary)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.transform = 'rotate(-10deg) scale(1.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-secondary)';
                e.currentTarget.style.transform = 'rotate(0) scale(1)';
              }}
            >
              <Icons.ArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
