
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usernames=[];

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user has connected');

  socket.on('disconnect', function(){
    io.emit('chat message',usernames[socket.id]+' has disconnected');
    console.log('a user has disconnected.');

  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('is typing', function(msg){
    io.emit('is typing',usernames[socket.id] + msg);
  });
  socket.on('add user', function(msg){
  	usernames[socket.id]=msg;
    io.emit('chat message', usernames[socket.id]+' has connected.');
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});