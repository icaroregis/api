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
const { hash, compare } = require('bcryptjs');
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

    const hashedPassword = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new AppError('Oops, Usuário não encontrado!!!');
    }

    const userWithUpdateEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    //Se o id do email que esta sendo cadastrado é diferente do id de um email já cadastrado significa que esse email já esta em  uso com outro usuário.
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Oops, Este e-mail já está em uso!');
    }

    //O operador de união nula (??) é um operador lógico que retorna seu operando do lado direito quando seu operando do lado esquerdo é null ou undefined, caso contrário, retorna seu operando do lado esquerdo.
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError('Oops, Você precisa informar a senha antiga para definir a nova senha!!');
    }

    if (password && old_password) {
      //comparação se a senha antiga que esta cadastrada no banco bate com a senha informada pelo usuário
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Oops, A senha antiga não confere!!!');
      }

      user.password = await hash(password, 8);
    }

    //UPDATE users SET => atualiza a tabela users e defina...
    //set => definir
    await database.run('UPDATE users SET name = ?, email = ?, password = ?, update_at = DATETIME("now") WHERE id = ?', [user.name, user.email, user.password, id]);

    return response.status(200).json();
  }
}

module.exports = UsersControllers;
