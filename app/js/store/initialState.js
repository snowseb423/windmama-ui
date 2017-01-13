import io from 'socket.io-client';
import { Actions } from './actions.js';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

var initialState = {
  detail: {},
  place: {},
  allId: [],
  mobile: false,
  rightActive: false,
  leftActive: false,
  displayDetail: false,
  idUpdate: false
};

(()=>{
  if(navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i) )
    initialState.mobile = true;
  else
    initialState.mobile = false;
})();

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

export default initialState;
