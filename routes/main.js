const express = require('express');
const router = express.Router();

let status = 'connected';

router.get('/get', function (req, res) {
  res.json({status});
});

module.exports = router;
