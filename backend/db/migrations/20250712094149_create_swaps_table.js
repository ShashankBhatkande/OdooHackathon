/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('swaps', function(table) {
    table.increments('id').primary();
    table.integer('initiator_id').unsigned().notNullable();
    table.integer('item_id').unsigned().notNullable();
    table.string('status').defaultTo('pending'); // pending, accepted, completed, rejected
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign('initiator_id').references('users.id').onDelete('CASCADE');
    table.foreign('item_id').references('items.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('swaps');
};
