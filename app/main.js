'use strict';
/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/

import ReactDOM from 'react-dom';
import GroceryItemList from './components/grocery-item-list.js';
import groceryItemStore from './stores/grocery-item-store.js';

const mountPoint = document.getElementById('app');
let initial = groceryItemStore.getItems();

function render() {
  ReactDOM.render(<GroceryItemList items={initial}/>, mountPoint);
}
groceryItemStore.onChange((items) => {
  initial = items;
  render();
});
render();
