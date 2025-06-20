import { z } from "zod";
import { create, findAll, update, remove } from "../models/pedidopagamentoModel.js";

const PedidoPagamentoSchema = z.object({
  id_pagamento_pedido: z.number().int().positive().optional(),
  id_pedido: z.number().int().positive(),
  id_pagamento: z.number().int().positive(),
  valor_pago: z.number().positive(),
});

export const createPedidoPagamento = async (req, res) => {
  try {
    const data = PedidoPagamentoSchema.parse(req.body);
    await create(data);
    res.status(201).json({ message: "Pagamento de pedido criado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar pagamento de pedido" });
  }
};

export const getPedidoPagamentos = async (req, res) => {
  try {
    const data = await findAll();
    res.status(200).json({ data, message: "Pagamentos de pedido listados com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar pagamentos de pedido" });
  }
};

export const updatePedidoPagamento = async (req, res) => {
  try {
    const { id_pagamento_pedido } = req.params;
    const data = PedidoPagamentoSchema.partial().parse(req.body);
    await update(id_pagamento_pedido, data);
    res.status(200).json({ message: `Pagamento de pedido ${id_pagamento_pedido} atualizado com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar pagamento de pedido" });
  }
};

export const deletePedidoPagamento = async (req, res) => {
  try {
    const { id_pagamento_pedido } = req.params;
    await remove(id_pagamento_pedido);
    res.status(200).json({ message: `Pagamento de pedido ${id_pagamento_pedido} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar pagamento de pedido" });
  }
};
