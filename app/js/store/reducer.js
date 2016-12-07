import { object, update } from './connect';

const reducer = (state = object, action) => {
  switch(action.type) {
    case 'UPDATE_OBJECT':
      var updateSplit = update.split('|');
      if (state.detail[updateSplit[0]]) {
        state.detail[updateSplit[0]].unshift(update);
      } else {
        state.detail[updateSplit[0]] = [update];
      }
      return state;
    default:
      return state;
  }
};

export default reducer;
