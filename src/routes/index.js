const { Router } = require('express');

const usersRouter = require('./users.routes');
const notesRouter = require('./notes.routes');

const routes = Router();

//quando o caminho "/users" for acessado será redirecionado para rota usersRouter.
routes.use('/users', usersRouter);
routes.use('/notes', notesRouter);

module.exports = routes;
