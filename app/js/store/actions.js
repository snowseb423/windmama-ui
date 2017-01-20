import AppDispatcher from './dispatcher.js';

export var typeOfActions = {
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  DISPLAY_DETAIL: 'DISPLAY_DETAIL',
  ADD_BOOKMARK: 'ADD_BOOKMARK'
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
  displayDetail: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.DISPLAY_DETAIL,
      id: id
    });
  },
  addBookmark: (id) => {
    AppDispatcher.dispatch({
      actionType: typeOfActions.ADD_BOOKMARK,
      id: id
    });
  }
};
