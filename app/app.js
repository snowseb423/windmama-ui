var express = require('express'),
    socketio = require('socket.io'),
    redis = require('redis'),
    async = require('async'),
    client = redis.createClient(),
    subscriber = redis.createClient(),
    app = express(),
    server = app.listen(8080),
    io = socketio.listen(server);

app.use(express.static('../public'));

io.on('connection', function(socket) {
  subscriber.subscribe('pubsub');
  subscriber.on('message', function(channel, message){
    socket.emit('sendPubsubData', message.toString());
  });
});

app.post('/detail', function(req, res) {
  client.keys('*', function(err, keys) {
    var detail = {};
    keys.forEach( function(element) {
      client.lrange(element, 0, -1, (err, singleData) => {
        detail[element] = singleData;
      });
    });
    res.end(JSON.stringify(detail));
  });
});

app.post('/place', function(req, res){
  client.hgetall('location', (err, place) => {
    res.end(JSON.stringify(place));
  });
});

// client.keys('*', function(err, keys) {
//   for(var y = 0; y < keys.length; y++) {
//     client.lrange(keys[y], 0, -1, (err, singleData) => {
//       if (!err) { socket.emit('sendAllData', singleData); }
//     });
//   }
// });
