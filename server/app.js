var express = require('express')
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(3000);

app.use('/static', express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.get('/rooms', function(req, res) {
  var roomList = Object.keys(rooms).map(function(key) {
    return rooms[key]
  })
  res.send(roomList)
});

var rooms = {}

io.on('connection', function(socket) {

  socket.on('create_room', function(room) {
    if (!room.key) {
      return
    }
    console.log('create room:', room)
    var roomKey = room.key
    rooms[roomKey] = room
    socket.roomKey = roomKey
    socket.join(roomKey);

    io.sockets.emit('room-created', room);
  });

  socket.on('close_room', function(roomKey) {
    console.log('close room:', roomKey);

    delete rooms[roomKey];
    io.sockets.emit('room-closed', { room: roomKey });
  });

  socket.on('disconnect', function() {
    console.log('disconnect:', socket.roomKey);
    if (socket.roomKey) {
      delete rooms[socket.roomKey];
      io.sockets.emit('room-closed', { room: socket.roomKey });
    }
  });

  socket.on('join_room', function(roomKey) {
    console.log('join room:', roomKey);
    socket.join(roomKey)
  });

  socket.on('comment', function(data) {
    console.log('comment:', data)
    io.to(data.roomKey).emit('comment', data)
  });
});

console.log('listening on port 3000...')