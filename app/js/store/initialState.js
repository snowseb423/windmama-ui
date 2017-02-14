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
  hoverId: false,
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

$.post(location + 'detail', false, (detail) => {
  initialState.detail = JSON.parse(detail);
  Actions.sendData();
});

$.post(location + 'place', false, (place) => {
  initialState.place = JSON.parse(place);
  initialState.allId = Object.keys(initialState.place);
  Actions.sendData();
});

socket.on('sendPubsubData', (data) => {
  Actions.updateDetail(data);
});

export default initialState;
