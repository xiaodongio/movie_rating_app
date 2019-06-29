const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  name: String,
  description: String,
  release_year: Number,
  genre: String,
});

const Movie = mongoose.model('movie', MovieSchema);
module.exports = Movie;
