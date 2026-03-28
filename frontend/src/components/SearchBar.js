'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initialCity = '', compact = false }) {
  const [city, setCity] = useState(initialCity);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/search?city=${encodeURIComponent(city.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const quickCities = ['Prayagraj', 'Varanasi'];

  if (compact) {
    return (
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
        maxWidth: '500px',
      }}>
        <input
          type="text"
          placeholder="Search city or temple..."
          value={city}
          onChange={e => setCity(e.target.value)}
          className="input-field"
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          🔍 Search
        </button>
      </form>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        background: 'white',
        borderRadius: '1rem',
        border: '2px solid var(--color-border)',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--color-primary)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,114,12,0.15)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
          <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>📍</span>
          <input
            type="text"
            placeholder="Where are you going? (e.g. Varanasi, Prayagraj)"
            value={city}
            onChange={e => setCity(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              padding: '1rem 0',
              fontSize: '1rem',
              background: 'transparent',
              color: 'var(--color-text-primary)',
            }}
          />
        </div>
        <button type="submit" className="btn-primary" style={{
          borderRadius: '0 0.875rem 0.875rem 0',
          padding: '1rem 1.5rem',
          fontSize: '1rem',
        }}>
          Search Stays
        </button>
      </form>

      {/* Quick City Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>Popular:</span>
        {quickCities.map(c => (
          <button
            key={c}
            onClick={() => { setCity(c); router.push(`/search?city=${c}`); }}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              border: '1.5px solid var(--color-border)',
              background: 'white',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.color = 'var(--color-primary)';
              e.target.style.background = 'var(--color-primary-light)';
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = 'var(--color-border)';
              e.target.style.color = 'var(--color-text-secondary)';
              e.target.style.background = 'white';
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
