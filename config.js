// will set the mongoose connection for dev or prod database depending on the environment 
if(process.env.NODE_ENV === 'production') {
  module.exports = {
    MONGO_URI: 'mongodb://josh:josh@ds215380.mlab.com:15380/jetfuel-prod'
  }
} else {
  module.exports = {
    MONGO_URI: 'mongodb://josh:josh@ds113668.mlab.com:13668/jetfuel-dev'
  }
}