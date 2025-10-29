// import { connectDB } from '../../db/connection.js';
import  connectDB  from '../../db/connection.js';

// Buscar todos os itens do pedido
export async function findAll() {
  try {
    const db = await connectDB();
    const query = `
      SELECT 
        id_item, id_pedido, id_produto, quantidade, preco_unitario, tipo_porção, status 
      FROM item_pedido;
    `;
    const itens = await db.all(query);
    return itens;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar itens de pedido: " + error.message);
  }
}

// Criar novo item de pedido
export async function create(data) {
  try {
    const db = await connectDB();
    const query = `
      INSERT INTO item_pedido
        (id_pedido, id_produto, quantidade, preco_unitario, tipo_porção, status)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await db.run(
      query,
      data.id_pedido,
      data.id_produto,
      data.quantidade,
      data.preco_unitario,
      data.tipo_porção,
      data.status
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao criar item de pedido: " + error.message);
  }
}

// Atualizar item de pedido (parcial)
export async function update(id_item, data) {
  try {
    const db = await connectDB();

    // Construir campos dinamicamente
    const fields = [];
    const values = [];

    if (data.id_pedido !== undefined) {
      fields.push("id_pedido = ?");
      values.push(data.id_pedido);
    }
    if (data.id_produto !== undefined) {
      fields.push("id_produto = ?");
      values.push(data.id_produto);
    }
    if (data.quantidade !== undefined) {
      fields.push("quantidade = ?");
      values.push(data.quantidade);
    }
    if (data.preco_unitario !== undefined) {
      fields.push("preco_unitario = ?");
      values.push(data.preco_unitario);
    }
    if (data.tipo_porção !== undefined) {
      fields.push("tipo_porção = ?");
      values.push(data.tipo_porção);
    }
    if (data.status !== undefined) {
      fields.push("status = ?");
      values.push(data.status);
    }

    if (fields.length === 0) {
      throw new Error("Nenhum campo enviado para atualização");
    }

    const query = `UPDATE item_pedido SET ${fields.join(", ")} WHERE id_item = ?;`;
    values.push(id_item);

    const result = await db.run(query, ...values);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao atualizar item de pedido: " + error.message);
  }
}

// Deletar item de pedido
export async function remove(id_item) {
  try {
    const db = await connectDB();
    const query = "DELETE FROM item_pedido WHERE id_item = ?;";
    const result = await db.run(query, id_item);
    if (result.changes === 0) {
      throw new Error("Item de pedido não encontrado");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao deletar item de pedido: " + error.message);
  }
}
