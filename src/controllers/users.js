const express = require('express');

const router = express.Router();
const User = require('../models/User');

const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';


router.post('/users/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save((err, user) => {
    if (err) {
      throw err;
    }
    res.send({
      user,
    });
  });
});

router.post('/users/login', (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
      if (!user) {
        res.status(404).json({ message: 'The user does not exist!' });
      } else {
        User.comparePassword(password, user.password, (error, isMatch) => {
          if (error) throw error;
          if (isMatch) {
            const payload = { id: user.id };
            const token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ message: 'ok', token });
          } else {
            res.status(401).json({ message: 'The password is incorrect!' });
          }
        });
      }
    });
  }
});

module.exports = router;

