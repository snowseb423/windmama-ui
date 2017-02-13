var express = require('express'),
    socketio = require('socket.io'),
    redis = require('redis'),
    client = redis.createClient(),
    subscriber = redis.createClient(),
    app = express(),
    server = app.listen(8080),
    io = socketio.listen(server);

app.use(express.static('../public'));

var detail = {};
client.keys('*', function(err, keys) {
  keys.forEach( function(element) {
    client.lrange(element, 0, -1, (err, singleData) => {
      detail[element] = singleData;
    });
  });
});

app.post('/detail', function(req, res) {
  res.end(JSON.stringify(detail));
});

app.post('/place', function(req, res){
  client.hgetall('location', (err, place) => {
    res.end(JSON.stringify(place));
  });
});

io.on('connection', function(socket) {
  subscriber.subscribe('pubsub');
  subscriber.on('message', function(channel, message){
    socket.emit('sendPubsubData', message.toString());
  });
});
