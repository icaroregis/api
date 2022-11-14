//aqui estamos exigindo que todas funcionalidades do express sejam armazenadas dentro dessa variável.
const express = require('express');

//inicializando o express e atribuindo a variável criada com todas as funcionalidades do express a variável app.
const app = express();
//estou dizendo para o node usar o formato json
app.use(express.json());

//app.get(`/message/:id/:user`) => routes params.
//request => requisição feita.
//response => recurso para construir a reposta.
//send => envio de mensagem.
//quando queremos recuperar um parametro na rota colocamos /:
//params são para dados mais simples como por exemplo o id
//aqui no routeParams os parâmetros são obrigatórios, ou seja, devem ser passados na url/rota
// app.get(`/message/:id/:user`, (request, response) => {
//   const { id, user } = request.params;

//   response.send(`Id da Mensagem: ${id}.
//   Nome do usuário: ${user}`);
// });

//app.get('/users') => query params
//parametros opcionais, ou seja, podem ou não ser passados na url/rota
//o sinal de interrogação significa dizer que esta vindo o 1 parametro logo após a barra(/)
//o sinal de "&" significa que esta vindo o segundo(ou mais parametros) após a interrogação.
//url => http://localhost:3333/users?page=10&limit=5
app.post('/users', (resquest, response) => {
  const { name, email, password } = resquest.body;

  // response é a interface de resposta HTTP, você pode enviar cabeçalhos e o corpo para o navegador.
  // response.send(`Usuário: ${name} - E-mail: ${email} - senha: ${password}`);

  response.json(`Usuário: ${name} - E-mail: ${email} - senha: ${password}`);
});

//aqui estamos dizendo para o node em que porta ele irá atender as requisições.
const PORT = 3333;

//aqui o express fica escutando na porta criada na variavel acima, quando a aplicação iniciar irá executar alguma ação através da função arrow function.
app.listen(PORT, () => {
  console.log(`Server is runing on Port ${PORT}`);
});
