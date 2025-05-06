/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('itens_pedido', (table) => {
        table.increments('id').primary();
        table.integer('pedido_id').references('id').inTable('pedidos');
        table.integer('produto_id').references('id').inTable('produtos');
        table.integer('quantidade');
        table.decimal('subtotal');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('itens_pedido');
};
