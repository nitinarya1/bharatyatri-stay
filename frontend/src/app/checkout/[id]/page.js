'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchHotel, createBooking } from '@/lib/api';

export default function CheckoutPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    paymentMode: 'pay_at_hotel',
    specialRequests: '',
  });

  useEffect(() => {
    fetchHotel(id).then(res => {
      if (res.success) {
        setHotel(res.data);
        if (res.data.roomTypes?.length > 0) {
          setForm(f => ({ ...f, roomType: res.data.roomTypes[0].type }));
        }
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const selectedRoom = hotel?.roomTypes?.find(r => r.type === form.roomType);
  const nights = form.checkIn && form.checkOut
    ? Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)))
    : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.guestName || !form.guestPhone || !form.checkIn || !form.checkOut || !form.roomType) {
      setError('Please fill all required fields.');
      return;
    }

    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      setError('Check-out date must be after check-in date.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createBooking({ ...form, hotelId: id });
      if (res.success) {
        const bookingData = encodeURIComponent(JSON.stringify(res.data));
        router.push(`/booking-success?data=${bookingData}`);
      } else {
        setError(res.error || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem' }}>
        <h2>Hotel not found</h2>
        <Link href="/search" className="btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Search
        </Link>
      </div>
    );
  }

  // Get tomorrow and day after for default dates
  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Book Your Stay</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Complete the form below to confirm your booking at <strong>{hotel.name}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '2rem',
            alignItems: 'flex-start',
          }} className="checkout-grid">
            {/* Left - Form */}
            <div>
              {/* Guest Details */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
                marginBottom: '1.5rem',
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>👤 Guest Details</h3>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your full name"
                      value={form.guestName}
                      onChange={e => handleChange('guestName', e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="+91 98765 43210"
                        value={form.guestPhone}
                        onChange={e => handleChange('guestPhone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="you@email.com"
                        value={form.guestEmail}
                        onChange={e => handleChange('guestEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
                marginBottom: '1.5rem',
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>🗓️ Stay Details</h3>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        className="input-field"
                        min={today}
                        value={form.checkIn}
                        onChange={e => handleChange('checkIn', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        className="input-field"
                        min={form.checkIn || today}
                        value={form.checkOut}
                        onChange={e => handleChange('checkOut', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                        Guests
                      </label>
                      <select
                        className="input-field"
                        value={form.guests}
                        onChange={e => handleChange('guests', parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                        Room Type *
                      </label>
                      <select
                        className="input-field"
                        value={form.roomType}
                        onChange={e => handleChange('roomType', e.target.value)}
                      >
                        {hotel.roomTypes?.map((room, i) => (
                          <option key={i} value={room.type}>
                            {room.type} - ₹{room.price}/night
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                      Special Requests (Optional)
                    </label>
                    <textarea
                      className="input-field"
                      placeholder="Any special requests? (e.g., extra blanket, ground floor room)"
                      value={form.specialRequests}
                      onChange={e => handleChange('specialRequests', e.target.value)}
                      rows={3}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>💳 Payment Method</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: form.paymentMode === 'pay_at_hotel' ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                    background: form.paymentMode === 'pay_at_hotel' ? 'var(--color-primary-light)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="pay_at_hotel"
                      checked={form.paymentMode === 'pay_at_hotel'}
                      onChange={e => handleChange('paymentMode', e.target.value)}
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>🏨 Pay at Hotel</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Pay when you arrive. Cash/UPI accepted.</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: form.paymentMode === 'upi_advance' ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                    background: form.paymentMode === 'upi_advance' ? 'var(--color-primary-light)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="upi_advance"
                      checked={form.paymentMode === 'upi_advance'}
                      onChange={e => handleChange('paymentMode', e.target.value)}
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>📱 Pay via UPI (Advance)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Pay advance to confirm your booking instantly.</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right - Summary */}
            <div style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '2px solid var(--color-border)',
              background: 'white',
              position: 'sticky',
              top: '80px',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 Booking Summary</h3>

              {/* Hotel Info */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <img
                  src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'}
                  alt={hotel.name}
                  style={{ width: '70px', height: '55px', objectFit: 'cover', borderRadius: '0.5rem' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{hotel.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{hotel.city}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                {selectedRoom && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{selectedRoom.type}</span>
                    <span>₹{selectedRoom.price}/night</span>
                  </div>
                )}
                {nights > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Duration</span>
                    <span>{nights} night{nights > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem 0',
                borderTop: '2px solid var(--color-border)',
                marginBottom: '1.25rem',
              }}>
                <span style={{ fontWeight: 700, fontSize: '1rem' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
                  {totalPrice > 0 ? `₹${totalPrice}` : '—'}
                </span>
              </div>

              {error && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  background: '#FEF2F2',
                  color: 'var(--color-error)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  marginBottom: '1rem',
                }}>
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting || totalPrice === 0}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  opacity: (submitting || totalPrice === 0) ? 0.6 : 1,
                }}
              >
                {submitting ? '⏳ Booking...' : 'Confirm Booking →'}
              </button>

              <p style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
                marginTop: '0.75rem',
                lineHeight: 1.5,
              }}>
                By booking, you agree to our{' '}
                <Link href="/terms" style={{ color: 'var(--color-primary)' }}>Terms</Link>{' '}
                and{' '}
                <Link href="/privacy" style={{ color: 'var(--color-primary)' }}>Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </form>

        <style jsx>{`
          @media (max-width: 768px) {
            .checkout-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
