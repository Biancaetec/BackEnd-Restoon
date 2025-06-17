/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('restaurante', (table) => {
    table.increments('id_restaurante').primary();

    table
      .integer('id_usuario')
      .unsigned()
      .references('id_usuario')
      .inTable('usuario')
      .onDelete('CASCADE')
      .notNullable();

    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();

    table.timestamp('criado_em').defaultTo(knex.fn.now());

    table
      .enu('status_licenciamento', ['ativo', 'pendente', 'expirado'])
      .notNullable()
      .defaultTo('pendente');

    table.index(['email', 'senha'], 'login_restaurante');
    table.index(['nome'], 'nome_restaurante');
  });
}

export function down(knex) {
  return knex.schema.dropTable('restaurante');
}
