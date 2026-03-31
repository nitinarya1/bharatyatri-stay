'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { fetchHotel, fetchReviews, createReview } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function HotelDetailPage({ params }) {
  const { id } = use(params);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { user, setLoginModalOpen } = useAuth();
  
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const propertyTypeLabels = {
    hotel: 'Premium Hotel',
    dharamshala: 'Dharamshala',
    guest_house: 'Guest House',
    lodge: 'Comfort Lodge',
  };

  useEffect(() => {
    fetchHotel(id).then(res => {
      if (res.success) setHotel(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));

    fetchReviews(id).then(res => {
      if (res.success) setReviews(res.data);
    }).catch(console.error);
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setLoginModalOpen(true);
    setSubmittingReview(true);
    setReviewError('');

    try {
      const res = await createReview(id, { rating: reviewRating, comment: reviewText }, localStorage.getItem('token'));
      if (res.success) {
        setReviews([res.data, ...reviews]);
        setReviewText('');
      } else {
        setReviewError(res.error || 'Failed to submit review');
      }
    } catch (err) {
      setReviewError('An error occurred');
    }
    setSubmittingReview(false);
  };

  const handleBookingClick = () => {
    if (!user) {
      setLoginModalOpen(true);
    } else {
      router.push(`/checkout/${hotel._id}`);
    }
  };

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

  return (
    <div style={{ padding: '2rem 1rem' }} className="bg-grid">
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          <Link href="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
          {' › '}
          <Link href="/search" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Search</Link>
          {' › '}
          <Link href={`/search?city=${hotel.city}`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>{hotel.city}</Link>
          {' › '}
          <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{hotel.name}</span>
        </div>

        {/* Image Gallery */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="glass shadow-large" style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            height: 'clamp(250px, 50vw, 450px)',
            marginBottom: '1rem',
            background: 'white',
            border: '2px solid white'
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
              gap: '0.75rem', 
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
                    width: '90px',
                    height: '65px',
                    objectFit: 'cover',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    border: activeImage === i ? '3px solid var(--color-primary)' : '2px solid white',
                    boxShadow: activeImage === i ? '0 0 0 2px white, 0 4px 10px rgba(18,82,49,0.2)' : 'var(--shadow-sm)',
                    opacity: activeImage === i ? 1 : 0.7,
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
          gridTemplateColumns: '1fr 360px',
          gap: '2.5rem',
          alignItems: 'flex-start',
        }} className="hotel-details-grid">
          {/* Left - Details */}
          <div>
            {/* Title */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {propertyTypeLabels[hotel.propertyType]}
                </span>
                <span style={{
                  background: hotel.rating >= 4 ? '#DCFCE7' : '#FEF3C7',
                  color: hotel.rating >= 4 ? '#16A34A' : '#92400E',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  ★ {hotel.rating?.toFixed(1)}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', fontWeight: 900, color: 'var(--color-secondary)', marginBottom: '0.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{hotel.name}</h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{hotel.address}</p>
            </div>

            {/* Description */}
            <div className="glass shadow-large" style={{ padding: '2rem', marginBottom: '2.5rem', borderRadius: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '1rem', color: 'var(--color-secondary)' }}>About this property</h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontWeight: 500 }}>{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '1.25rem', color: 'var(--color-secondary)' }}>Amenities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {hotel.amenities?.map((a, i) => (
                  <span key={i} style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.85rem',
                    background: 'white',
                    border: '1.5px solid var(--color-border)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--color-text-secondary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '1.25rem', color: 'var(--color-secondary)' }}>Policies</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
              }}>
                <div style={{ padding: '1.25rem', borderRadius: '1.25rem', background: 'white', border: '1.5px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Check-in</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 850, color: 'var(--color-primary)' }}>{hotel.policies?.checkIn}</div>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: '1.25rem', background: 'white', border: '1.5px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Check-out</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 850, color: 'var(--color-primary)' }}>{hotel.policies?.checkOut}</div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div style={{ marginBottom: '2.5rem', paddingTop: '2.5rem', borderTop: '2px dashed var(--color-border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 850, marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
                Guest Reviews ({reviews.length})
              </h3>

              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="glass shadow-sm" style={{ padding: '1.5rem', borderRadius: '1.25rem', marginBottom: '2rem', background: 'white', border: '1px solid var(--color-border)' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem' }}>Write a Review</h4>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>Rating</label>
                  <select
                    className="input-field"
                    value={reviewRating}
                    onChange={e => setReviewRating(Number(e.target.value))}
                    style={{ fontSize: '0.9rem', maxWidth: '150px' }}
                  >
                    {[5, 4, 3, 2, 1].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <textarea
                    className="input-field"
                    placeholder="How was your stay?"
                    rows="3"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    required
                    style={{ fontSize: '0.9rem', resize: 'vertical' }}
                  ></textarea>
                </div>
                {reviewError && <p style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 600 }}>{reviewError}</p>}
                <button type="submit" disabled={submittingReview} className="btn-primary" style={{ padding: '0.65rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem' }}>
                  {submittingReview ? 'Submitting...' : 'Post Review'}
                </button>
              </form>

              {/* Review List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.length === 0 ? (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>No reviews yet. Be the first to review!</p>
                ) : (
                  reviews.map(review => (
                    <div key={review._id} style={{ padding: '1.25rem', background: 'var(--color-surface-alt)', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{review.user?.name || 'Anonymous Guest'}</span>
                        <span style={{ background: '#DCFCE7', color: '#16A34A', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>★ {review.rating}</span>
                      </div>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>"{review.comment}"</p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', fontWeight: 600 }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div className="glass shadow-large animate-slide-up" style={{
            padding: '2rem',
            borderRadius: '2rem',
            position: 'sticky',
            top: '100px',
            background: 'white',
            border: '1px solid var(--color-border)',
            zIndex: 10,
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>Starting from</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>₹{hotel.pricePerNight}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 600 }}>/night</span>
              </div>
            </div>

            {/* Room Types */}
            <div style={{ marginBottom: '2rem', background: '#F8FAFC', borderRadius: '1.25rem', padding: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 850, marginBottom: '1rem', color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Room Options</h4>
              {hotel.roomTypes?.map((room, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 0',
                  borderBottom: i < hotel.roomTypes.length - 1 ? '1px solid #E2E8F0' : 'none',
                  fontSize: '0.9rem',
                }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--color-secondary)' }}>{room.type}</div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: room.available > 0 ? '#16A34A' : '#DC2626',
                      fontWeight: 700,
                    }}>
                      {room.available > 0 ? `${room.available} left` : 'Sold out'}
                    </div>
                  </div>
                  <span style={{ fontWeight: 900, color: 'var(--color-secondary)' }}>₹{room.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleBookingClick}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '1.25rem',
                fontSize: '1.1rem',
                borderRadius: '1.25rem',
                boxShadow: '0 8px 25px rgba(18,82,49,0.2)'
              }}
            >
              {user ? 'Book Stay Now' : 'Login to Instant Book'}
            </button>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '1rem',
              background: '#F0F9FF',
              textAlign: 'center',
              border: '1px dashed #0EA5E9',
            }}>
              <p style={{ fontSize: '0.9rem', color: '#0369A1', fontWeight: 700 }}>
                Support: <a href={`tel:${hotel.contactPhone}`} style={{ fontWeight: 850, textDecoration: 'none', color: '#0C4A6E' }}>{hotel.contactPhone}</a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
