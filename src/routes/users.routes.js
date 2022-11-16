/* app.get(`/message/:id/:user`) => routes params.
request => requisição feita.
response => recurso para construir a reposta.
send => envio de mensagem.
quando queremos recuperar um parametro na rota colocamos /:
params são para dados mais simples como por exemplo o id
aqui no routeParams os parâmetros são obrigatórios, ou seja, devem ser passados na url/rota
app.get(`/message/:id/:user`, (request, response) => {
  const { id, user } = request.params;

  response.send(`Id da Mensagem: ${id}.
  Nome do usuário: ${user}`);  
}); 

app.get('/users') => query params
parametros opcionais, ou seja, podem ou não ser passados na url/rota
o sinal de interrogação significa dizer que esta vindo o 1 parametro logo após a barra(/)
o sinal de "&" significa que esta vindo o segundo(ou mais parametros) após a interrogação.
url => http://localhost:3333/users?page=10&limit=5 */

const { Router } = require('express');
const UsersControllers = require('../controllers/UsersControllers');

const usersRoutes = Router();
const usersControllers = new UsersControllers();

usersRoutes.post('/', usersControllers.create);

module.exports = usersRoutes;
