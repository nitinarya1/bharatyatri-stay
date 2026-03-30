'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchUserProfile } from '@/lib/api';

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      const token = localStorage.getItem('user_token');
      fetchUserProfile(token)
        .then(res => {
          if (res.success) {
            setProfileData(res.data);
          } else {
            setError(res.error || 'Failed to fetch profile');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Connection error');
          setLoading(false);
        });
    }
  }, [user, authLoading, router]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return { bg: '#F0FDF4', text: '#16A34A', border: '#DCFCE7' };
      case 'completed': return { bg: '#EFF6FF', text: '#2563EB', border: '#DBEAFE' };
      case 'cancelled': return { bg: '#FEF2F2', text: '#DC2626', border: '#FEE2E2' };
      default: return { bg: '#F9FAFB', text: '#6B7280', border: '#F3F4F6' };
    }
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #E5E7EB', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="section-spacing" style={{ background: 'var(--color-surface-alt)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          <div>
            <h1 className="text-balance" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
              Jai Hind, {user?.name}!
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Welcome to your spiritual travel dashboard</p>
          </div>
          <button 
            onClick={() => { logout(); router.push('/'); }} 
            className="btn-outline" 
            style={{ 
              borderColor: '#DC2626', 
              color: '#DC2626', 
              padding: '0.6rem 1.5rem',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: 700
            }}
          >
            Log Out Account
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
          {/* Left - Account Details */}
          <div className="glass shadow-medium" style={{ padding: '2rem', borderRadius: '1.5rem', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👤 Account Details
            </h2>
            <div className="grid-stack" style={{ gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Email Address</label>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{user?.email}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Phone</label>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{profileData?.user?.phone || 'Not provided'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Total Stays</label>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{profileData?.bookings?.length || 0} Bookings</div>
              </div>
            </div>
          </div>

          {/* Right - Booking History */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              📅 Stay History
            </h2>
            
            {!profileData?.bookings || profileData.bookings.length === 0 ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No bookings found</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Your spiritual journey awaits.</p>
                <button onClick={() => router.push('/search')} className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '50px' }}>
                  Find Stays Now
                </button>
              </div>
            ) : (
              <div className="grid-stack" style={{ gap: '1.25rem' }}>
                {profileData.bookings.map(booking => {
                  const status = getStatusColor(booking.status);
                  return (
                    <div key={booking._id} className="glass shadow-small" style={{
                      padding: '1.5rem',
                      borderRadius: '1.25rem',
                      background: 'white',
                      border: '1px solid white',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.25rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'var(--color-primary-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            flexShrink: 0
                          }}>🏨</div>
                          <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{booking.hotelName}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{booking.roomType}</p>
                          </div>
                        </div>
                        <span style={{
                          padding: '0.35rem 0.85rem',
                          borderRadius: '50px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          background: status.bg,
                          color: status.text,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          border: `1px solid ${status.border}`
                        }}>
                          {booking.status}
                        </span>
                      </div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px dashed var(--color-border)',
                        fontSize: '0.85rem',
                      }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Check-in</div>
                          <div style={{ fontWeight: 700 }}>{new Date(booking.checkIn).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Check-out</div>
                          <div style={{ fontWeight: 700 }}>{new Date(booking.checkOut).toLocaleDateString()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Total Paid</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)' }}>₹{booking.totalPrice}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
