/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pedido', (table) => {
    table.increments('id_pedido').primary();
    table
      .integer('id_mesa')
      .unsigned()
      .references('id_mesa')
      .inTable('mesa')
      .onDelete('SET NULL')
      .nullable();
    table
      .integer('id_usuario')
      .unsigned()
      .references('id_usuario')
      .inTable('usuario')
      .onDelete('SET NULL')
      .nullable();
    table.string('status').notNullable();
    table.string('tipo_preparo').notNullable();
    table.datetime('data_abertura').notNullable();
    table.datetime('data_fechamento').nullable();
    table.decimal('valor_total', 10, 2).notNullable();
    table.text('observacoes').nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('pedido');
}
