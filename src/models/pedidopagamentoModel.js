import { connectDB } from '../../db/connection.js';

// Buscar todos os pagamentos de pedido
export async function findAll() {
  try {
    const db = await connectDB();
    const query = `
      SELECT
        id_pagamento_pedido, id_pedido, id_pagamento, valor_pago
      FROM pedido_pagamento;
    `;
    const pagamentos = await db.all(query);
    return pagamentos;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar pagamentos de pedido: " + error.message);
  }
}

// Criar novo pagamento de pedido
export async function create(data) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO pedido_pagamento
        (id_pedido, id_pagamento, valor_pago)
      VALUES (?, ?, ?);
    `;
    const result = await db.run(
      query,
      data.id_pedido,
      data.id_pagamento,
      data.valor_pago
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar pagamento de pedido: " + error.message);
  }
}

// Atualizar pagamento de pedido (parcial)
export async function update(id_pagamento_pedido, data) {
  try {
    const db = await connectDB();

    const fields = [];
    const values = [];

    if (data.id_pedido !== undefined) {
      fields.push("id_pedido = ?");
      values.push(data.id_pedido);
    }
    if (data.id_pagamento !== undefined) {
      fields.push("id_pagamento = ?");
      values.push(data.id_pagamento);
    }
    if (data.valor_pago !== undefined) {
      fields.push("valor_pago = ?");
      values.push(data.valor_pago);
    }

    if (fields.length === 0) {
      throw new Error("Nenhum campo enviado para atualização");
    }

    const query = `UPDATE pedido_pagamento SET ${fields.join(", ")} WHERE id_pagamento_pedido = ?;`;
    values.push(id_pagamento_pedido);

    const result = await db.run(query, ...values);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar pagamento de pedido: " + error.message);
  }
}

// Deletar pagamento de pedido
export async function remove(id_pagamento_pedido) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM pedido_pagamento WHERE id_pagamento_pedido = ?;";
    const result = await db.run(query, id_pagamento_pedido);
    if (result.changes === 0) {
      throw new Error("Pagamento de pedido não encontrado");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar pagamento de pedido: " + error.message);
  }
}
