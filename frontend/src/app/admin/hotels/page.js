'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchHotels, createHotel, updateHotel, deleteHotel } from '@/lib/api';

export default function AdminHotelsPage() {
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
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

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      description: hotel.description,
      images: hotel.images?.join(', ') || '',
      pricePerNight: hotel.pricePerNight,
      contactPhone: hotel.contactPhone || '',
      mapLink: hotel.mapLink || '',
      propertyType: hotel.propertyType || 'hotel',
      amenities: hotel.amenities?.join(', ') || '',
      nearbyAttractions: hotel.nearbyAttractions?.join(', ') || '',
      roomTypes: hotel.roomTypes && hotel.roomTypes.length > 0 
        ? hotel.roomTypes 
        : [{ type: '', price: '', available: '' }],
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      let res;
      if (editingHotel) {
        res = await updateHotel(editingHotel._id, hotelData, token);
      } else {
        res = await createHotel(hotelData, token);
      }

      if (res.success) {
        setFormSuccess(editingHotel ? 'Hotel updated successfully!' : 'Hotel added successfully!');
        setShowForm(false);
        setEditingHotel(null);
        setFormData({
          name: '', city: 'Prayagraj', address: '', description: '', images: '',
          pricePerNight: '', contactPhone: '', mapLink: '', propertyType: 'hotel',
          amenities: '', nearbyAttractions: '', roomTypes: [{ type: '', price: '', available: '' }],
        });
        loadHotels();
      } else {
        setFormError(res.error || 'Failed to save hotel');
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
    <div className="bg-grid" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--color-secondary)' }}>Manage Properties</h2>
            <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Create and update your listings</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/admin/dashboard" style={{ padding: '0.6rem 1.25rem', border: '1.5px solid var(--color-border)', borderRadius: '0.75rem', textDecoration: 'none', color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>
              ← Dashboard
            </Link>
            <button
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                  setEditingHotel(null);
                  setFormData({
                    name: '', city: 'Prayagraj', address: '', description: '', images: '',
                    pricePerNight: '', contactPhone: '', mapLink: '', propertyType: 'hotel',
                    amenities: '', nearbyAttractions: '', roomTypes: [{ type: '', price: '', available: '' }],
                  });
                } else {
                  setShowForm(true);
                }
              }}
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              {showForm ? '✕ Cancel' : '+ Add Hotel'}
            </button>
          </div>
        </div>

        {formSuccess && (
          <div style={{ padding: '0.75rem 1rem', borderRadius: '0.75rem', background: '#DCFCE7', color: '#16A34A', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            ✅ {formSuccess}
          </div>
        )}

        {showForm && (
          <div className="glass shadow-large animate-slide-down" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'white', border: '2px solid var(--color-primary)', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--color-secondary)' }}>
              {editingHotel ? `Edit Property: ${editingHotel.name}` : 'Register New Property'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Property Name</label>
                  <input type="text" className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>City</label>
                  <select className="input-field" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                    <option>Prayagraj</option>
                    <option>Varanasi</option>
                    <option>Ayodhya</option>
                    <option>Lucknow</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Description</label>
                <textarea className="input-field" rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Base Price (₹)</label>
                  <input type="number" className="input-field" value={formData.pricePerNight} onChange={e => setFormData({ ...formData, pricePerNight: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Contact Phone</label>
                  <input type="tel" className="input-field" value={formData.contactPhone} onChange={e => setFormData({ ...formData, contactPhone: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Property Type</label>
                  <select className="input-field" value={formData.propertyType} onChange={e => setFormData({ ...formData, propertyType: e.target.value })}>
                    <option value="hotel">Hotel</option>
                    <option value="dharamshala">Dharamshala</option>
                    <option value="guest_house">Guest House</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '1.25rem', fontSize: '1.1rem', borderRadius: '1rem' }}>
                {editingHotel ? 'Update Listing' : 'Publish Listing'}
              </button>
            </form>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '1.5rem', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', background: '#F8FAFC', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Listed Properties ({hotels.length})</h3>
          </div>
          <div style={{ display: 'grid', gap: '1px', background: 'var(--color-border)' }}>
            {hotels.map(hotel => (
              <div key={hotel._id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'white' }}>
                <img src={hotel.images?.[0] || 'https://via.placeholder.com/150'} style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '0.75rem' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{hotel.name}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{hotel.city} • ₹{hotel.pricePerNight}/night</div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => handleEdit(hotel)} className="btn-outline">Edit</button>
                  <button onClick={() => handleDelete(hotel._id, hotel.name)} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
