var mongoose = require('mongoose');
var mongoURI = 'mongodb://'+ process.env.MLAB +'@ds157380.mlab.com:57380/weekend_challenge_5';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
