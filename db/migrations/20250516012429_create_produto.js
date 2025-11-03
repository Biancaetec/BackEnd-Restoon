/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('produto', (table) => {
    table.increments('id_produto').primary();
    table.string('nome').notNullable();
    table.text('descricao').notNullable();
    table.decimal('preco', 10, 2).notNullable();
    table.string('tipo_preparo').notNullable(); 
    tables
      .integer('id_categoria')
      .unsigned()
      .references('id_categoria')
      .inTable('categoria')
      .onDelete('CASCADE')
      .notNullable();
    table
      .integer('id_restaurante')
      .unsigned()
      .references('id_restaurante')
      .inTable('restaurante')
      .onDelete('CASCADE')
      .notNullable();
    table.boolean('ativo').notNullable().defaultTo(true);
    table.string('imagem', 255).nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('produto');
}
