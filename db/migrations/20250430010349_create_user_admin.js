/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex('users').insert({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin', // Em produção, use hash
      role: 'admin'
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex('users')
      .where({ email: 'admin@admin.com' })
      .del();
  }
  