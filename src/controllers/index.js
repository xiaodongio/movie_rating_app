const moviesController = require('./movies');

module.exports.api = (app) => {
  app.use(moviesController);
};
