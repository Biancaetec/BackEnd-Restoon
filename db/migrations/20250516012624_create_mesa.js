/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('mesa', (table) => {
    table.increments('id_mesa').primary();
    table.integer('numero').notNullable();
    table.string('descricao').notNullable();
    table
      .integer('id_restaurante')
      .unsigned()
      .references('id_restaurante')
      .inTable('restaurante')
      .onDelete('CASCADE')
      .notNullable();
    table.boolean('ocupada').notNullable().defaultTo(false);
  });
}

export function down(knex) {
  return knex.schema.dropTable('mesa');
}
