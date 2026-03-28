const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Number, required: true, default: 1 }
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  pricePerNight: { type: Number, required: true },
  roomTypes: [roomTypeSchema],
  amenities: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  contactPhone: { type: String, required: true },
  mapLink: { type: String, default: '' },
  nearbyAttractions: [{ type: String }],
  policies: {
    checkIn: { type: String, default: '12:00 PM' },
    checkOut: { type: String, default: '11:00 AM' },
    cancellation: { type: String, default: 'Free cancellation up to 24 hours before check-in' },
    idRequired: { type: Boolean, default: true }
  },
  propertyType: {
    type: String,
    enum: ['hotel', 'dharamshala', 'guest_house', 'lodge'],
    default: 'hotel'
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

hotelSchema.index({ city: 1, isActive: 1 });
hotelSchema.index({ pricePerNight: 1 });

module.exports = mongoose.model('Hotel', hotelSchema);
