'use strict';

const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = new Express();
const port = 3000;

app.use(Express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(routes);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.json({
    error: { message: err.message }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
