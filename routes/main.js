const express = require('express');
const app = express();
const router = express.Router();
let status = false;
const port = 8080;

const http = require('http').Server(app);
const io = require('socket.io')(http);
let sequenceNumberByClient = new Map();

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

http.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Socket.io listening on port:", port);
});

router.get('/status', function (req, res) {
  res.json({status});
});

module.exports = router;
