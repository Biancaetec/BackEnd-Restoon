/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('pedido_pagamento', (table) => {
    table.increments('id_pagamento_pedido').primary();
    table
      .integer('id_pedido')
      .unsigned()
      .references('id_pedido')
      .inTable('pedido')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('id_pagamento')
      .unsigned()
      .references('id_pagamento')
      .inTable('forma_pagamento')
      .onDelete('SET NULL')
      .nullable();
    table.decimal('valor_pago', 10, 2).notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('pedido_pagamento');
}
