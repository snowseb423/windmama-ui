import io from 'socket.io-client';
import { updateObject } from './actions.js';
import store from './store.js';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

var initialState = {
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
  initialState.detail[Number(id)] = data;
});
registerData('sendAllLocation', (data) => {
  initialState.place = data;
  initialState.allId = Object.keys(data);
});

var update;
registerData('sendPubsubData', (data) => {
  update = data;
  store.dispatch(updateObject(update));
});

export default initialState;
