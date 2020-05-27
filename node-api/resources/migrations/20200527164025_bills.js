
exports.up = function(knex) {
    return knex.schema.createTable('bills', function(table) {
    table.increments('bill_id');
    table.integer('value').unsigned().notNullable();
    table.integer('owner_id').notNullable();
    table.string('description', 128);
    table.date('bill_date');

    table.foreign('owner_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bills');
};
