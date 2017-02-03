import io from 'socket.io-client';
import $ from 'jquery';
import { Actions } from './actions.js';

const socket = io.connect('http://'+ window.location.hostname +':8080/');

var initialState = {
  detail: {},
  place: {},
  allId: [],
  mobile: false,
  displayDetail: false,
  idUpdate: false,
  location: false
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

// registerData('sendAllData', (data) => {
//   let dataSplit = data[0].split('|');
//   var id = dataSplit[0];
//   initialState.detail[Number(id)] = data;
//   // Actions.sendData();
// });

$.post(location + 'detail', false, (detail) => {
  initialState.detail = JSON.parse(detail);
  console.log(initialState.detail);
});
$.post(location + 'place', false, (place) => {
  initialState.place = JSON.parse(place);
});


function registerData(chanel, callback) {
  socket.on(chanel, (data) => { callback(data); });
}
var update;
registerData('sendPubsubData', (data) => {
  update = data;
  Actions.updateDetail(update);
});


export default initialState;
