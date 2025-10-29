const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
  },
  name: {
      type: String,
      required: true
  },
  rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
  },
  comment: {
      type: String,
      required: true
  },
  images: [{
      type: String
  }],
  date: {
      type: Date,
      default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review; 