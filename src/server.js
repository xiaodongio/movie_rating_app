const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJwt = require('passport-jwt');

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const jwtOptions = {};
jwtOptions.jwtFormRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'movieratingapplicationsecretkey';
// passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
//   done();
// }));

const api = require('./controllers');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// connect mongodb
mongoose.connect('mongodb://localhost/movie_rating_app', { useNewUrlParser: true }, () => {
  // eslint-disable-next-line no-console
  console.log('Connect to mongodb success');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log('connect to mongodb error', err.stack);
  process.exit(1);
});

api.api(app);
router.get('/', (req, res) => {
  res.json({ message: 'API Initialized' });
});

const port = process.env.API_PORT || 8081;

app.use(router);
app.listen(port, () => {
  console.log(`api server running on port ${port}`);
});

