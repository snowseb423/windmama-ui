import { Dispatcher } from 'flux';
import { typeOfActions } from './actions.js';
import store from './store.js';
import { readCookie } from '../common.js';


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

    case typeOfActions.DISPLAY_DETAIL:
      store.displayDetail = action.id;
      store.emit(typeOfActions.DISPLAY_DETAIL);
      break;

    case typeOfActions.ADD_BOOKMARK:
      (() => {
        if (navigator.cookieEnabled) {
          var bookmarksId = readCookie('bookmarks');
          if(!bookmarksId) {
            document.cookie = 'bookmarks=' + action.id + '; expires=Thu, 01 jan 2030 00:00:00 UTC; path=/';
            if (store.bookmarks.indexOf(action.id) === -1)
              store.bookmarks.unshift(action.id);
            else
              store.bookmarks.splice(store.bookmarks.indexOf(action.id),1);
            store.emit(typeOfActions.RIGHT_ACTIVATION);
          } else if (bookmarksId) {
            document.cookie = 'bookmarks=' + action.id + '|' + bookmarksId + '; expires=Thu, 01 jan 2030 00:00:00 UTC; path=/';
            if (store.bookmarks.indexOf(action.id) === -1)
              store.bookmarks.unshift(action.id);
            else
              store.bookmarks.splice(store.bookmarks.indexOf(action.id),1);
            store.emit(typeOfActions.RIGHT_ACTIVATION);
          }
        } else {
          alert('Vous devez autoriser les cookies pour utiliser cette fonction.');
        }
      })();
      store.emit(typeOfActions.ADD_BOOKMARK);
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
