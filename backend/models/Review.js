const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: String, required: true }, // later we'll link actual user
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: false, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
