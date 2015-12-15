'use strict';
let express = require('express');
let engines = require('consolidate');

let app = express();
app.engine('hbs', engines.handlebars);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'hbs');

app.use('/client', express.static(__dirname + '/dist/client'));
app.use('/vendor', express.static(__dirname + '/dist/vendor'));
app.use('/styles', express.static(__dirname + '/app/styles'));

app.get('/', (req, res) => {
  res.render("index");
});

// Start express server
app.listen(3000);

