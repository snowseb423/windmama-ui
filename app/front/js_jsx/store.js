import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

//////////////////////connect////////////////////////////

const socket = io.connect('http://192.168.1.35:8080/');
var object = new Object();
var update;

function registerData(chanel, callback) {
  socket.on(chanel, (data) => { callback(data); });
}
registerData('sendAllData', (data) => {
  let dataSplit = data[0].split(' ');
  object[dataSplit[0]] = data;
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

//////////////////////store/////////////////////////

function detail(state = object, action) {
  switch(action.type) {
    case 'UPDATE_OBJECT':
      var updateSplit = update.split(' ');
      if (state[updateSplit[0]]) {
        state[updateSplit[0]].unshift(update);
      } else {
        state[updateSplit[0]] = [update];
      }
      return state;
    default:
      return state;
  }
}

const store = createStore(detail, object, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
