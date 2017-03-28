import io from 'socket.io-client';
import { Actions } from './actions.js';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

var initialState = {
    detail: {},
    place: {},
    allId: [],
    mobile: false,
    displayDetail: false,
    hoverId: false,
    idUpdate: false,
    mapPosition: [3.5, 46.7],
    mapZoom: [5.2],
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

function registerData(chanel, callback) {
  socket.on(chanel, (data) => { callback(data); });
}
registerData('sendAllData', (data) => {
  if (data !== 'end') {
    let dataSplit = data[0].split('|');
    var id = dataSplit[0];
    initialState.detail[Number(id)] = data;
  } else if (data === 'end') {
    socket.close();
  }
});
registerData('sendAllLocation', (data) => {
  initialState.place = data;
  initialState.allId = Object.keys(data);
  setTimeout( () => { Actions.sendData(); }, 3000 );
});
var update;
registerData('sendPubsubData', (data) => {
  update = data;
  Actions.updateDetail(update);
});

export default initialState;
