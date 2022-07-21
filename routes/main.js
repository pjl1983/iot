const express = require('express');
const router = express.Router();

router.status = false;

router.get('/get', function (req, res) {
  res.json({status});
});

module.exports = router;
