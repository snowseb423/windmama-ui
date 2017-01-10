import AppDispatcher from './dispatcher.js';
import store from './store.js';

export var typeOfActions = {
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  REQUEST_DETAIL: 'REQUEST_DETAIL'
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
  },
  updateDetail: (update) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.UPDATE_DETAIL,
      update: update,
      idUpdate: update.split('|')[0]
    });
  },
  requestDetailOfId: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.REQUEST_DETAIL,
      id: id
    });
    if (store.mobile) {
      AppDispatcher.dispatch({
        actionType: typeOfActions.LEFT_ACTIVATION
      });
    }
  }
};
