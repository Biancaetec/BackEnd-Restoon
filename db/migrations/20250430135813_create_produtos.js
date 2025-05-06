export async function up(knex) {
    return knex.schema.createTable('produtos', (table) => {
      table.increments('id').primary();
      table.string('nome');
      table.text('descricao');
      table.decimal('preco');
      table.integer('categoria_id').references('id').inTable('categorias');
      table.integer('mercado_id').references('id').inTable('mercados');
      table.string('status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  }
  
  export async function down(knex) {
    return knex.schema.dropTable('produtos');
  }
  