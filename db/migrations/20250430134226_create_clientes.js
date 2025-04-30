/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('clientes', function(table) {
        table.increments('id').primary(); // ID autoincremento e chave primária
        table.string('username');
        table.string('email').unique();   // Índice único
        table.string('senha');
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Data de criação padrão: agora
      });
    };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('clientes');
};
