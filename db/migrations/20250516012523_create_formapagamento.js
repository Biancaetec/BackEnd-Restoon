/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('forma_pagamento', (table) => {
    table.increments('id_pagamento').primary();
    table.string('descricao').notNullable();
    table
      .integer('id_restaurante')
      .unsigned()
      .references('id_restaurante')
      .inTable('restaurante')
      .onDelete('CASCADE')
      .notNullable();
    table.boolean('ativo').notNullable().defaultTo(true);
  });
}

export function down(knex) {
  return knex.schema.dropTable('forma_pagamento');
}
