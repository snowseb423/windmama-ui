import AppDispatcher from './dispatcher.js';

export var typeOfActions = {
  SEND_DATA: 'SEND_DATA',
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  DISPLAY_DETAIL: 'DISPLAY_DETAIL',
  HOVER_ID: 'HOVER_ID',
  SHIFTING_MAP: 'SHIFTING_MAP',
  CHANGE_VIEWPORT: 'CHANGE_VIEWPORT'
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
  shiftingMap: (coord) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.SHIFTING_MAP,
      coord: coord
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
  },
  hoverId: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.HOVER_ID,
      id: id
    });
  },
  changeViewport: (size) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.CHANGE_VIEWPORT,
      size: size
    });
  }
};
