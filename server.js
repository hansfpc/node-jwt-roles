const express  = require('express');
const initMongo = require('./app/db/mongo');
const initExpress = require('./app/init/express');
const initRoutes = require('./app/routes');
const app = express();

initMongo();
initExpress(app);
initRoutes(app);

app.listen(app.get('port'));