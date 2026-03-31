const express = require('express');
const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const authMiddleware = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// GET /api/hotels/:hotelId/reviews - Get reviews for a hotel
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ hotel: req.params.hotelId }).populate({
      path: 'user',
      select: 'name phone'
    });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/hotels/:hotelId/reviews - Add a review
router.post('/', authMiddleware, async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ success: false, error: 'Hotel not found' });
    }

    // Assign user and hotel to the body
    req.body.user = req.user.id;
    req.body.hotel = hotelId;

    // Check if user has already reviewed the hotel
    const prevReview = await Review.findOne({ hotel: hotelId, user: req.user.id });
    if (prevReview) {
      return res.status(400).json({ success: false, error: 'You have already reviewed this hotel' });
    }

    const review = await Review.create(req.body);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'You have already reviewed this hotel' });
    }
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
