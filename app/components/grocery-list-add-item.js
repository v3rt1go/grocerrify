'use strict';
import React from 'react';
import action from './../actions/grocery-item-action-creator.js';

class AddItemComponent extends React.Component {
  constructor() {
    super();
    this.state =  { 
      input: "" 
    }; 
  }

  handleInputName(e) {
    // e's target will always be the input since it's called with onChange
    // We MUST always use setState to set the state properties. If we use
    // this.state.input = value React will fail to update properly
    //
    // Inside handleInputName we need this to be the actual react component
    // so when we call it on onChange we have to explicitly bind this
    this.setState({
      input: e.target.value
    });
  }

  addItemToList(e) {
    // Stop the actual form submittion
    e.preventDefault();

    // We pass an object to the add action that contains the input value
    action.add({ name: this.state.input });
    // Then we reset the input sate value so the form clears
    this.setState({ input: "" });
  }

  // Notice how in es6 class notation we don't need , to separate functions in objects 
  render() {
    return (
      <div className="groceryAddItem">
        <form onSubmit={this.addItemToList.bind(this)}>
          <input value={this.state.input} onChange={this.handleInputName.bind(this)} />
          <button>Add Item</button>
        </form>
      </div>
    );
  }
}

export default AddItemComponent;
