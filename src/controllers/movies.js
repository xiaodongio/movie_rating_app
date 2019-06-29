const express = require('express');

const router = express.Router();
const Movie = require('../models/Movie');
const Rating = require('../models/Rating');

router.get('/movies', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      throw err;
    }
    res.send({
      movies,
    });
  });
});
router.get('/movies/:id', (req, res) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) {
      throw err;
    }
    res.send({
      movie,
    });
  });
});
router.post('/movies', (req, res) => {
  const newMovie = new Movie({
    name: req.body.name,
    description: req.body.description,
    release_year: req.body.release_year,
    genre: req.body.genre,
  });
  newMovie.save((err, movie) => {
    if (err) {
      throw err;
    }
    res.send(movie);
  });
});

router.post('/movies/rate/:id', (req, res) => {
  const rating = new Rating({
    movie_id: req.params.id,
    user_id: req.body.user_id,
    rate: req.body.rate,
  });
  rating.save((err, result) => {
    if (err) {
      throw err;
    }
    res.send({
      result,
    });
  });
});

module.exports = router;
