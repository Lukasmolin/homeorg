
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('username', 24).unique();
    table.string('password', 12);
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
