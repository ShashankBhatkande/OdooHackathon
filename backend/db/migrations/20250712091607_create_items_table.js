/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id').primary();
    table.integer('owner_id').unsigned().notNullable();
    table.string('title');
    table.text('description');
    table.string('category');
    table.string('type');
    table.string('size');
    table.string('condition');
    table.string('tags');
    table.text('images'); // comma-separated URLs
    table.string('status').defaultTo('pending'); // pending, approved, rejected
    table.foreign('owner_id').references('users.id').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('items');
};
