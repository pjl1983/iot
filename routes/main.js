const express = require('express');
const router = express.Router();

let status = false;

router.post('/set', function (req, res) {
  status = (req.body.status === 'True' || req.body.status === true);
  res.json({status});
});

router.get('/get', function (req, res) {
  res.json({status});
});

module.exports = router;
