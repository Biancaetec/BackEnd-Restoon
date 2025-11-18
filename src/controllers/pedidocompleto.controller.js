import db from "../../db/connection.js";
import { z } from "zod";

// Schema para validar o pedido completo
const pedidoCompletoSchema = z.object({
  id_mesa: z.number().int().positive(),
  id_usuario: z.number().int().positive(),
  observacoes: z.string().max(500).optional().nullable(),
  valor_total: z.number().positive(),
  status: z.enum(["pendente", "em_andamento", "entregue", "cancelado"]).default("pendente"),
  tipo_preparo: z.enum(["normal", "diferenciado"]).optional().nullable(),

  itens: z.array(
    z.object({
      id_produto: z.number().int().positive(),
      quantidade: z.number().int().positive(),
      preco_unitario: z.number().positive(),
      tipo_porção: z.enum(["inteira", "meia"]).default("inteira"),
      status: z.enum(["aguardando", "em_preparo", "pronto"]).default("aguardando"),
    })
  ).min(1),
});

export const criarPedidoCompleto = (req, res) => {
  try {
    // 🔎 Validar entrada
    const pedidoData = pedidoCompletoSchema.parse(req.body);

    // 🧨 Iniciar transação
    db.exec("BEGIN TRANSACTION;");

    // -------------------------
    // 1️⃣ Inserir pedido
    // -------------------------
    const insertPedido = db.prepare(`
      INSERT INTO pedido (
        id_mesa, id_usuario, status, tipo_preparo,
        data_abertura, data_fechamento, valor_total, observacoes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `);

    const resultPedido = insertPedido.run(
      pedidoData.id_mesa,
      pedidoData.id_usuario,
      pedidoData.status,
      pedidoData.tipo_preparo ?? null,
      new Date().toISOString(),
      null,
      pedidoData.valor_total,
      pedidoData.observacoes ?? null
    );

    const id_pedido = resultPedido.lastInsertRowid;

    // -------------------------
    // 2️⃣ Inserir cada item
    // -------------------------
    const insertItem = db.prepare(`
      INSERT INTO item_pedido (
        id_pedido, id_produto, quantidade,
        preco_unitario, tipo_porção, status
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `);

    pedidoData.itens.forEach(item => {
      insertItem.run(
        id_pedido,
        item.id_produto,
        item.quantidade,
        item.preco_unitario,
        item.tipo_porção,
        item.status
      );
    });

    // -------------------------
    // 3️⃣ Commit
    // -------------------------
    db.exec("COMMIT;");

    return res.status(201).json({
      message: "Pedido completo criado com sucesso",
      id_pedido,
    });

  } catch (error) {
    console.error(error);
    db.exec("ROLLBACK;");

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({
          atributo: e.path.join("."),
          mensagem: e.message,
        })),
      });
    }

    return res.status(500).json({
      message: "Erro interno ao criar pedido completo",
      error: error.message,
    });
  }
};
