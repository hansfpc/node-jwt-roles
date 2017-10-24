const mongoose = require('mongoose');
const  DB_URL = 'mongodb://localhost:27017/rolesmongo';
const loadModels = require('./models');

module.exports = function(){

  const connect = () => {
    mongoose.Promise = global.Promise;

    mongoose.connect(DB_URL,{
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useMongoClient: true
    }, (err) => {
      if (err) {
        console.log(`~*    Error connecting to ${DB_URL} `);
        console.log(`~*    ¿Reason?: ${err} `);
      } else {
        console.log(`~*    Connection: OK, ${DB_URL}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

  loadModels();
};