export async function up(knex) {
    return knex.schema.createTable('mercados', (table) => {
      table.increments('id').primary();
      table.string('nome');
      table.string('cnpj').unique();
      table.string('email');
      table.string('telefone');
      table.string('logradouro');
      table.string('bairro');
      table.string('cep');
      table.string('numero');
      table.string('senha');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('mercados');
  }
  