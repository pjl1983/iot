const express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  cors = require('cors'),
  indexRouter = require('./routes/main'),
  logger = require('morgan'),
  path = require('path'),
  port = process.env.PORT || 3000,
  cookieParser = require('cookie-parser');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

let sequenceNumberByClient = new Map(),
  status = false;

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
  console.log("Server listening on port:", port);
});
