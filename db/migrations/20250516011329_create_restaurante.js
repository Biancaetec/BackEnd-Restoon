/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('restaurante', function(table) {
    table.increments('id_restaurante').primary();
    table.integer('id_usuario').notNullable(); // Caso deseje referenciar um usuário
    table.string('nome');
    table.string('email').unique();
    table.string('senha');
    table.datetime('criado_em').defaultTo(knex.fn.now());
    table.enu('status_licenciamento', ['ativo', 'expirado', 'pendente']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('restaurante');
};

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('restaurante');
};
