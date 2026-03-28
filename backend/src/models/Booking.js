const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  hotelName: { type: String, required: true },
  guestName: { type: String, required: true, trim: true },
  guestPhone: { type: String, required: true },
  guestEmail: { type: String, default: '' },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true, default: 1 },
  roomType: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paymentMode: {
    type: String,
    enum: ['pay_at_hotel', 'upi_advance'],
    default: 'pay_at_hotel'
  },
  paymentReference: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  specialRequests: { type: String, default: '' }
}, { timestamps: true });

bookingSchema.index({ hotelId: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
