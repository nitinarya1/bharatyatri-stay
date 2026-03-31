'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function SearchBar({ initialCity = 'Prayagraj' }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [city, setCity] = useState(initialCity);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?city=${city}`);
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      // Simple coordinate check for closest city
      const prayagraj = { lat: 25.43, lon: 81.84 };
      const varanasi = { lat: 25.31, lon: 82.97 };

      const distP = Math.sqrt(Math.pow(latitude - prayagraj.lat, 2) + Math.pow(longitude - prayagraj.lon, 2));
      const distV = Math.sqrt(Math.pow(latitude - varanasi.lat, 2) + Math.pow(longitude - varanasi.lon, 2));

      if (distP < distV) setCity('Prayagraj');
      else setCity('Varanasi');
      
      setLoadingLocation(false);
    }, () => {
      setLoadingLocation(false);
      alert('Unable to retrieve location');
    });
  };

  return (
    <div className="search-bar-wrapper" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <form onSubmit={handleSearch} className="glass shadow-large" style={{
        display: 'flex',
        background: 'white',
        borderRadius: '1.25rem',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        padding: '0.5rem'
      }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: '1.25rem', color: 'var(--color-primary)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <select 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1rem 1rem 1rem 3.5rem', 
              border: 'none', 
              outline: 'none',
              background: 'transparent', 
              fontWeight: 700, 
              fontSize: '1.1rem',
              color: 'var(--color-secondary)',
              appearance: 'none',
              cursor: 'pointer'
            }}
          >
            <option>Prayagraj</option>
            <option>Varanasi</option>
            <option>Ayodhya</option>
            <option>Lucknow</option>
          </select>
          
          <button 
            type="button"
            onClick={handleNearMe}
            style={{
              position: 'absolute',
              right: '1rem',
              background: '#F1F5F9',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            {loadingLocation ? (
              <span className="animate-pulse">Detecting...</span>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M20 12h2"/><path d="M12 2v2"/><path d="M4 12H2"/><path d="M12 22v-2"/></svg>
                {t('nearMe')}
              </>
            )}
          </button>
        </div>
        <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2.5rem', borderRadius: '0.85rem', fontSize: '1.1rem', fontWeight: 850 }}>
          Search
        </button>
      </form>
      
      {/* Quick Links / SEO Text */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['Varanasi', 'Prayagraj', 'Ayodhya'].map(c => (
          <button 
            key={c}
            onClick={() => { setCity(c); router.push(`/search?city=${c}`); }}
            style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid var(--color-border)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', cursor: 'pointer' }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
