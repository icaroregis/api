exports.up = (knex) =>
  knex.schema.createTable('tags', (table) => {
    table.increments('id');
    table.text('name').notNullable();
    //onDelete => deletar as tags que estão vinculadas a note já que excluindo a nota não será mais necessário as tags.
    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users');
  });

//down => processo de deletar a tabela.
exports.down = (knex) => knex.schema.dropTable('notes');
