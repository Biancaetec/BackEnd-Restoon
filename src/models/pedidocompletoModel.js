import db from '../../db/connection.js';

/* ===========================================================
   Buscar pedido completo por ID
=========================================================== */
export function findById(id_pedido) {
  try {
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

    return { ...pedido, itens };

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao buscar pedido completo: " + error.message);
  }
}

/* ===========================================================
   Criar pedido + itens (transação)
=========================================================== */
export function createPedidoCompleto(data) {
  try {
    db.exec("BEGIN TRANSACTION;");

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

    return findById(id_pedido);

  } catch (error) {
    console.error(error);
    db.exec("ROLLBACK;");
    throw new Error("Erro ao criar pedido completo: " + error.message);
  }
}

/* ===========================================================
   Remover pedido completo
=========================================================== */
export function removePedidoCompleto(id_pedido) {
  try {
    db.exec("BEGIN TRANSACTION;");

    db.prepare("DELETE FROM item_pedido WHERE id_pedido = ?;").run(id_pedido);

    const result = db.prepare("DELETE FROM pedido WHERE id_pedido = ?;").run(id_pedido);

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

/* ===========================================================
   Listar todos os pedidos completos de um restaurante
=========================================================== */
export function findByRestaurante(id_restaurante) {
  try {
    const pedidosQuery = `
      SELECT 
        p.id_pedido, p.id_mesa, p.id_usuario, p.status, p.tipo_preparo,
        p.data_abertura, p.data_fechamento, p.valor_total, p.observacoes
      FROM pedido p
      INNER JOIN mesa m ON m.id_mesa = p.id_mesa
      WHERE m.id_restaurante = ?
      ORDER BY p.data_abertura DESC;
    `;

    const pedidos = db.prepare(pedidosQuery).all(id_restaurante);

    const itensQuery = `
      SELECT 
        id_item, id_produto, quantidade, preco_unitario,
        tipo_porção, status
      FROM item_pedido
      WHERE id_pedido = ?;
    `;

    return pedidos.map(pedido => {
      const itens = db.prepare(itensQuery).all(pedido.id_pedido);
      return { ...pedido, itens };
    });

  } catch (error) {
    console.error(error);
    throw new Error("Erro ao listar pedidos completos: " + error.message);
  }
}
