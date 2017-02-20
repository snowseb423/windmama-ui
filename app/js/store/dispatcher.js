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

    case typeOfActions.SHIFTING_MAP:
      store.mapPosition = action.coord;
      store.emit(typeOfActions.SHIFTING_MAP);
      break;

    case typeOfActions.UPDATE_DETAIL:
      var updateSplit = action.update.split('|');
      store.idUpdate = action.idUpdate;
      if (store.detail[updateSplit[0]])
        store.detail[updateSplit[0]].unshift(action.update);
      else
        store.detail[updateSplit[0]] = [action.update];
      store.emit(typeOfActions.UPDATE_DETAIL);
      break;

    default:
      break;
  }
});

export default AppDispatcher;
