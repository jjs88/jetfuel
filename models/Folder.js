//Require Mongoose
var mongoose = require('mongoose');

//need to get the id of the Link to connect

//Define a schema
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    links: [
      {type: Schema.Types.ObjectId, ref: 'Link'}
    ] 
   
});


// Compile model from schema
module.exports = mongoose.model('Folder', FolderSchema);