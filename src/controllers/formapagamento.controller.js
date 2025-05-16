import { z } from "zod";

const FormaPagamentoSchema = z.object({
  id_pagamento: z.number().int().positive().optional(),
  descricao: z.string(),
  id_restaurante: z.number().int().positive(),
  ativo: z.boolean(),
});

const FormaPagamentoController = {
  async create(req, res) {
    try {
      FormaPagamentoSchema.parse(req.body);
      res.status(201).json({ message: "Forma de pagamento criada com sucesso" });
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
      const { id_pagamento } = req.params;
      FormaPagamentoSchema.partial().parse(req.body);
      res.status(200).json({ message: `Forma de pagamento ${id_pagamento} atualizada com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const data = [
        {
          id_pagamento: 1,
          descricao: "Cartão de Crédito",
          id_restaurante: 1,
          ativo: true,
        },
        {
          id_pagamento: 2,
          descricao: "Dinheiro",
          id_restaurante: 1,
          ativo: true,
        },
      ];
      res.status(200).json({ data, message: "Formas de pagamento listadas com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default FormaPagamentoController;
