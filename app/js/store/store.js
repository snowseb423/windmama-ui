import initialState from './initialState.js';
import { EventEmitter } from 'events';
import _ from 'lodash';

var store = _.assign(
  initialState,
  EventEmitter.prototype
);

export default store;
