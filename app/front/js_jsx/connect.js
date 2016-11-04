import io from 'socket.io-client';
// import store from './index.jsx';
const socket = io.connect('http://'+ window.location.hostname +':8080/');

var update;
// var object = {
//   detail: {},
//   place: {},
//   allId: []
// };

function registerData(chanel, callback) {
  socket.on(chanel, (data) => { callback(data); });
}

// registerData('sendAllData', (data) => {
//   let dataSplit = data[0].split(' ');
//   var id = dataSplit[0];
//   object.detail[Number(id)] = data;
// });
//
// registerData('sendAllLocation', (data) => {
//   data.forEach((element) => {
//     let elementSplited = element.split(' ');
//     var id = elementSplited[0];
//     object.allId.push(elementSplited[0]);
//     object.place[Number(id)] = [
//       elementSplited[0],
//       elementSplited[1],
//       elementSplited[2]
//     ];
//   });
// });

registerData('sendPubsubData', (data) => {
  update = data;
  // store.dispatch({type: 'UPDATE_OBJECT'});
});

/////////////fakeStore//////////////////////////////////////////////////////////////////
const object = {
 detail: {
   3: ['3 06h23 13 15 17 123', '3 06h19 3 5 7 123', '3 06h15 3 5 7 123'],
   7: ['7 06h23 39 48 52 234', '7 06h19 3 5 7 234', '7 06h15 3 5 7 234'],
   9: ['9 06h23 13 25 37 356', '9 06h19 3 5 7 356', '9 06h15 3 5 7 356'],
   11: ['11 06h23 0 3 8 90', '11 06h19 3 5 7 90', '11 06h15 3 5 7 90'],
   23: ['23 06h23 73 85 97 3', '23 06h19 3 5 7 3', '23 06h15 3 5 7 3']
 },
 place: {
   3: ['3', '45.5919.75', '2.845067', 'Le Lion-d\'Angers', '2 La Jarillais, 49220 Le Lion-d\'Angers, France'],
   7: ['7', '45.5919.75', '2.845067', 'Lattes', '3 rue des Figuelles, 34970 Lattes, France'],
   9: ['9', '45.5919.75', '2.845067', 'Maurin', '8 rue Lopez, 34930 Maurin, France'],
   11: ['11', '45.5919.75', '2.845067', 'Candillargue', '12 rue Mireille, 34130 Candillargue, France'],
   23: ['23', '45.5919.75', '2.845067', 'La Grande Motte', '1025 Couchant 2, 34980 La Grande Motte, France']
 },
 allId: [3, 7, 9, 11, 23]
};
////////////////////////////////////////////////////////////////////////////////////////

export { object, update };
