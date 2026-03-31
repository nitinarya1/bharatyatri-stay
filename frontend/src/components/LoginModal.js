'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userLogin, userRegister } from '@/lib/api';

export default function LoginModal() {
  const { isLoginModalOpen, setLoginModalOpen, login } = useAuth();
  const [step, setStep] = useState('phone'); // phone, otp, password, signup
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    password: '',
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isLoginModalOpen) return null;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (formData.phone.length < 10) return setError('Invalid phone number');
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });
      const data = await res.json();
      if (data.success) {
        setStep('otp');
        setTimer(60);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Connection error. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: formData.otp })
      });
      const data = await res.json();
      if (data.success) {
        login(data.data.user, data.data.token);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await userLogin({ phone: formData.phone, password: formData.password });
      if (res.success) {
        login(res.data.user, res.data.token);
      } else {
        setError(res.error || 'Invalid password');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await userRegister(formData);
      if (res.success) {
        login(res.data.user, res.data.token);
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div className="glass shadow-large animate-slide-up" style={{
        width: '100%',
        maxWidth: '420px',
        background: 'white',
        borderRadius: '2rem',
        padding: '2.5rem',
        position: 'relative'
      }}>
        <button 
          onClick={() => setLoginModalOpen(false)}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#94A3B8' }}
        >
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
            {step === 'signup' ? 'Create Account' : 'Welcome to BharatYatri'}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            {step === 'phone' && 'Enter your phone number to continue'}
            {step === 'otp' && `Enter OTP sent to ${formData.phone}`}
            {step === 'password' && 'Enter your account password'}
            {step === 'signup' && 'Fill in your details to get started'}
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 600 }}>
            {error}
          </div>
        )}

        {step === 'phone' && (
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', border: '2px solid var(--color-border)', borderRadius: '1rem', padding: '0.75rem 1rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>+91</span>
                <input 
                  type="tel" 
                  maxLength={10}
                  placeholder="Mobile Number" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g,'')})}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', fontWeight: 600 }}
                  required
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', fontSize: '1rem' }}>
              {loading ? 'Sending...' : 'Continue'}
            </button>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button type="button" onClick={() => setStep('password')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
                Login with Password?
              </button>
            </div>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                maxLength={6}
                placeholder="6-digit OTP" 
                className="input-field"
                value={formData.otp}
                onChange={e => setFormData({...formData, otp: e.target.value.replace(/\D/g,'')})}
                style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.5rem' }}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', fontSize: '1rem' }}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="button" onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                Edit Number?
              </button>
              <button 
                type="button" 
                disabled={timer > 0}
                onClick={handleSendOTP}
                style={{ background: 'none', border: 'none', color: timer > 0 ? '#CBD5E1' : 'var(--color-primary)', fontWeight: 700, cursor: timer > 0 ? 'default' : 'pointer', fontSize: '0.85rem' }}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Phone Number</label>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="input-field"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-field"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', fontSize: '1rem' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <button type="button" onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer' }}>
                Login via OTP?
              </button>
              <button type="button" onClick={() => setStep('signup')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontWeight: 700, cursor: 'pointer' }}>
                New User? Signup
              </button>
            </div>
          </form>
        )}

        {step === 'signup' && (
          <form onSubmit={handleSignup}>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="Full Name" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <input type="email" placeholder="Email (Optional)" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="tel" placeholder="Phone Number" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
              <input type="password" placeholder="Create Password" className="input-field" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', fontSize: '1rem' }}>
              {loading ? 'Creating...' : 'Sign Up'}
            </button>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button type="button" onClick={() => setStep('password')} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                Already have an account? Login
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>
          By continuing, you agree to our <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>Terms</span> & <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
