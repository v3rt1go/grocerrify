'use strict';
import mongoose from 'mongoose';

const GroceryItemSchema = {
  id: String,
  name: String,
  purchased: Boolean
};
const GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema, 'groceryItems');

export default GroceryItem;

