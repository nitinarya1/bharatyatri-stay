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

  return (
    <div style={{ padding: '2rem 1rem', background: 'var(--color-surface-alt)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>📊 Admin Dashboard</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Welcome, {typeof window !== 'undefined' ? localStorage.getItem('admin_username') : 'admin'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/admin/hotels" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>
              🏨 Manage Hotels
            </Link>
            <button onClick={handleLogout} style={{
              padding: '0.6rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
              background: 'white',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Total Bookings', value: stats.total, icon: '📋', color: 'var(--color-primary)' },
            { label: 'Confirmed', value: stats.confirmed, icon: '✅', color: 'var(--color-success)' },
            { label: 'Completed', value: stats.completed, icon: '🎉', color: '#2563EB' },
            { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: '💰', color: 'var(--color-accent)' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '1.25rem',
              borderRadius: '1rem',
              background: 'white',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bookings Table */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '1.25rem',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Bookings</h3>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              No bookings yet. Share your website to get bookings!
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--color-surface-alt)' }}>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Guest</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hotel</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Dates</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Amount</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => {
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
