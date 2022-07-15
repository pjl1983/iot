const express = require('express');
const router = express.Router();
let status = false;

// Socket.io
const server = require('socket.io').Server;
const io = new server();

io.on("connection", () => {
  console.log('Server socket.io connection established')
});

io.listen(3001);

router.post('/set', function (req, res) {
  status = (req.body.status === 'True' || req.body.status === true);
  io.sockets.emit("status", status);
  res.json({status});
});

router.get('/get', function (req, res) {
  res.json({status});
});

module.exports = router;
