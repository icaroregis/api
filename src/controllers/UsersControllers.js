//Um controller é onde ficam as regras de negócio da nossa aplicação.
//Pode ter até cinco métodos por classe:
//1. index => Get para listar vários registros.
//2. show => Get para exibir um registro específico de um usuário.
//3. create => Post para criar um registro.
//4. update => Put para atualizar um registro.
//5. delete => Remover um registro.

//Usamos métodos dentro da classe, por isso não colocamos a palavra reservada function. No caso a diferença entre function e método é: Uma função pode ser chamada diretamente por seu nome. Um método consiste em um código que pode ser chamado pelo nome de seu objeto e seu nome de método usando a notação de ponto ou a notação de colchetes

const AppError = require('../utils/appError');
class UsersControllers {
  create(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      throw new AppError('Nome é obrigatório!');
    }

    // response é a interface de resposta HTTP, você pode enviar cabeçalhos e o corpo para o navegador.
    // response.send(`Usuário: ${name} - E-mail: ${email} - senha: ${password}`);

    response.status(201).json({ name, email, password });
  }
}

module.exports = UsersControllers;
