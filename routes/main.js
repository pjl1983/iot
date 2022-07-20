const express = require('express');
const router = express.Router();
let status = false;

// Socket.io
const server = require('socket.io').Server;
const io = new server();

let sequenceNumberByClient = new Map();

io.on("connection", (socket) => {
  console.log('Server socket.io connection established');
  sequenceNumberByClient.set(socket, 1);

  socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
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
