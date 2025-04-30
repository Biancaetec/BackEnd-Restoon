/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.text('username').notNullable();
      table.text('email').notNullable().unique();
      table.text('password').defaultTo('123456');
      table.string('role').defaultTo('user').comment("admin/parcial/user");
      table.text('photo').comment('link to photo');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
  
      table.index(['email', 'password'], 'login');
      table.index('username', 'name');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTableIfExists('users');
  }
  