'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  let booking = null;

  try {
    const data = searchParams.get('data');
    if (data) booking = JSON.parse(decodeURIComponent(data));
  } catch (e) {}

  if (!booking) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <h2>No booking data found</h2>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="animate-fade-in-up" style={{
          padding: '2.5rem',
          borderRadius: '1.5rem',
          border: '2px solid #DCFCE7',
          background: '#F0FDF4',
        }}>
          {/* Success Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '2.5rem',
          }}>
            ✓
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)', marginBottom: '0.5rem' }}>
            Booking Confirmed! 🎉
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Your stay has been booked successfully. Details are below.
          </p>

          {/* Booking Details */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'left',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
              🏨 {booking.hotelName}
            </h3>

            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Booking ID</span>
                <span style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.85rem' }}>{booking.bookingId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Guest Name</span>
                <span style={{ fontWeight: 600 }}>{booking.guestName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Check-in</span>
                <span style={{ fontWeight: 600 }}>{new Date(booking.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Check-out</span>
                <span style={{ fontWeight: 600 }}>{new Date(booking.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Room Type</span>
                <span style={{ fontWeight: 600 }}>{booking.roomType}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Payment</span>
                <span className="badge" style={{
                  background: booking.paymentMode === 'pay_at_hotel' ? '#FEF3C7' : '#DBEAFE',
                  color: booking.paymentMode === 'pay_at_hotel' ? '#92400E' : '#1D4ED8',
                }}>
                  {booking.paymentMode === 'pay_at_hotel' ? 'Pay at Hotel' : 'UPI Advance'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total Amount</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>₹{booking.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Hotel Contact */}
          {booking.hotelPhone && (
            <div style={{
              padding: '1rem',
              borderRadius: '0.75rem',
              background: 'var(--color-secondary-light)',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: 500 }}>
                📞 Hotel Contact: <a href={`tel:${booking.hotelPhone}`} style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{booking.hotelPhone}</a>
              </p>
              {booking.hotelAddress && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  📍 {booking.hotelAddress}
                </p>
              )}
            </div>
          )}

          <div style={{
            padding: '0.75rem',
            borderRadius: '0.5rem',
            background: '#FEF3C7',
            fontSize: '0.8rem',
            color: '#92400E',
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}>
            ⚠️ Please carry a valid Government ID (Aadhaar/Passport) at check-in.
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
              🏠 Back to Home
            </Link>
            <Link href="/search" className="btn-outline" style={{ textDecoration: 'none' }}>
              🔍 Find More Stays
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
