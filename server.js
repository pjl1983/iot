const express = require('express'),
 app = express(),
 port = process.env.PORT || 3000,
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 indexRouter = require('./routes/main'),
 cors = require('cors');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server listening on port:", port);
});
