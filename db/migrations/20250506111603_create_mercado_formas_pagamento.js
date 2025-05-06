/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('mercado_formas_pagamento', (table) => {
        table.increments('id').primary();
        table.integer('mercado_id').references('id').inTable('mercados');
        table.integer('forma_pagamento_id').references('id').inTable('formas_pagamento');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('mercado_formas_pagamento');
};
