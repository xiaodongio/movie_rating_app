const moviesController = require('./movies');
const usersController = require('./users');

module.exports.api = (app) => {
  app.use(moviesController);
  app.use(usersController);
};
