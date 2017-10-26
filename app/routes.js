var AuthenticationController = require('./db/mongo/controllers/auth'),
    TodoController = require('./db/mongo/controllers/todos'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

  var apiRoutes = express.Router(),
      authRoutes = express.Router(),
      todoRoutes = express.Router();

  // Auth Routes
  apiRoutes.use('/auth', authRoutes);

  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  authRoutes.get('/protected', requireAuth, function(req, res){
    res.send({ content: 'Success'});
  });

  // Todo Routes
  apiRoutes.use('/todos', todoRoutes);

  todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
  todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
  todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);

  // Set up routes
  app.use('/api', apiRoutes);

  app.get('/', function (req, res) {
    res.send('Home');
  });

};