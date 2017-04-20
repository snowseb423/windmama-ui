import AppDispatcher from './dispatcher.js';

export var typeOfActions = {
  SEND_DATA: 'SEND_DATA',
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  HOVER_ID: 'HOVER_ID',
  DISPLAY_DETAIL: 'DISPLAY_DETAIL',
  CHANGE_VIEWPORT: 'CHANGE_VIEWPORT',
  PINCH_LEVEL: 'PINCH_LEVEL'
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
      idUpdate: update[0]
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
  hoverId: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.HOVER_ID,
      id: id
    });
  },
  displayDetail: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.DISPLAY_DETAIL,
      id: id
    });
  },
  changeViewport: (size) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.CHANGE_VIEWPORT,
      size: size
    });
  },
  pinchLevel: (lvl) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.PINCH_LEVEL,
      lvl: lvl
    });
  }
};
