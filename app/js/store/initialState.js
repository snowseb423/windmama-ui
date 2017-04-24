import io from 'socket.io-client';
import { Actions } from './actions.js';
import _ from 'lodash';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

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
var temp = {
  allIdLocation: [],
  allIdDetail: []
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
  if (data !== 'end') {
    let id = Number(data[0].split('|')[0]);
    temp.allIdDetail.push(id.toString());
    initialState.detail[id] = new Array;
    data.forEach((e) => {
      var a = e.split('|');
      initialState.detail[id].push(a);
    });
    initialState.allId = _.intersection(temp.allIdDetail, temp.allIdLocation);
    Actions.sendData();
  } else if (data === 'end') {
    socket.close();
  }
});

registerData('sendAllLocation', (data) => {
  temp.allIdLocation = Object.keys(data);
  temp.allIdLocation.forEach((e)=>{
    initialState.place[e] = data[e].split('|');
  });
  Actions.sendData();
});

registerData('sendPubsubData', (data) => {
  Actions.updateDetail(data.split('|'));
});

export default initialState;
