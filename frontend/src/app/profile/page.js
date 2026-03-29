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
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Jai Hind, {user?.name}!</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Welcome to your spiritual travel dashboard</p>
          </div>
          <button onClick={() => { logout(); router.push('/'); }} className="btn-outline" style={{ 
            borderColor: '#DC2626', 
            color: '#DC2626', 
            padding: '0.6rem 1.5rem',
            borderRadius: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 700
          }}>
            Log Out Account
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Account Overview */}
          <div className="glass shadow-medium" style={{ padding: '2rem', borderRadius: '1.5rem', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👤 Account Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Email</label>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{user?.email}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Phone</label>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{profileData?.user?.phone || 'Loading...'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Total Stays</label>
                <div style={{ fontSize: '1rem', fontWeight: 600 }}>{profileData?.bookings?.length || 0} Bookings</div>
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div style={{ gridColumn: 'span 2' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              📅 My Stays & History
            </h2>
            
            {profileData?.bookings?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '1.5rem', border: '2px dashed #E5E7EB' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No bookings found</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>You haven&apos;t started your spiritual journey yet.</p>
                <button onClick={() => router.push('/search')} className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '50px' }}>
                  Explore Stays Now
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {profileData?.bookings?.map(booking => {
                  const status = getStatusColor(booking.status);
                  return (
                    <div key={booking._id} className="glass shadow-small" style={{
                      padding: '1.5rem',
                      borderRadius: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      border: '1px solid white',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-secondary)' }}>{booking.hotelName}</h3>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '50px',
                            background: status.bg,
                            color: status.text,
                            border: `1px solid ${status.border}`
                          }}>
                            {booking.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                          {new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>₹{booking.totalPrice}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>{booking.roomType}</div>
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
