const express = require('express');
const Hotel = require('../models/Hotel');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/hotels - List all active hotels (public)
router.get('/', async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, amenities, sort } = req.query;
    const filter = { isActive: true };

    if (city) filter.city = new RegExp(city, 'i');
    if (type) filter.propertyType = type;
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    if (amenities) {
      const amenityList = amenities.split(',');
      filter.amenities = { $all: amenityList };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { pricePerNight: 1 };
    if (sort === 'price_desc') sortOption = { pricePerNight: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const hotels = await Hotel.find(filter).sort(sortOption);
    res.json({ success: true, count: hotels.length, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/hotels/:id - Get single hotel (public)
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, error: 'Hotel not found' });
    res.json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/hotels - Create hotel (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ success: true, data: hotel });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT /api/hotels/:id - Update hotel (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hotel) return res.status(404).json({ success: false, error: 'Hotel not found' });
    res.json({ success: true, data: hotel });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE /api/hotels/:id - Delete hotel (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, error: 'Hotel not found' });
    res.json({ success: true, message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
