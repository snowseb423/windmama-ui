import initialState from './connect.js';
import { UPDATE_OBJECT, RIGHT_ACTIVE, LEFT_ACTIVE } from './actions.js';

const windmamaApp = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_OBJECT:
      var updateSplit = action.update.split('|');
      if (state.detail[updateSplit[0]])
        state.detail[updateSplit[0]].unshift(action.update);
      else
        state.detail[updateSplit[0]] = [action.update];
      return state;
    case LEFT_ACTIVE:
      state.leftActive = !state.leftActive;
      state.rightActive = false;
      break;
    case RIGHT_ACTIVE:
      state.rightActive = !state.rightActive;
      state.leftActive = false;
      break;
    default:
      return state;
  }
};

export default windmamaApp;
