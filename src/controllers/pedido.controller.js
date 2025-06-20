import { z } from "zod";
import { findAll, create, update, remove } from "../models/pedidoModel.js";

// Schema de validação conforme seu último pedido
const pedidoSchema = z.object({
  id_pedido: z.number().int().positive().optional(),
  id_mesa: z.number().int().positive(),
  id_usuario: z.number().int().positive(),
  status: z.enum(["pendente", "em_andamento", "entregue", "cancelado"]),
  tipo_preparo: z.enum(["normal", "diferenciado"]).optional(),
  data_abertura: z.string().datetime().optional(),
  data_fechamento: z.string().datetime().optional(),
  valor_total: z.number().positive(),
  observacoes: z.string().max(500).optional(),
});

// Listar todos os pedidos
export const getPedidos = async (req, res) => {
  try {
    const pedidos = await findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar pedidos" });
  }
};

// Criar um novo pedido
export const createPedido = async (req, res) => {
  try {
    const pedidoData = pedidoSchema.parse(req.body);
    await create(pedidoData);
    res.status(201).json({ message: "Pedido criado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({
          atributo: e.path[0],
          mensagem: e.message,
        })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar pedido" });
  }
};

// Atualizar um pedido existente
export const updatePedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    // Permite atualizar parcialmente os campos
    const pedidoData = pedidoSchema.partial().parse(req.body);
    await update(id_pedido, pedidoData);
    res.status(200).json({ message: `Pedido ${id_pedido} atualizado com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({
          atributo: e.path[0],
          mensagem: e.message,
        })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar pedido" });
  }
};

// Deletar um pedido
export const deletePedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    await remove(id_pedido);
    res.status(200).json({ message: `Pedido ${id_pedido} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar pedido" });
  }
};
