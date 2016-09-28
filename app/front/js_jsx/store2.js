import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const fakeData = {
  detail: {
    3: ['3 06h23 3 5 7 123', '3 06h19 3 5 7 123', '3 06h15 3 5 7 123'],
    7: ['7 06h23 3 5 7 123', '7 06h19 3 5 7 123', '7 06h15 3 5 7 123'],
    9: ['9 06h23 3 5 7 123', '9 06h19 3 5 7 123', '9 06h15 3 5 7 123'],
    11: ['11 06h23 3 5 7 123', '11 06h19 3 5 7 123', '11 06h15 3 5 7 123'],
    23: ['23 06h23 3 5 7 123', '23 06h19 3 5 7 123', '23 06h15 3 5 7 123']
  },
  location: {
    3: ['3', '45.5919.75', '2.845067'],
    7: ['7', '45.5919.75', '2.845067'],
    9: ['9', '45.5919.75', '2.845067'],
    11: ['11', '45.5919.75', '2.845067'],
    23: ['23', '45.5919.75', '2.845067']
  }
};

function detail(state = fakeData, action) {
  return state;
}
const store = createStore(detail, fakeData, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
export default store;
