'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { userRegister } from '@/lib/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await userRegister(formData);
      if (res.success) {
        login(res.data.user, res.data.token);
        router.push('/');
      } else {
        setError(res.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-grid" style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
    }}>
      <div className="glass shadow-large" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '3rem 2.5rem',
        borderRadius: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Join BharatYatri</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontWeight: 500 }}>Create an account to track your holy journeys</p>

        {error && (
          <div style={{
            background: '#FEF2F2',
            color: '#DC2626',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
            fontWeight: 600,
            border: '1px solid #FEE2E2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Jagannath Prasad"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Email</label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="name@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.85rem 1rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Phone</label>
              <input
                type="tel"
                required
                className="input-field"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '0.85rem 1rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>Create Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '1rem' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
