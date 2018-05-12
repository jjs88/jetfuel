const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
require('./db');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/api', routes);
app.use('/', express.static('public'))



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port:', port);
});