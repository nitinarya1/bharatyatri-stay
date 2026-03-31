const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating between 1 and 5'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
    maxlength: 500
  }
}, { timestamps: true });

// Prevent user from submitting more than one review per hotel
reviewSchema.index({ hotel: 1, user: 1 }, { unique: true });

// Static method to get auth rating and save
reviewSchema.statics.getAverageRating = async function(hotelId) {
  const obj = await this.aggregate([
    { $match: { hotel: hotelId } },
    { $group: { _id: '$hotel', averageRating: { $avg: '$rating' }, numReviews: { $sum: 1 } } }
  ]);

  try {
    await this.model('Hotel').findByIdAndUpdate(hotelId, {
      rating: obj[0]?.averageRating.toFixed(1) || 0,
      numReviews: obj[0]?.numReviews || 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after saving a review
reviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.hotel);
});

// Call getAverageRating before remove
reviewSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.hotel);
});

module.exports = mongoose.model('Review', reviewSchema);
