// The store in flux is responsible for storing the data that we work
// with in our app. It also uses the dispatcher.
// The store decides what the canonical true state is for the data
// The store has one main rule - only the store can change data inside the store
// therefore, when something changes in the store it's much easier to figure out 
// what happened
'use strict';
import dispatcher from './../dispatcher.js';

class GroceryItemStore {
  constructor() {
    this.items = [{
      name: "Ice Cream"
    }, {
      name: "Waffles"
    }, {
      name: "Candy",
      purchased: true
    }, {
      name: "Sharks!"
    }];
    this.listeners = [];

    dispatcher.register((event) => {
      console.log("Registering event", event);
      const split = event.type.split(':');
      if (split[0] === 'grocery-item') {
        switch (split[1]) {
          case 'add':
            this.addGroceryItem(event.payload);
            break;
          case 'delete':
            this.deleteGroceryItem(event.payload);
            break;
          case 'buy':
            this.setGroceryItemBought(event.payload, true);
            break;
          case 'unbuy':
            this.setGroceryItemBought(event.payload, false);
            break;
        } 
      }
    });
  }

  /**
   * returns all the items in the store
   */
  getItems() { 
    return this.items; 
  }

  /**
   * handles registering the change listener
   */
  onChange(listener) { 
    this.listeners.push(listener); 
  }

  /**
   * triggers all the listeners. When called all the components that are listening
   * to the GroceryItemStore receive a new copy of the items
   */
  triggerListeners() {
    this.listeners.forEach((listener) => {
      listener(this.items);
    });
  }

  /**
   * adds a new grocery item to the store
   */
  addGroceryItem(item) {
    this.items.push(item);
    // After we've added the item we trigger the listeners to update
    // all our components that are listening to the store
    this.triggerListeners();
  }

  /**
   * removes a grocery item from the items store and refreshes the listeners data
   */
  deleteGroceryItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.triggerListeners();
  }

  /**
   * sets the status of an item. If it is purchased or not
   */
  setGroceryItemBought(item, isBought) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items[index].purchased = isBought;
      this.triggerListeners();
    }
  }
}

export default new GroceryItemStore();
