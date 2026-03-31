'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '@/lib/api';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      router.push('/');
      return;
    }
    loadProfile(token);
  }, [router]);

  const loadProfile = async (token) => {
    try {
      const res = await fetchUserProfile(token);
      if (res.success) {
        setProfileData(res.data);
        setEditForm({ name: res.data.user.name, email: res.data.user.email || '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('user_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Profile updated successfully!');
        setEditing(false);
        // Update local auth context
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const newUser = { ...userData, name: editForm.name, email: editForm.email };
        login(newUser, token);
        loadProfile(token);
      } else {
        setMessage(data.error || 'Failed to update');
      }
    } catch (err) {
      setMessage('Update failed');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem' }}>Loading Profile...</div>;
  if (!profileData) return <div style={{ textAlign: 'center', padding: '10rem' }}>User not found</div>;

  return (
    <div className="bg-grid" style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          
          {/* Sidebar Info */}
          <div className="glass shadow-large" style={{ padding: '2rem', height: 'fit-content', borderRadius: '1.5rem', background: 'white' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 800, margin: '0 auto 1.5rem auto' }}>
              {profileData.user.name.charAt(0)}
            </div>
            <h2 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>{profileData.user.name}</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>{profileData.user.phone}</p>
            
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <button 
                onClick={() => setEditing(!editing)}
                className="btn-outline" 
                style={{ width: '100%', marginBottom: '0.75rem' }}
              >
                {editing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Profile Details / Edit Form */}
            <div className="glass shadow-large" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Profile Information</h3>
              
              {message && (
                <div style={{ padding: '0.75rem', borderRadius: '0.75rem', background: message.includes('success') ? '#DCFCE7' : '#FEF2F2', color: message.includes('success') ? '#16A34A' : '#DC2626', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                  {message}
                </div>
              )}

              {editing ? (
                <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Full Name</label>
                    <input type="text" className="input-field" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>Email Address</label>
                    <input type="email" className="input-field" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Save Changes</button>
                </form>
              ) : (
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Full Name</span>
                    <span style={{ fontWeight: 700 }}>{profileData.user.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Email</span>
                    <span style={{ fontWeight: 700 }}>{profileData.user.email || 'Not provided'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Phone</span>
                    <span style={{ fontWeight: 700 }}>{profileData.user.phone}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bookings */}
            <div className="glass shadow-large" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'white' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>My Bookings</h3>
              
              {profileData.bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                  You haven't made any bookings yet.
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {profileData.bookings.map(booking => (
                    <div key={booking._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
                      <div>
                        <div style={{ fontWeight: 800, color: 'var(--color-secondary)' }}>{booking.hotelDetails?.name || 'Hotel Booking'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary)' }}>₹{booking.totalPrice}</div>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '0.35rem',
                          textTransform: 'uppercase',
                          background: booking.status === 'confirmed' ? '#DCFCE7' : '#F1F5F9',
                          color: booking.status === 'confirmed' ? '#16A34A' : '#64748B'
                        }}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
