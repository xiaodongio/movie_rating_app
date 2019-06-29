const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
  movie_id: mongoose.ObjectId,
  user_id: mongoose.ObjectId,
  rate: Number,
});

const Rating = mongoose.model('rating', RatingSchema);

module.exports = Rating;
