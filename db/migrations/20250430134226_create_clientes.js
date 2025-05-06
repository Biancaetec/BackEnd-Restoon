/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('clientes', function(table) {
      table.increments('id').primary(); // ID auto incrementável
  
      table.string('username').notNullable(); // Nome do cliente
      table.string('email').notNullable().unique(); // Email único e obrigatório
      table.string('senha').notNullable(); // Senha do cliente
  
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Data de criação
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTableIfExists('clientes');
  }
  