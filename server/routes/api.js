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
  db.getReviews((response) => {
    res.send(response);
  });
});

// CREATE A REVIEW
router.post('/reviews/add', (req, res, next) => {
  res.set(defaultCorsHeaders);
  db.createReview(req.body, (response) => {
    res.send(response);
  });
});

// UPDATE A REVIEW
router.put('/reviews/update', (req, res) => {
  res.set(defaultCorsHeaders);
  console.log('router.update called', req.body);
  db.updateReview(req.body, (response) => {
    res.send(response);
  });
});

// DELETE A REVIEW
router.delete('/reviews/delete', (req, res) => {
  res.set(defaultCorsHeaders);
  console.log('router.delete called');
  db.deleteReview(req.body, (response) => {
    res.send(response);
  })
})

module.exports = router;

