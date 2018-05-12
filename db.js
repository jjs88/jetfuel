//Import the mongoose module
const mongoose = require('mongoose');
const config = require('./config');

//Set up default mongoose connection
// const mongoDB = 'mongodb://127.0.0.1/jetfuel';
const mongoDB = config.MONGO_URI;
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));