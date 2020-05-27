
exports.up = function(knex) {
  return knex.schema.createTable('debts', function(table) {
    table.increments('debt_id');
    table.integer('owner_bill').notNullable();
    table.integer('debtor_user').notNullable();
    table.integer('value').unsigned().notNullable();

    table.foreign('owner_bill').references('bill_id').inTable('bills');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('debts');
};
