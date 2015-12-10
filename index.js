'use strict';
let express = require('express');
let engines = require('consolidate');

let app = express();
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'hbs');

// Express routes
app.get('/', (req, res) => {
  //res.send("Hello World!");
  res.render("index");
});

app.get('/foo', (req, res) => {
  res.end();
});

// Start express server
app.listen(3000);

