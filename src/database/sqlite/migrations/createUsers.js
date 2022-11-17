//IF NOT EXISTS => quando não existir. Para não dar conflito com a tabela que já existe, caso já exista alguma criada.

const createUsers = ` 
  CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL, 
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  ) 
`;

module.exports = createUsers;
