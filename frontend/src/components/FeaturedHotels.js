'use client';
import { useState, useEffect } from 'react';
import HotelCard from './HotelCard';
import { fetchHotels } from '@/lib/api';

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels().then(res => {
      if (res.success) {
        setHotels(res.data);
      }
      setLoading(false);
    }).catch(err => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
        Loading curated stays...
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
        No stays available currently.
      </div>
    );
  }

  return (
    <div className="stagger-children" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
      gap: '1.5rem',
    }}>
      {hotels.slice(0, 6).map(hotel => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
}
