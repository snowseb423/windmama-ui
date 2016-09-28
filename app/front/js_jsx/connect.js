import io from 'socket.io-client';
import { store, clientUrl } from './index.jsx';

const socket = io.connect('http://localhost:8080/');
var update;
var object = {
  detail: new Object(),
  location: new Object()
};

function registerData(chanel, callback) {
  socket.on(chanel, (data) => { callback(data); });
}
registerData('sendAllData', (data) => {
  let dataSplit = data[0].split(' ');
  object.detail[dataSplit[0]] = data;
});
registerData('sendAllLocation', (data) => {
  var locationObject = new Object();
  data.forEach((element) => {
    let elementSplited = element.split(' ');
    locationObject[elementSplited[0]] = element.split(' ');
  });
  object.location = locationObject;
});
registerData('sendPubsubData', (data) => {
  update = data;
  store.dispatch({type: 'UPDATE_OBJECT'});
});

export { object, update };
