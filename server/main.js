'use strict';
let express = require('express');


let app = express();

// Express routes
app.get('/', (req, res) => {
  res.render('./../app/index.html', {});
});

// Start express server
app.listen(3000);
