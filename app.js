var express = require('express'),
    socketio = require('socket.io'),
    redis = require('redis'),
    client = redis.createClient(),
    subscriber = redis.createClient(),
    app = express(),
    server = app.listen(8080),
    io = socketio.listen(server);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('./public'));

io.on('connection', socket => {
  subscriber.subscribe('pubsub');
  subscriber.on('message', (channel, message) => {
    socket.emit('sendPubsubData', message.toString());
  });
});

app.post('/location',function(req, res) {
  client.hgetall('location', (err, allLocation) => {
    res.end(JSON.stringify(allLocation));
  });
});

app.post('/detail',function(req, res) {
  var i = 0;
  client.keys('*', (err, keys) => {
    var detail = {};
    keys.forEach( (element) => {
      client.lrange(element, 0, -1, (err, singleData) => {
        detail[element] = singleData; i++;
        i === keys.length ? res.end(JSON.stringify(detail)) : '';
      });
    });
  });
});
