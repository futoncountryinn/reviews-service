const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api.js');
const path = require('path');
const cors = require('cors');

// create express server
const app = express();

// initialize middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(function (err, req, res, next) {
//   res.status(422).send({ error: err.message })
// });

//initialize routes mw
app.use(routes);
app.use('/:id', express.static('public'));

// listen
app.listen(process.env.port || 3003, () => {
  console.log('listening for requests on port 3003');
});
