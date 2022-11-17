//table.integer('user_id').reference('id').inTable('users'); => Aqui estou criando um campo do tipo inteiro, esse campo faz referência ao id que existe dentro dfa tabela(inTable).

//up => processo de criar a tabela.
exports.up = (knex) =>
  knex.schema.createTable('notes', (table) => {
    table.increments('id');
    table.text('title');
    table.text('description');
    table.integer('user_id').references('id').inTable('users');
    table.timestamp('created_at').default(knex.fn.now());
    table.timestamp('update_at').default(knex.fn.now());
  });

//down => processo de deletar a tabela.
exports.down = (knex) => knex.schema.dropTable('notes');
