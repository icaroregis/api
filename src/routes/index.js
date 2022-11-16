const { Router } = require('express');
const usersRouter = require('./users.routes');

const routes = Router();
//quando o caminho "/users" for acessado será redirecionado para rota usersRouter.
routes.use('/users', usersRouter);

module.exports = routes;
