//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    linkUrl: {
      type: String,
      require: true
    },
    shortenedUrl: {
      type: String
    }
});

//on save hook, encrypt password
LinkSchema.pre('save', function(next) {
  // const user = this;
  const link = this;
  const random = Math.floor(Math.random() * Math.floor(100000));
  link.shortenedUrl = `/api/jetfuel${random}`;
  next();
});

// Compile model from schema
module.exports = mongoose.model('Link', LinkSchema);