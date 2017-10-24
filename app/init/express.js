const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = function(app){
  app.set('port', process.env.PORT || 3000);

  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); /* for parsing application/x-www-form-urlencoded ~*/
  app.use(cors());


  console.log('ºººººººººººººººººººººººººººº');
  console.log('~*    Starting X Server');
  console.log(`~*    Port: ${app.get('port')}`);
  console.log(`~*    Database: MongoDB`);
  console.log('ºººººººººººººººººººººººººººº');

};