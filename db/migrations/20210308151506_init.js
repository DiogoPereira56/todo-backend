
exports.up = function(knex) {
  return knex.schema
    .createTable('clients', (table) => {
        table.increments();
        table.string('name');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    })
    .createTable('list_of_tasks', (table) => {
        table.increments();
        table.integer('idClient').reference('id').inTable('clients');
        table.string('listName');
    })
    .createTable('tasks', (table) => {
        table.increments();
        table.integer('idList').reference('id').inTable('list_of_tasks');
        table.string('title');
        table.boolean('complete');
        table.string('description');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('clients')
    .dropTableIfExists('list_of_tasks')
    .dropTableIfExists('tasks');
};
