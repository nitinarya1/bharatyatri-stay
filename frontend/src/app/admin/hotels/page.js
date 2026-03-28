'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchHotels, createHotel, deleteHotel } from '@/lib/api';

export default function AdminHotelsPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: 'Prayagraj',
    address: '',
    description: '',
    images: '',
    pricePerNight: '',
    contactPhone: '',
    mapLink: '',
    propertyType: 'hotel',
    amenities: '',
    nearbyAttractions: '',
    roomTypes: [{ type: '', price: '', available: '' }],
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) { router.push('/admin'); return; }
    setToken(t);
    loadHotels();
  }, [router]);

  const loadHotels = async () => {
    setLoading(true);
    try {
      const res = await fetchHotels();
      if (res.success) setHotels(res.data);
    } catch (err) { }
    setLoading(false);
  };

  const handleAddRoom = () => {
    setFormData(f => ({
      ...f,
      roomTypes: [...f.roomTypes, { type: '', price: '', available: '' }]
    }));
  };

  const handleRemoveRoom = (index) => {
    setFormData(f => ({
      ...f,
      roomTypes: f.roomTypes.filter((_, i) => i !== index)
    }));
  };

  const handleRoomChange = (index, field, value) => {
    setFormData(f => ({
      ...f,
      roomTypes: f.roomTypes.map((r, i) => i === index ? { ...r, [field]: value } : r)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const hotelData = {
      ...formData,
      pricePerNight: Number(formData.pricePerNight),
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      nearbyAttractions: formData.nearbyAttractions.split(',').map(s => s.trim()).filter(Boolean),
      roomTypes: formData.roomTypes.map(r => ({
        type: r.type,
        price: Number(r.price),
        available: Number(r.available),
      })).filter(r => r.type && r.price),
    };

    try {
      const res = await createHotel(hotelData, token);
      if (res.success) {
        setFormSuccess('Hotel added successfully!');
        setShowForm(false);
        setFormData({
          name: '', city: 'Prayagraj', address: '', description: '', images: '',
          pricePerNight: '', contactPhone: '', mapLink: '', propertyType: 'hotel',
          amenities: '', nearbyAttractions: '', roomTypes: [{ type: '', price: '', available: '' }],
        });
        loadHotels();
      } else {
        setFormError(res.error || 'Failed to add hotel');
      }
    } catch (err) {
      setFormError('Connection error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteHotel(id, token);
      loadHotels();
    } catch (err) { }
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>🏨 Manage Hotels</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Add, edit, and manage listed properties
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/admin/dashboard" style={{
              padding: '0.6rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
              background: 'white',
              textDecoration: 'none',
              color: 'var(--color-text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}>
              ← Dashboard
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              {showForm ? '✕ Cancel' : '+ Add Hotel'}
            </button>
          </div>
        </div>

        {formSuccess && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            background: '#DCFCE7',
            color: 'var(--color-success)',
            fontWeight: 500,
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            ✅ {formSuccess}
          </div>
        )}

        {/* Add Hotel Form */}
        {showForm && (
          <div className="animate-slide-down" style={{
            padding: '1.5rem',
            borderRadius: '1rem',
            background: 'white',
            border: '1px solid var(--color-border)',
            marginBottom: '2rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Add New Hotel</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Hotel Name *</label>
                  <input type="text" className="input-field" placeholder="e.g. Shri Ram Dharamshala" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>City *</label>
                  <select className="input-field" value={formData.city} onChange={e => setFormData(f => ({ ...f, city: e.target.value }))}>
                    <option>Prayagraj</option>
                    <option>Varanasi</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Address *</label>
                <input type="text" className="input-field" placeholder="Full address" value={formData.address} onChange={e => setFormData(f => ({ ...f, address: e.target.value }))} required />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Description *</label>
                <textarea className="input-field" rows={3} placeholder="Describe the property..." value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} required style={{ resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Starting Price *</label>
                  <input type="number" className="input-field" placeholder="₹500" value={formData.pricePerNight} onChange={e => setFormData(f => ({ ...f, pricePerNight: e.target.value }))} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Phone *</label>
                  <input type="tel" className="input-field" placeholder="9876543210" value={formData.contactPhone} onChange={e => setFormData(f => ({ ...f, contactPhone: e.target.value }))} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Property Type</label>
                  <select className="input-field" value={formData.propertyType} onChange={e => setFormData(f => ({ ...f, propertyType: e.target.value }))}>
                    <option value="hotel">Hotel</option>
                    <option value="dharamshala">Dharamshala</option>
                    <option value="guest_house">Guest House</option>
                    <option value="lodge">Lodge</option>
                  </select>
                </div>
              </div>

              {/* Room Types */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Room Types</label>
                {formData.roomTypes.map((room, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <input type="text" className="input-field" placeholder="Room type (e.g. AC Double)" value={room.type} onChange={e => handleRoomChange(i, 'type', e.target.value)} style={{ flex: 2 }} />
                    <input type="number" className="input-field" placeholder="Price" value={room.price} onChange={e => handleRoomChange(i, 'price', e.target.value)} style={{ flex: 1 }} />
                    <input type="number" className="input-field" placeholder="Available" value={room.available} onChange={e => handleRoomChange(i, 'available', e.target.value)} style={{ flex: 1 }} />
                    {formData.roomTypes.length > 1 && (
                      <button type="button" onClick={() => handleRemoveRoom(i)} style={{
                        padding: '0.5rem', border: 'none', background: '#FEE2E2', color: 'var(--color-error)',
                        borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 700
                      }}>✕</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddRoom} style={{
                  padding: '0.4rem 0.75rem', border: '1px dashed var(--color-border)', background: 'transparent',
                  borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-text-muted)'
                }}>+ Add Room Type</button>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Image URLs (comma separated)</label>
                <input type="text" className="input-field" placeholder="https://image1.jpg, https://image2.jpg" value={formData.images} onChange={e => setFormData(f => ({ ...f, images: e.target.value }))} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Amenities (comma separated)</label>
                <input type="text" className="input-field" placeholder="WiFi, Hot Water, Parking, Temple Nearby" value={formData.amenities} onChange={e => setFormData(f => ({ ...f, amenities: e.target.value }))} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Nearby Attractions (comma separated)</label>
                <input type="text" className="input-field" placeholder="Kashi Vishwanath (500m), Dashashwamedh Ghat (1km)" value={formData.nearbyAttractions} onChange={e => setFormData(f => ({ ...f, nearbyAttractions: e.target.value }))} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>Google Maps Link</label>
                <input type="text" className="input-field" placeholder="https://maps.google.com/..." value={formData.mapLink} onChange={e => setFormData(f => ({ ...f, mapLink: e.target.value }))} />
              </div>

              {formError && (
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#FEF2F2', color: 'var(--color-error)', fontSize: '0.8rem', fontWeight: 500 }}>
                  ❌ {formError}
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Add Hotel →
              </button>
            </form>
          </div>
        )}

        {/* Hotels List */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
              Listed Properties ({hotels.length})
            </h3>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>Loading...</div>
          ) : hotels.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
              No hotels listed yet. Click "Add Hotel" to get started.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1px', background: 'var(--color-border)' }}>
              {hotels.map(hotel => (
                <div key={hotel._id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'white',
                }}>
                  <img
                    src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'}
                    alt={hotel.name}
                    style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{hotel.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {hotel.city} • {hotel.propertyType} • ₹{hotel.pricePerNight}/night
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <span className="badge" style={{
                      background: hotel.rating >= 4 ? '#DCFCE7' : '#FEF3C7',
                      color: hotel.rating >= 4 ? '#16A34A' : '#92400E',
                    }}>
                      ★ {hotel.rating?.toFixed(1)}
                    </span>
                    <button
                      onClick={() => handleDelete(hotel._id, hotel.name)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        borderRadius: '0.35rem',
                        border: '1px solid #FCA5A5',
                        background: '#FEF2F2',
                        color: 'var(--color-error)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
