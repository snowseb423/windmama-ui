import initialState from './connect.js';
import _ from 'lodash';
import { EventEmitter } from 'events';

var store = _.assign(
  initialState,
  EventEmitter.prototype
);

export default store;
