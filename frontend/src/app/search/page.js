'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import { fetchHotels } from '@/lib/api';

function SearchContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    amenities: [],
  });

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (city) params.city = city;
    if (filters.type) params.type = filters.type;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.sort) params.sort = filters.sort;
    if (filters.amenities.length > 0) params.amenities = filters.amenities.join(',');

    fetchHotels(params).then(res => {
      if (res.success) setHotels(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [city, filters]);

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div className="container">
        {/* Search Header */}
        <div style={{ marginBottom: '2rem' }}>
          <SearchBar initialCity={city} compact />
        </div>

        {/* Mobile Filters Area */}
        <div className="show-mobile" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
            <div style={{ flexShrink: 0 }}>
              <select
                className="input-field"
                value={filters.type}
                onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', width: 'auto', borderRadius: '50px' }}
              >
                <option value="">All Types</option>
                <option value="hotel">Hotels</option>
                <option value="dharamshala">Dharamshalas</option>
                <option value="guest_house">Guest Houses</option>
              </select>
            </div>
            <div style={{ flexShrink: 0 }}>
              <select
                className="input-field"
                value={filters.sort}
                onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', width: 'auto', borderRadius: '50px' }}
              >
                <option value="">Sorted by: Latest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
            <button
              onClick={() => setFilters({ type: '', minPrice: '', maxPrice: '', sort: '', amenities: [] })}
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem', borderRadius: '50px', whiteSpace: 'nowrap' }}
            >
              Clear
            </button>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'flex-start',
        }}>
          {/* Filters Sidebar (Desktop Only) */}
          <div className="filters-sidebar hidden-mobile" style={{
            width: '260px',
            flexShrink: 0,
            padding: '1.25rem',
            borderRadius: '1rem',
            border: '1px solid var(--color-border)',
            background: 'white',
            position: 'sticky',
            top: '80px',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>🔧 Filters</h3>

            {/* Property Type */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Property Type
              </label>
              <select
                className="input-field"
                value={filters.type}
                onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                style={{ fontSize: '0.85rem' }}
              >
                <option value="">All Types</option>
                <option value="hotel">Hotel</option>
                <option value="dharamshala">Dharamshala</option>
                <option value="guest_house">Guest House</option>
                <option value="lodge">Lodge</option>
              </select>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Price Range (₹/night)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="number"
                  placeholder="Min"
                  className="input-field"
                  value={filters.minPrice}
                  onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))}
                  style={{ fontSize: '0.85rem' }}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="input-field"
                  value={filters.maxPrice}
                  onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Sort */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Sort By
              </label>
              <select
                className="input-field"
                value={filters.sort}
                onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}
                style={{ fontSize: '0.85rem' }}
              >
                <option value="">Latest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Amenities
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['AC', 'Free WiFi', 'Breakfast Included', 'Parking'].map((amenity) => (
                  <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={(e) => {
                        const newAmens = e.target.checked
                          ? [...filters.amenities, amenity]
                          : filters.amenities.filter(a => a !== amenity);
                        setFilters(f => ({ ...f, amenities: newAmens }));
                      }}
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setFilters({ type: '', minPrice: '', maxPrice: '', sort: '', amenities: [] })}
              style={{
                width: '100%',
                padding: '0.6rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.75rem',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.target.style.borderColor = 'var(--color-error)'}
              onMouseLeave={e => e.target.style.borderColor = 'var(--color-border)'}
            >
              Clear Filters
            </button>
          </div>

          {/* Results */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {city ? `Stays in ${city}` : 'All Stays'}
                {!loading && <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                  ({hotels.length} found)
                </span>}
              </h2>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
                Searching for the best stays...
              </div>
            ) : hotels.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'var(--color-surface-alt)',
                borderRadius: '1rem',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>No stays found</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="stagger-children" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}>
                {hotels.map(hotel => (
                  <HotelCard key={hotel._id} hotel={hotel} />
                ))}
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .filters-sidebar {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
        Loading...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
