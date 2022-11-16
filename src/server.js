require('express-async-errors');

const { json } = require('express');
//aqui estamos exigindo que todas funcionalidades do express sejam armazenadas dentro dessa variável.
const express = require('express');
const routes = require('./routes');
const AppError = require('./utils/appError');

//inicializando o express e atribuindo a variável criada com todas as funcionalidades do express a variável app.
const app = express();
//estou dizendo para o node usar o formato json
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  //lado do cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  //lado do servidor
  return (
    response.status(500),
    json({
      status: 'error',
      message: 'Internal server error',
    })
  );
});

//aqui estamos dizendo para o node em que porta ele irá atender as requisições.
const PORT = 3333;

//aqui o express fica escutando na porta criada na variavel acima, quando a aplicação iniciar irá executar alguma ação através da função arrow function.
app.listen(PORT, () => {
  console.log(`Server is runing on Port ${PORT}`);
});
