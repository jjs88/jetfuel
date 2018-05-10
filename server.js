const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/api', routes);
app.use('/', express.static('public'))



const port = 3000;
app.listen(port, () => {
  console.log('listening on port:', port);
});