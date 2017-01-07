import io from 'socket.io-client';
import { Actions } from './actions.js';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

var initialState = {
  detail: {},
  place: {},
  allId: [],
  rightActive: false,
  leftActive: false,
  detailActive: false,
  idUpdate: false,
  location: false
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
  Actions.updateDetail(update);
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    initialState.location = [
      position.coords.latitude,
      position.coords.longitude
    ];
  });
} else
  initialState.location = false;

export default initialState;
