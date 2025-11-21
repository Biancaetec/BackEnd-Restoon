import db from '../../db/connection.js';

// Buscar todos os pedidos
export async function findAll() {
  try {
    const query = `
      SELECT 
        id_pedido, id_mesa, id_usuario, status, tipo_preparo, 
        data_abertura, data_fechamento, valor_total, observacoes 
      FROM pedido;
    `;

    return db.prepare(query).all();

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar pedidos: " + error.message);
  }
}

// Criar novo pedido
export async function create(pedidoData) {
  try {
    const query = `
      INSERT INTO pedido 
        (id_mesa, id_usuario, status, tipo_preparo, data_abertura, data_fechamento, valor_total, observacoes) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const result = db.prepare(query).run(
      pedidoData.id_mesa,
      pedidoData.id_usuario,
      pedidoData.status,
      pedidoData.tipo_preparo ?? null,
      pedidoData.data_abertura ?? null,
      pedidoData.data_fechamento ?? null,
      pedidoData.valor_total ?? null,
      pedidoData.observacoes ?? null
    );

    return result;

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar pedido: " + error.message);
  }
}

// Atualizar pedido existente
export async function update(id_pedido, pedidoData) {
  try {
    // Monta dinamicamente os campos
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(pedidoData)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    values.push(id_pedido);

    const query = `
      UPDATE pedido SET ${fields.join(", ")} WHERE id_pedido = ?;
    `;

    const result = db.prepare(query).run(...values);

    return result;

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar pedido: " + error.message);
  }
}

// Remover pedido
export async function remove(id_pedido) {
  try {
    const query = "DELETE FROM pedido WHERE id_pedido = ?;";
    const result = db.prepare(query).run(id_pedido);

    if (result.changes === 0) {
      throw new Error("Pedido não encontrado");
    }

    return result;

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar pedido: " + error.message);
  }
}
