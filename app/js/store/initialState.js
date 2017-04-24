import io from 'socket.io-client';
import { Actions } from './actions.js';
import _ from 'lodash';
import $ from 'jquery';

const socket = io.connect('http://'+ window.location.hostname +':8080/');
const location = 'http://'+ window.location.hostname + ':8080';

var initialState = {
    detail: {},
    place: {},
    allId: [],
    mobile: false,
    displayDetail: false,
    hoverId: false,
    idUpdate: false,
    pinchLevel: 1,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
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

const registerData = (chanel, callback) => {
  socket.on(chanel, (data) => { callback(data); });
};
registerData('sendPubsubData', (data) => {
  Actions.updateDetail(data.split('|'));
});


var temp = {
  locationsId: [],
  DetailId: []
};
$.ajax({
  url: location + '/location',
  type: 'POST',
  async: true,
  success: a => {
    a = JSON.parse(a);
    temp.locationsId = Object.keys(a);
    temp.locationsId.forEach(e => {
      initialState.place[e] = a[e].split('|');
    });
  }
});
$.ajax({
  url: location + '/detail',
  type: 'POST',
  async: true,
  success: b => {
    b = JSON.parse(b);
    temp.DetailId = Object.keys(b);
    temp.DetailId.forEach(f => {
      initialState.detail[f] = [];
      b[f].forEach(g => {
        initialState.detail[f].push(g.split('|'));
      });
    });
    initialState.allId = _.intersection(temp.DetailId, temp.locationsId);
    Actions.sendData();
  }
});


export default initialState;
