const config = require('../../../knexfile');
const knex = require('knex');

//passando as configurações definidas no arquivo de configuração do knex.
const connection = knex(config.development);

module.exports = connection;
