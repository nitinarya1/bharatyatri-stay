const express = require('express');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/bookings - Create a new booking (public)
router.post('/', async (req, res) => {
  try {
    const { hotelId, userId, roomType, checkIn, checkOut, guests, guestName, guestPhone, guestEmail, paymentMode, specialRequests } = req.body;

    // Validate hotel exists
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ success: false, error: 'Hotel not found' });

    // Find room type and calculate price
    const room = hotel.roomTypes.find(r => r.type === roomType);
    if (!room) return res.status(400).json({ success: false, error: 'Invalid room type' });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) return res.status(400).json({ success: false, error: 'Check-out must be after check-in' });

    const totalPrice = room.price * nights;

    const booking = await Booking.create({
      hotelId,
      userId: userId || null,
      hotelName: hotel.name,
      guestName,
      guestPhone,
      guestEmail: guestEmail || '',
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      roomType,
      totalPrice,
      paymentMode: paymentMode || 'pay_at_hotel',
      specialRequests: specialRequests || '',
      status: 'confirmed'
    });

    res.status(201).json({
      success: true,
      data: {
        bookingId: booking._id,
        hotelName: hotel.name,
        hotelPhone: hotel.contactPhone,
        hotelAddress: hotel.address,
        guestName: booking.guestName,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        roomType: booking.roomType,
        totalPrice: booking.totalPrice,
        paymentMode: booking.paymentMode,
        status: booking.status
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET /api/bookings - List all bookings (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, hotelId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (hotelId) filter.hotelId = hotelId;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/bookings/:id - Update booking status (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
