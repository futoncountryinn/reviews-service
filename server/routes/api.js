const express = require('express');
const router = express.Router();
const db = require('../../database/helpers');


const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'content-type': 'application/json'
};


// GET ALL REVIEWS
router.get('/reviews', (req, res, next) => {
  res.set(defaultCorsHeaders);
  console.log('router.get called');
  db.getReviews((err, response) => {
    if (err) console.log('error: ', err);
    res.send(response)
  });
});

// CREATE A REVIEW
router.post('/reviews/add', (req, res, next) => {
  res.set(defaultCorsHeaders);
  console.log('router.post called', req.body);
  db.createReview(req.body, (err, response) => {
    if (err) console.log('error: ', err);
    res.send(response);
  });
});

// UPDATE A REVIEW
router.put('/reviews/update', (req, res) => {
  res.set(defaultCorsHeaders);
  console.log('router.update called', req.body);
  db.updateReview(req.body, (err, response) => {
    if (err) console.log('error :', err);
    res.send(response);
  });
});

// DELETE A REVIEW
router.delete('/reviews/delete', (req, res) => {
  res.set(defaultCorsHeaders);
  console.log('router.delete called');
  db.deleteReview(req.body, (err, response) => {
    if (err) console.log('error: ', err);
    res.send(response);
  })
})

module.exports = router;

