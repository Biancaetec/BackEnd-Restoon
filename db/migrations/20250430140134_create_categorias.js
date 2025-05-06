export async function up(knex) {
    return knex.schema.createTable('categorias', (table) => {
      table.increments('id').primary();
      table.string('nome');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('categorias');
  }
  