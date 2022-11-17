/* sqlite3 => versão, sqlite => drive de comunicação do banco */
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const path = require('path');

async function sqliteConnection() {
  const database = await sqlite.open({
    //filername => onde será salvo o arquivo de banco de dados
    //dirname =>  fornece o caminho do diretório do módulo atual
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
