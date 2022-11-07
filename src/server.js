//aqui estamos exigindo que todas funcionalidades do express sejam armazenadas dentro dessa variável.
const express = require('express');

//inicializando o express e atribuindo a variável criada com todas as funcionalidades do express a variável app.
const app = express();

//aqui estamos dizendo para o node em que porta ele irá atender as requisições.
const PORT = 3333;

//aqui o express fica escutando na porta criada na variavel acima, quando a aplicação iniciar irá executar alguma ação através da função arrow function.
app.listen(PORT, () => {
  console.log(`Server is runing on POrt ${PORT}`);
});
