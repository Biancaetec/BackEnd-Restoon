/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('item_pedido', (table) => {
    table.increments('id_item').primary();
    table
      .integer('id_pedido')
      .unsigned()
      .references('id_pedido')
      .inTable('pedido')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('id_produto')
      .unsigned()
      .references('id_produto')
      .inTable('produto')
      .onDelete('SET NULL')
      .nullable();
    table.integer('quantidade').notNullable();
    table.decimal('preco_unitario', 10, 2).notNullable();
    table.string('status').notNullable(); // aguardando, em_preparo, pronto
  });
}

export function down(knex) {
  return knex.schema.dropTable('item_pedido');
}
