//Um controller é onde ficam as regras de negócio da nossa aplicação.
//Pode ter até cinco métodos por classe:
//1. index => Get para listar vários registros.
//2. show => Get para exibir um registro específico de um usuário.
//3. create => Post para criar um registro.
//4. update => Put para atualizar um registro.
//5. delete => Remover um registro.

//response é a interface de resposta HTTP, você pode enviar cabeçalhos e o corpo para o navegador.
//response.send(`Usuário: ${name} - E-mail: ${email} - senha: ${password}`);
//response.status(201).json({ name, email, password });

//Usamos métodos dentro da classe, por isso não colocamos a palavra reservada function. No caso a diferença entre function e método é: Uma função pode ser chamada diretamente por seu nome. Um método consiste em um código que pode ser chamado pelo nome de seu objeto e seu nome de método usando a notação de ponto ou a notação de colchetes

const AppError = require('../utils/appError');
const sqliteConnection = require('../database/sqlite');
class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    //a interrogação simboliza a substituição da interrogação pela variável "[email]".
    //selecione todos os campos da tabela usuário onde o email seja igual ao email que o usuário esta tentando cadastrar.
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    //se o email que o usuário esta tentando cadastrar for igual ao email cadastrado no banco de dados...
    if (checkUserExists) {
      throw new AppError('Oops, Este e-mail já está em uso!');
    }

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

    return response.status(201).json();
  }
}

module.exports = UsersControllers;
