/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('enderecos', (table) => {
        table.increments('id').primary();
        table.integer('cliente_id').references('id').inTable('clientes').nullable();
        table.integer('mercado_id').references('id').inTable('mercados').nullable();
        table.string('rua').notNullable();
        table.string('bairro').notNullable();
        table.string('cep').notNullable();
        table.string('numero').notNullable();
        table.string('complemento');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('enderecos');
};
