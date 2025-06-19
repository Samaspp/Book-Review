const Review = require('../models/Review');
const { success, error } = require('../utils/response');

/**
 * @desc   Get reviews for a specific book
 * @route  GET /api/reviews?bookId=xxx
 */
exports.getReviews = async (req, res) => {
  try {
    const { bookId, userId } = req.query;

    const query = {};
    if (bookId) query.bookId = bookId;
    if (userId) query.user = userId; // assumes review.user stores userId

    const reviews = await Review.find(query).sort({ createdAt: -1 });

    success(res, reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    error(res, 'Failed to fetch reviews');
  }
};

/**
 * @desc   Submit a new review
 * @route  POST /api/reviews
 */
exports.createReview = async (req, res) => {
  try {
    const { bookId, user, rating, comment } = req.body;

    if (!bookId || !user || typeof rating !== 'number'  ) {
      return error(res, 'All fields are required: bookId, user, rating', 400);
    }

    if (rating < 1 || rating > 5) {
      return error(res, 'Rating must be between 1 and 5', 400);
    }

    const review = new Review({ bookId, user, rating, comment : comment || '' });
    const saved = await review.save();
    success(res, saved, 201);
  } catch (err) {
    error(res, 'Failed to create review');
  }
};
