'use strict';
import express from 'express';
import engines from 'consolidate';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';

import itemsRouter from './server/routes/items.js';
import './server/database.js';
import GroceryItem from './server/models/GroceryItem.js';
import GroceryItemList from './app/components/grocery-item-list.js';

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/items', itemsRouter);

app.use('/client', express.static(__dirname + '/dist/client'));
app.use('/vendor', express.static(__dirname + '/dist/vendor'));
app.use('/styles', express.static(__dirname + '/app/styles'));

app.get('/', (req, res) => {
  //res.render("index");
  const reactApp = React.createFactory(GroceryItemList);
  GroceryItem.find()
    .then((data) => {
      // We build the react component with ReactDOM.renderToString and assign the items
      // to the data returned by mongoose. The object given as param to reactApp is the 
      // props of the component so we can give it the items key with the data value to
      // populate this.props.items inside the component
      const generated = ReactDOM.renderToString(reactApp({items: data}));
      res.render('index', {reactOutput: generated});
    }, (error) => {
      console.error("Error loading initial data ", error);
      res.status(500).send(error);
    });
});

// Start express server
app.listen(3000);

