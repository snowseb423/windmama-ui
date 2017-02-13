import AppDispatcher from './dispatcher.js';

export var typeOfActions = {
  SEND_DATA: 'SEND_DATA',
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  DISPLAY_DETAIL: 'DISPLAY_DETAIL'
};

export var Actions = {
  sendData: () => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.SEND_DATA
    });
  },
  updateDetail: (update) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.UPDATE_DETAIL,
      update: update,
      idUpdate: update.split('|')[0]
    });
  },
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
  displayDetail: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.DISPLAY_DETAIL,
      id: id
    });
  }
};
