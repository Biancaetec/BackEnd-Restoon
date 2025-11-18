import connectDB from '../../db/connection.js';

/* ===========================================================
   Buscar pedido completo por ID
   (Pedido + itens)
=========================================================== */
export async function findById(id_pedido) {
  try {
    const db = await connectDB();

    // Buscar pedido
    const pedidoQuery = `
      SELECT 
        id_pedido, id_mesa, id_usuario, status, tipo_preparo,
        data_abertura, data_fechamento, valor_total, observacoes
      FROM pedido
      WHERE id_pedido = ?;
    `;
    const pedido = db.prepare(pedidoQuery).get(id_pedido);

    if (!pedido) return null;

    // Buscar itens
    const itensQuery = `
      SELECT 
        id_item, id_produto, quantidade, preco_unitario,
        tipo_porção, status
      FROM item_pedido
      WHERE id_pedido = ?;
    `;
    const itens = db.prepare(itensQuery).all(id_pedido);

    return {
      ...pedido,
      itens
    };

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar pedido completo: " + error.message);
  }
}

/* ===========================================================
   Criar pedido + itens (transação)
=========================================================== */
export async function createPedidoCompleto(data) {
  try {
    const db = await connectDB();

    db.exec("BEGIN TRANSACTION;");

    // Criar pedido
    const insertPedido = db.prepare(`
      INSERT INTO pedido (
        id_mesa, id_usuario, status, tipo_preparo,
        data_abertura, data_fechamento, valor_total, observacoes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `);

    const resultPedido = insertPedido.run(
      data.id_mesa,
      data.id_usuario,
      data.status,
      data.tipo_preparo ?? null,
      new Date().toISOString(),
      null,
      data.valor_total,
      data.observacoes ?? null
    );

    const id_pedido = resultPedido.lastInsertRowid;

    // Criar itens
    const insertItem = db.prepare(`
      INSERT INTO item_pedido (
        id_pedido, id_produto, quantidade,
        preco_unitario, tipo_porção, status
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `);

    data.itens.forEach(item => {
      insertItem.run(
        id_pedido,
        item.id_produto,
        item.quantidade,
        item.preco_unitario,
        item.tipo_porção,
        item.status
      );
    });

    db.exec("COMMIT;");

    // Retornar pedido completo criado
    return findById(id_pedido);

  } catch (error) {
    console.error(error);
    db.exec("ROLLBACK;");
    throw new Error("Erro ao criar pedido completo: " + error.message);
  }
}

/* ===========================================================
   Remover pedido completo
   (Pedido + Itens)
=========================================================== */
export async function removePedidoCompleto(id_pedido) {
  try {
    const db = await connectDB();

    db.exec("BEGIN TRANSACTION;");

    // Remover itens
    const deleteItensQuery = "DELETE FROM item_pedido WHERE id_pedido = ?;";
    db.prepare(deleteItensQuery).run(id_pedido);

    // Remover pedido
    const deletePedidoQuery = "DELETE FROM pedido WHERE id_pedido = ?;";
    const result = db.prepare(deletePedidoQuery).run(id_pedido);

    if (result.changes === 0) {
      db.exec("ROLLBACK;");
      throw new Error("Pedido não encontrado");
    }

    db.exec("COMMIT;");

    return { sucesso: true };

  } catch (error) {
    console.error(error);
    db.exec("ROLLBACK;");
    throw new Error("Erro ao deletar pedido completo: " + error.message);
  }
}
