import { z } from "zod";

const PedidoPagamentoSchema = z.object({
  id_pagamento_pedido: z.number().int().positive().optional(),
  id_pedido: z.number().int().positive(),
  id_pagamento: z.number().int().positive(),
  valor_pago: z.number().positive(),
});

const PedidoPagamentoController = {
  async create(req, res) {
    try {
      PedidoPagamentoSchema.parse(req.body);
      res.status(201).json({ message: "Pagamento de pedido criado com sucesso" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
        });
      }
      res.status(500).send({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id_pagamento_pedido } = req.params;
      PedidoPagamentoSchema.partial().parse(req.body);
      res.status(200).json({ message: `Pagamento de pedido ${id_pagamento_pedido} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const data = [
        {
          id_pagamento_pedido: 1,
          id_pedido: 1,
          id_pagamento: 2,
          valor_pago: 65.5,
        },
        {
          id_pagamento_pedido: 2,
          id_pedido: 2,
          id_pagamento: 1,
          valor_pago: 40.0,
        },
      ];
      res.status(200).json({ data, message: "Pagamentos de pedido listados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default PedidoPagamentoController;
