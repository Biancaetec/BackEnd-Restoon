/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('pedidos', (table) => {
        table.increments('id').primary();
        table.integer('cliente_id').references('id').inTable('clientes');
        table.integer('mercado_id').references('id').inTable('mercados');
        table.string('status');
        table.decimal('total');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('pedidos');
};
