import { z } from "zod";
import {
  createPedidoCompleto,
  findById,
  removePedidoCompleto
} from "../models/pedidocompletoModel.js";

// -----------------------------
// ZOD para validar entrada
// -----------------------------
const pedidoCompletoSchema = z.object({
  id_mesa: z.number().int().positive(),
  id_usuario: z.number().int().positive(),
  observacoes: z.string().max(500).optional().nullable(),
  valor_total: z.number().positive(),
  status: z.enum(["pendente", "em_andamento", "entregue", "cancelado"]),
  tipo_preparo: z.enum(["normal", "diferenciado"]).optional().nullable(),

  itens: z.array(
    z.object({
      id_produto: z.number().int().positive(),
      quantidade: z.number().int().positive(),
      preco_unitario: z.number().positive(),
      tipo_porção: z.enum(["inteira", "meia"]),
      status: z.enum(["aguardando", "em_preparo", "pronto"]),
    })
  ).min(1, "O pedido deve conter ao menos 1 item."),
});


// =======================================================
// Criar pedido completo
// =======================================================
export const criarPedidoCompleto = async (req, res) => {
  try {
    const pedidoData = pedidoCompletoSchema.parse(req.body);

    const pedidoCriado = await createPedidoCompleto(pedidoData);

    return res.status(201).json({
      message: "Pedido completo criado com sucesso",
      pedido: pedidoCriado
    });

  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({
          atributo: e.path.join("."),
          mensagem: e.message
        }))
      });
    }

    return res.status(500).json({
      message: "Erro interno ao criar pedido completo",
      error: error.message
    });
  }
};


// =======================================================
// Buscar pedido completo por ID
// =======================================================
export const getPedidoCompleto = async (req, res) => {
  try {
    const { id_pedido } = req.params;

    const pedido = await findById(id_pedido);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    return res.status(200).json(pedido);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao buscar pedido completo",
      error: error.message
    });
  }
};


// =======================================================
// Deletar pedido completo (pedido + itens)
// =======================================================
export const deletePedidoCompleto = async (req, res) => {
  try {
    const { id_pedido } = req.params;

    await removePedidoCompleto(id_pedido);

    return res.status(200).json({
      message: `Pedido completo ${id_pedido} deletado com sucesso`
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno ao deletar pedido completo",
      error: error.message
    });
  }
};
