var express = require('express'),
    socketio = require('socket.io'),
    redis = require('redis'),
    client = redis.createClient(),
    subscriber = redis.createClient(),
    app = express(),
    server = app.listen(8080),
    io = socketio.listen(server);

app.use(express.static('../public'));

io.on('connection', function(socket) {
  client.keys('*', function(err, keys) {
    for(var y = 0; y < keys.length; y++) {
      client.lrange(keys[y], 0, -1, (err, singleData) => {
        if (!err) { socket.emit('sendAllData', singleData); }
      });
    }
  });
  client.hgetall('location', (err, allLocation) => {
    socket.emit('sendAllLocation', allLocation);
  });
  subscriber.subscribe('pubsub');
  subscriber.on('message', function(channel, message){
    socket.emit('sendPubsubData', message.toString());
  });
});
