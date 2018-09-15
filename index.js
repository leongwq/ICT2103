// Bring in our dependencies
const app = require('express')();
const routes = require('./routes/v1');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

// Set up passport local strategy 
require('./config/passport');

app.use(cors());
app.use(passport.initialize());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect all our routes to our application
app.use('/', routes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Turn on that server!
app.listen(3200, () => {
    console.log('Kleis listening on port 3200');
  });