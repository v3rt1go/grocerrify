'use strict';
import React from 'react';
import action from './../actions/grocery-item-action-creator.js';

class GroceryItem extends React.Component {
  togglePurchased(e) {
    e.preventDefault();

    if (this.props.item.purchased) {
      action.unbuy(this.props.item);
    } else {
      action.buy(this.props.item);
    }
  }

  removeItem(e) {
    e.preventDefault();
    action.delete(this.props.item);
  }

  render() {
    return ( 
      <div className="grocery-item row">
        <div className="six columns">
          <h4 className={this.props.item.purchased ? "purchased" : ""}>
            {this.props.item.name}
          </h4>
        </div>
        <form className="three columns" onSubmit={this.togglePurchased.bind(this)}>
          <button className={this.props.item.purchased ? "" : "button-primary"}>
            {this.props.item.purchased ? "Unbuy" : "Buy"}
          </button>
        </form>
        <form className="three columns" onSubmit={this.removeItem.bind(this)}>
          <button>&times;</button>
        </form>
      </div> 
    );  
  }
}

export default GroceryItem;
