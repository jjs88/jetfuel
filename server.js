const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
// database connection is established in sep file. import here
require('./db');



// middleware for handling post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//routes for the app
//all requests go to /api
app.use('/api', routes);
// when on the root URL, serve the public folder
app.use('/', express.static('public'))



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port:', port);
});