/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('categoria', (table) => {
    table.increments('id_categoria').primary();
    table.string('nome').notNullable();
    table
      .integer('id_restaurante')
      .unsigned()
      .references('id_restaurante')
      .inTable('restaurante')
      .onDelete('CASCADE')
      .notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('categoria');
}
