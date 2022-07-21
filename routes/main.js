const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server, {
    cors: {
      origin: ["http://localhost:3000", "https://lila-affe-spuelmaschine.herokuapp.com"],
    },
  }),
  router = express.Router(),
  port = 8080;

let status = false,
  sequenceNumberByClient = new Map();

io.on("connection", (socket) => {
  console.log('A client connected');
  sequenceNumberByClient.set(socket, 1);
  io.sockets.emit("status", status);

  socket.on("status", (status) => {
    this.status = status;
    io.sockets.emit("status", this.status);
  });

  socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Socket.io listening on port:", port);
});

router.get('/status', function (req, res) {
  res.json({status});
});

module.exports = router;
