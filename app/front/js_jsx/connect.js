import io from 'socket.io-client';
import store from './index.jsx';
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
  let dataSplit = data[0].split(' ');
  var id = dataSplit[0];
  object.detail[Number(id)] = data;
});

registerData('sendAllLocation', (data) => {
  data.forEach((element) => {
    let elementSplited = element.split(' ');
    var id = elementSplited[0];
    object.allId.push(elementSplited[0]);
    object.place[Number(id)] = [
      elementSplited[0],
      elementSplited[1],
      elementSplited[2]
    ];
  });
});

registerData('sendPubsubData', (data) => {
  update = data;
  store.dispatch({type: 'UPDATE_OBJECT'});
});

export { object, update };
