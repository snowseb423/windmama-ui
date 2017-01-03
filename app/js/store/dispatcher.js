import { Dispatcher } from 'flux';
import { typeOfActions } from './actions.js';
import store from './store.js';

var AppDispatcher = new Dispatcher();

AppDispatcher.register((action) => {

  switch (action.actionType) {
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

    case typeOfActions.REQUEST_DETAIL:
      store.detailActive = action.id;
      store.emit(typeOfActions.REQUEST_DETAIL);
      break;

    case typeOfActions.UPDATE_DETAIL:
      var updateSplit = action.update.split('|');
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
