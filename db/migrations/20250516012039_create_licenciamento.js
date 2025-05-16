/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('licenciamento', (table) => {
    table.increments('id_licenciamento').primary();
    table
      .integer('id_restaurante')
      .unsigned()
      .references('id_restaurante')
      .inTable('restaurante')
      .onDelete('CASCADE')
      .notNullable();

    table.date('data_inicio').notNullable();
    table.date('data_fim').notNullable();
    table.string('status').notNullable(); // ativo, expirado, pendente
    table.decimal('valor').notNullable();
    table.string('tipo').notNullable(); // gratuito, mensal, anual
  });
}

export function down(knex) {
  return knex.schema.dropTable('licenciamento');
}

