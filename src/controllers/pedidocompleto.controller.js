import { z } from "zod";
import {
  createPedidoCompleto,
  findById,
  removePedidoCompleto,
  findByRestaurante,
  updateStatusPedido,
  removePedidosPorMesa,
  updateStatusItemPedido,
  findFilaByCategoria,
  findItensFinalizados
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

// =======================================================
// Listar todos os pedidos completos de um restaurante
// =======================================================
export const listarPedidosCompleto = async (req, res) => {
  try {
    const { id_restaurante } = req.query;

    if (!id_restaurante) {
      return res.status(400).json({
        message: "id_restaurante é obrigatório na query"
      });
    }

    const pedidos = await findByRestaurante(id_restaurante);

    return res.status(200).json(pedidos);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro interno ao listar pedidos",
      error: error.message
    });
  }
};
// =======================================================
// Atualizar apenas o status do pedido
// =======================================================
export const atualizarStatusPedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const { status } = req.body;

    // Validar status com zod
    const statusSchema = z.enum(["pendente", "em_preparo", "entregue", "fechado"]);
    const novoStatus = statusSchema.parse(status);

    const pedidoAtualizado = await updateStatusPedido(id_pedido, novoStatus);

    return res.status(200).json({
      message: "Status do pedido atualizado com sucesso",
      pedido: pedidoAtualizado
    });

  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Erro interno ao atualizar status",
      error: error.message
    });
  }
};
// =======================================================
// Limpar todos os pedidos de uma mesa
// =======================================================
export const limparPedidosMesa = async (req, res) => {
  try {
    const { id_mesa } = req.params;

    if (!id_mesa) {
      return res.status(400).json({ message: "id_mesa é obrigatório" });
    }

    await removePedidosPorMesa(id_mesa);

    return res.status(200).json({
      message: `Todos os pedidos da mesa ${id_mesa} foram removidos`
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro interno ao limpar pedidos da mesa",
      error: error.message
    });
  }
};

export const getFilaPreparoPorCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;

    if (!id_categoria) {
      return res.status(400).json({ message: "id_categoria é obrigatório" });
    }

    const itens = findFilaByCategoria(id_categoria);

    return res.status(200).json(itens);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro ao buscar fila de preparo",
      error: error.message
    });
  }
};

// =======================================================
// Atualizar status de UM item do pedido
// =======================================================
export const atualizarStatusItemPedido = async (req, res) => {
  try {
    const { id_item } = req.params;
    const { status } = req.body;

    const statusSchema = z.enum(["aguardando", "em_preparo", "pronto", "entregue"]);
    const novoStatus = statusSchema.parse(status);

    const item = await updateStatusItemPedido(id_item, novoStatus);

    return res.status(200).json({
      message: "Status do item atualizado com sucesso",
      item
    });

  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors
      });
    }

    return res.status(500).json({
      message: "Erro interno ao atualizar status do item",
      error: error.message
    });
  }
};

// =======================================================
// Listar itens finalizados
// =======================================================
export const getItensFinalizados = async (req, res) => {
  try {
    const itens = await findItensFinalizados(); // pega todos os itens com status finalizado

    return res.status(200).json(itens);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro interno ao buscar itens finalizados",
      error: error.message
    });
  }
};
