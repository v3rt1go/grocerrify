'use strict';
import mongoose from 'mongoose';
import GroceryItem from './models/GroceryItem.js';

mongoose.connect('mongodb://localhost/grocerify');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

function seedData() {
  GroceryItem.count({}, (err, count) => {
    if (err) throw err;

    if (count === 0) {
      console.log("Seeding data ...");
      const items = [{
          name: "Ice Cream"
        }, {
          name: "Waffles"
        }, {
          name: "Candy",
          purchased: true
        }, {
          name: "Sharks!"
        }];

      items.forEach((item) => {
        GroceryItem.create(item, (err) => {
          if (err) console.error(err);
        });
      });
    }
  });  
}

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
  console.log("Connection to database established.");
  seedData();
});

