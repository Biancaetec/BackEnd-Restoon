/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('horarios_funcionamento', (table) => {
        table.increments('id').primary();
        table.integer('mercado_id').notNullable().references('id').inTable('mercados');
        table.string('dia_semana', 20).notNullable();
        table.time('horario_abertura').notNullable();
        table.time('horario_fechamento').notNullable();
        table.date('data_feriado');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('horarios_funcionamento');
};
