import store from './store';
import { Dispatcher } from 'flux';
var AppDispatcher = new Dispatcher();

export var typeOfActions = {
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  CHANGE_EVENT: 'change'
};

export var Actions = {
  leftActivation: () => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.LEFT_ACTIVATION
    });
  },
  rightActivation: () => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.RIGHT_ACTIVATION
    });
  }
};

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case typeOfActions.LEFT_ACTIVATION:
      store.leftActive = !store.leftActive;
      store.rightActive = false;
      store.emit(typeOfActions.CHANGE_EVENT);
      break;
    case typeOfActions.RIGHT_ACTIVATION:
      store.rightActive = !store.rightActive;
      store.leftActive = false;
      store.emit(typeOfActions.CHANGE_EVENT);
      break;
    default:
      break;
  }
});
