// This is going to be a connector between all our files that need to be dispatched
// and the dispatcher
'use strict';
import dispatcher from './../dispatcher.js';

const GroceryItemActionCreator = {
  add(item) {
    dispatcher.dispatch({
      payload: item,
      type: 'grocery-item:add'
    });
  }
};

export default GroceryItemActionCreator;
