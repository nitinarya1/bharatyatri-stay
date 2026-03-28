'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminLogin(username, password);
      if (res.success) {
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_username', res.data.username);
        router.push('/admin/dashboard');
      } else {
        setError(res.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--color-surface-alt)',
    }}>
      <div className="animate-fade-in-up" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        background: 'white',
        border: '1px solid var(--color-border)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-flex',
            width: '60px',
            height: '60px',
            borderRadius: '1rem',
            background: 'var(--color-primary-light)',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            marginBottom: '1rem',
          }}>
            🔐
          </span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Admin Login</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            BharatYatri Stay Management Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Username
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
              Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              background: '#FEF2F2',
              color: 'var(--color-error)',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '1rem',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? '⏳ Logging in...' : 'Login →'}
          </button>
        </form>
      </div>
    </div>
  );
}
