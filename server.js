const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(9000);

const socketio = require("socket.io");

const io = socketio(server);

module.exports = {
  app,
  io,
};
