const { Router } = require('express');
const NotesControllers = require('../controllers/NotesControllers');

const notesRoutes = Router();

function myMiddleware(request, response, next) {
  //o next chama a próxima função para seguir o fluxo. Senão for passado ficará carregando eternamente.
  next();
}

const notesControllers = new NotesControllers();

notesRoutes.post('/:user_id', myMiddleware, notesControllers.create);

module.exports = notesRoutes;
