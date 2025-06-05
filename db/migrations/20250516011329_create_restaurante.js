/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('restaurante', (table) => {
    table.increments('id_restaurante').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.datetime('criado_em').defaultTo(knex.fn.now());
    table.enum('status_licenciamento', ['ativo', 'expirado', 'pendente']).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('restaurante');
};
