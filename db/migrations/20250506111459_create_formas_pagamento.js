/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('formas_pagamento', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable().unique();
        table.text('descricao');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('formas_pagamento');
};
