import { Dispatcher } from 'flux';
import { typeOfActions } from './actions.js';
import store from './store.js';

var AppDispatcher = new Dispatcher();

AppDispatcher.register((action) => {

  switch (action.actionType) {

    case typeOfActions.SEND_DATA:
      store.emit(typeOfActions.SEND_DATA);
      break;

    case typeOfActions.LEFT_ACTIVATION:
      store.leftActive = !store.leftActive;
      store.rightActive = false;
      store.emit(typeOfActions.LEFT_ACTIVATION);
      break;

    case typeOfActions.RIGHT_ACTIVATION:
      store.rightActive = !store.rightActive;
      store.leftActive = false;
      store.emit(typeOfActions.RIGHT_ACTIVATION);
      break;

    case typeOfActions.DISPLAY_DETAIL:
      store.displayDetail = action.id;
      store.emit(typeOfActions.DISPLAY_DETAIL);
      break;

    case typeOfActions.HOVER_ID:
      store.hoverId = action.id;
      store.emit(typeOfActions.HOVER_ID);
      break;

    case typeOfActions.CHANGE_VIEWPORT:
      store.viewportWidth = action.size[0];
      store.viewportHeight = action.size[1];
      store.emit(typeOfActions.CHANGE_VIEWPORT);
      break;

    case typeOfActions.PINCH_LEVEL:
      store.pinchLevel = action.lvl;
      store.emit(typeOfActions.PINCH_LEVEL);
      break;

    case typeOfActions.UPDATE_DETAIL:
      var id = action.update[0];
      if (store.detail[id] && store.place[id]) {
        store.detail[id].unshift(action.update);
        store.idUpdate = id;
        store.emit(typeOfActions.UPDATE_DETAIL);
      }
      break;

    default:
      break;
  }
});

export default AppDispatcher;
