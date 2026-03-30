'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchBookings, updateBookingStatus } from '@/lib/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic
  const filteredBookings = bookings.filter(b => 
    b.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.guestPhone?.includes(searchTerm) ||
    b.hotelName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) {
      router.push('/admin');
      return;
    }
    setToken(t);
    loadBookings(t);
  }, [router]);

  const loadBookings = async (t) => {
    setLoading(true);
    try {
      const res = await fetchBookings(t);
      if (res.success) setBookings(res.data);
      else if (res.error === 'Invalid or expired token.') {
        localStorage.removeItem('admin_token');
        router.push('/admin');
      }
    } catch (err) { }
    setLoading(false);
  };

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus(id, status, token);
    loadBookings(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    router.push('/admin');
  };

  const statusColors = {
    pending: { bg: '#FEF3C7', color: '#92400E' },
    confirmed: { bg: '#DCFCE7', color: '#16A34A' },
    cancelled: { bg: '#FEE2E2', color: '#DC2626' },
    completed: { bg: '#DBEAFE', color: '#2563EB' },
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    revenue: bookings.filter(b => ['confirmed', 'completed'].includes(b.status)).reduce((sum, b) => sum + b.totalPrice, 0),
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="section-spacing" style={{ background: 'var(--color-surface-alt)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, color: 'var(--color-secondary)' }}>📊 Admin Dashboard</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Welcome back, {typeof window !== 'undefined' ? localStorage.getItem('admin_username') : 'admin'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/admin/hotels" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.85rem', borderRadius: '50px' }}>
              🏨 Hotels
            </Link>
            <button onClick={handleLogout} className="btn-outline" style={{ borderRadius: '50px', fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {[
            { label: 'Total Volume', value: stats.total, icon: '📋', color: 'var(--color-primary)' },
            { label: 'Active Tasks', value: stats.confirmed, icon: '✅', color: 'var(--color-success)' },
            { label: 'Completed', value: stats.completed, icon: '🎉', color: '#2563EB' },
            { label: 'Net Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: '💰', color: 'var(--color-accent)' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bookings Section */}
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent Activity</h3>
            <div style={{ position: 'relative', flex: '1', maxWidth: '300px', minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Search Guest / Phone / Hotel..."
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.6rem 1rem 0.6rem 2.5rem',
                  fontSize: '0.85rem',
                  borderRadius: '50px',
                  width: '100%'
                }}
              />
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--color-text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔎</div>
              <p style={{ fontWeight: 600 }}>No matching bookings found.</p>
              <button 
                onClick={() => setSearchTerm('')} 
                style={{ color: 'var(--color-primary)', background: 'none', border: 'none', fontWeight: 700, marginTop: '0.5rem', cursor: 'pointer' }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Guest Information</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Stay Details</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Check In - Out</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Payment</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map(booking => {
                    const sc = statusColors[booking.status] || statusColors.pending;
                    return (
                      <tr key={booking._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ fontWeight: 600 }}>{booking.guestName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{booking.guestPhone}</div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ fontWeight: 500 }}>{booking.hotelName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{booking.roomType}</div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem' }}>
                          {new Date(booking.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          {' → '}
                          {new Date(booking.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>₹{booking.totalPrice}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            background: sc.bg,
                            color: sc.color,
                            textTransform: 'uppercase',
                          }}>
                            {booking.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <select
                            value={booking.status}
                            onChange={e => handleStatusChange(booking._id, e.target.value)}
                            style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '0.35rem',
                              border: '1px solid var(--color-border)',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
