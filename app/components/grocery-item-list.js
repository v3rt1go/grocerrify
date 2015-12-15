'use strict';
import React from 'react';
import GroceryItem from './grocery-item.js';
import GroceryListAddItem from './grocery-list-add-item.js';

class GroceryItemList extends React.Component {
  render() {
    return (
      <div>
        <h1>Grocery Listify</h1>
        <div>
          {
            this.props.items.map((item, index) => {
              return <GroceryItem item={item} key={'item' + index} />;
            })
          }
        </div>
        <GroceryListAddItem />
      </div>
    ); 
  }
}

export default GroceryItemList;
