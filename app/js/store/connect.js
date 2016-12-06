import io from 'socket.io-client';
import store from './store.js';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

var update;
var object = {
  detail: {},
  place: {},
  allId: []
};

function registerData(chanel, callback) {
  socket.on(chanel, (data) => { callback(data); });
}
registerData('sendAllData', (data) => {
  let dataSplit = data[0].split('|');
  var id = dataSplit[0];
  object.detail[Number(id)] = data;
});
registerData('sendAllLocation', (data) => {
  object.place = data;
  object.allId = Object.keys(data);
});
registerData('sendPubsubData', (data) => {
  update = data;
  store.dispatch({type: 'UPDATE_OBJECT'});
});

export { object, update };
