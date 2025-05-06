/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('payments', function(table) {
      table.increments('id').primary();
  
      table.integer('user_id')
        .notNullable()
        .comment('quem realizou o pagamento');
  
      table.integer('user_control')
        .comment('usuário que criou o registro');
  
      table.float('value')
        .notNullable();
  
      table.text('receipt')
        .notNullable();
  
      table.text('obs');
  
      table.timestamp('paymentdate')
        .notNullable();
  
      table.boolean('verified')
        .defaultTo(false)
        .comment('se o pagamento foi verificado');
  
      table.text('photo')
        .comment('link para a foto do comprovante de pagamento');
  
      table.timestamp('created_at')
        .defaultTo(knex.fn.now());
  
      table.timestamp('updated_at');
  
      // Índices úteis
      table.index(['paymentdate'], 'all_payment_of_date');
      table.index(['value'], 'range_of_value');
      table.index(['paymentdate', 'value'], 'all_payment_between_date_and_value');
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTableIfExists('payments');
  }
  