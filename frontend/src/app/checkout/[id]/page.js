'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchHotel, createBooking } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);
  const [mockPaymentStage, setMockPaymentStage] = useState('initializing'); // initializing, processing, success

  // Enforce login
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/checkout/${id}`);
    }
  }, [user, authLoading, id, router]);

  const [form, setForm] = useState({
    guestName: user?.name || '',
    guestPhone: user?.phone || '',
    guestEmail: user?.email || '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: '',
    paymentMode: 'pay_at_hotel',
    specialRequests: '',
  });

  // Update form if user data loads after initial render
  useEffect(() => {
    if (user && !form.guestName) {
      setForm(f => ({
        ...f,
        guestName: user.name,
        guestPhone: user.phone || '',
        guestEmail: user.email,
      }));
    }
  }, [user]);

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

  const handleMockPaymentSuccess = async () => {
    setMockPaymentStage('success');
    setTimeout(async () => {
      await processBooking();
    }, 1500);
  };

  const processBooking = async () => {
    try {
      const res = await createBooking({ ...form, hotelId: id, userId: user?.id || null });
      if (res.success) {
        const bookingData = encodeURIComponent(JSON.stringify(res.data));
        router.push(`/booking-success?data=${bookingData}`);
      } else {
        setError(res.error || 'Booking failed. Please try again.');
        setSubmitting(false);
        setShowRazorpayMock(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
      setShowRazorpayMock(false);
    }
  };

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
    
    if (form.paymentMode === 'upi_advance') {
      setShowRazorpayMock(true);
      setMockPaymentStage('initializing');
      setTimeout(() => setMockPaymentStage('processing'), 1500);
    } else {
      await processBooking();
    }
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
    <div className="section-spacing" style={{ background: 'var(--color-surface-alt)', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 1.8rem)', fontWeight: 800, marginBottom: '0.25rem' }}>Confirm Booking</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            You&apos;re almost there! Review your stay at <strong>{hotel.name}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '2rem',
            alignItems: 'flex-start',
          }} className="checkout-grid">
            {/* Left - Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Guest Details */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>👤</span> Guest Information
                </h3>

                <div className="grid-stack" style={{ gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. Rahul Sharma"
                      value={form.guestName}
                      onChange={e => handleChange('guestName', e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="+91 98XXX XXXXX"
                        value={form.guestPhone}
                        onChange={e => handleChange('guestPhone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="you@example.com"
                        value={form.guestEmail}
                        onChange={e => handleChange('guestEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🗓️</span> Stay Preferences
                </h3>

                <div className="grid-stack" style={{ gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Check-in
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
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Check-out
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

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Number of Guests
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
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        Select Room Type
                      </label>
                      <select
                        className="input-field"
                        value={form.roomType}
                        onChange={e => handleChange('roomType', e.target.value)}
                      >
                        {hotel.roomTypes?.map((room, i) => (
                          <option key={i} value={room.type}>
                            {room.type} (₹{room.price}/night)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>💳</span> Payment Option
                </h3>

                <div className="grid-stack" style={{ gap: '0.75rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: form.paymentMode === 'pay_at_hotel' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
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
                      style={{ accentColor: 'var(--color-primary)', width: '20px', height: '20px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Pay at Hotel</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Safe & Secure. Pay during check-in.</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: '1rem',
                    border: form.paymentMode === 'upi_advance' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
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
                      style={{ accentColor: 'var(--color-primary)', width: '20px', height: '20px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>UPI (Instant Confirmation)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Pay via Google Pay, PhonePe or Paytm.</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

          {/* Right - Summary */}
            <div className="glass-card" style={{
              padding: '1.5rem',
              position: 'sticky',
              top: '90px',
              zIndex: 10,
              border: '2px solid var(--color-border)',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Summary</h3>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px dashed var(--color-border)',
              }}>
                <img
                  src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'}
                  alt={hotel.name}
                  style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '0.75rem' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-secondary)' }}>{hotel.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>📍 {hotel.city}</p>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Stay Duration</span>
                  <span style={{ fontWeight: 700 }}>{nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Room Type</span>
                  <span style={{ fontWeight: 700 }}>{selectedRoom?.type || 'Select...'}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem 0',
                borderTop: '2.5px solid var(--color-primary-light)',
                marginBottom: '1.5rem',
              }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Pay Now</span>
                <span style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--color-primary)' }}>
                  {totalPrice > 0 ? `₹${totalPrice}` : '₹0'}
                </span>
              </div>

              {error && (
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  background: '#FEF2F2',
                  color: 'var(--color-error)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  border: '1px solid rgba(220,38,38,0.2)'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting || totalPrice === 0}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  borderRadius: '50px',
                  opacity: (submitting || totalPrice === 0) ? 0.6 : 1,
                  boxShadow: 'var(--shadow-primary)',
                }}
              >
                {submitting && !showRazorpayMock ? 'Confirming...' : (form.paymentMode === 'upi_advance' ? 'Pay Now →' : 'Place Order →')}
              </button>
            </div>
          </div>
        </form>

        {showRazorpayMock && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}>
            <div className="animate-slide-up" style={{
              background: 'white',
              width: '90%',
              maxWidth: '420px',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Header */}
              <div style={{ background: '#0F172A', padding: '1.5rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'white', padding: '0.25rem', borderRadius: '0.35rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em' }}>BharatRazor</div>
                </div>
                {mockPaymentStage !== 'success' && (
                  <button onClick={() => { setShowRazorpayMock(false); setSubmitting(false); }} style={{ background: 'none', border: 'none', color: 'white', opacity: 0.7, cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.5rem' }}>PAYING BHARATYATRI STAY</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-secondary)' }}>₹{totalPrice}</div>
                </div>

                {mockPaymentStage === 'initializing' && (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-muted)' }}>
                    <div style={{ fontSize: '2rem', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}>↻</div>
                    <div style={{ fontWeight: 600 }}>Initializing secure connection...</div>
                  </div>
                )}

                {mockPaymentStage === 'processing' && (
                  <div>
                    <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <div style={{ width: '40px', height: '40px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>💳</div>
                       <div>
                         <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Test UPI ID</div>
                         <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>testing@ybl</div>
                       </div>
                    </div>
                    <button
                      onClick={handleMockPaymentSuccess}
                      className="btn-primary"
                      style={{ width: '100%', padding: '1rem', borderRadius: '50px', fontSize: '1rem', background: '#0F172A', color: 'white' }}
                    >
                      Authenticate Payment
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      This is a test environment. No real money will be deducted.
                    </div>
                  </div>
                )}

                {mockPaymentStage === 'success' && (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ width: '60px', height: '60px', background: '#DCFCE7', color: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem auto' }}>✓</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16A34A', marginBottom: '0.5rem' }}>Payment Successful!</div>
                    <div style={{ color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>Redirecting you to confirmation page...</div>
                  </div>
                )}
              </div>
              <div style={{ background: '#F8FAFC', padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, borderTop: '1px solid var(--color-border)' }}>
                 🔒 Secured by <strong style={{ color: '#0F172A' }}>BharatRazor</strong> 128-bit encryption
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @media (max-width: 850px) {
            .checkout-grid {
              grid-template-columns: 1fr !important;
            }
            :global(.glass-card) {
                position: relative !important;
                top: 0 !important;
            }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
