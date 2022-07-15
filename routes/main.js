const express = require('express');
const router = express.Router();
const server = require('http').createServer(express);
const io = require('socket.io')(server);

let status = false;

router.post('/set', function (req, res) {
  status = (req.body.status === 'True' || req.body.status === true);
  io.emit('status', status);
  res.json({status});
});

router.get('/get', function (req, res) {
  res.json({status});
});

io.on('connection', (socket) => {
  console.log('Established a connection!');
  socket.broadcast.emit('status', status);
  socket.on('disconnect', () => {
    console.log('Connection ended!');
  });
});

module.exports = router;
