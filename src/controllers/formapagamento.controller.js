//import { z } from "zod";

//const FormaPagamentoSchema = z.object({
//  id_pagamento: z.number().int().positive().optional(),
//  descricao: z.string(),
//  id_restaurante: z.number().int().positive(),
//  ativo: z.boolean(),
//});

//const FormaPagamentoController = {
//  async create(req, res) {
//    try {
//      FormaPagamentoSchema.parse(req.body);
//      res.status(201).json({ message: "Forma de pagamento criada com sucesso" });
//    } catch (error) {
//      if (error instanceof z.ZodError) {
//        return res.status(400).json({
//          message: "Erro de validação",
//         errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
//        });
//      }
//      res.status(500).send({ message: error.message });
//    }
//  },
//
//  async update(req, res) {
//    try {
//      const { id_pagamento } = req.params;
//      FormaPagamentoSchema.partial().parse(req.body);
//      res.status(200).json({ message: `Forma de pagamento ${id_pagamento} atualizada com sucesso` });
//    } catch (error) {
//      res.status(500).send({ message: error.message });
//    }
//  },
//
//  async get(req, res) {
//    try {
//      const data = [
//        {
//          id_pagamento: 1,
//          descricao: "Cartão de Crédito",
//          id_restaurante: 1,
//          ativo: true,
//        },
//        {
//          id_pagamento: 2,
//          descricao: "Dinheiro",
//          id_restaurante: 1,
//          ativo: true,
//       },
//      ];
//      res.status(200).json({ data, message: "Formas de pagamento listadas com sucesso" });
//    } catch (error) {
//      res.status(500).json({ message: error.message });
//    }
//  },
//};

//export default FormaPagamentoController;
// src/controllers/formapagamento.controller.js

// Exemplo simples, adapte a lógica conforme seu banco ou regras

import { z } from "zod";
import { findAll, create, update, remove } from "../models/formapagamentoModel.js";

// Schema de validação Zod
const FormaPagamentoSchema = z.object({
  id_pagamento: z.number().int().positive().optional(),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  id_restaurante: z.number().int().positive({ message: "ID do restaurante deve ser positivo" }),
  ativo: z.boolean()
});

// GET - Buscar todas as formas de pagamento
export const getFormasPagamento = async (req, res) => {
  try {
    const formasPagamento = await findAll();
    res.status(200).json(formasPagamento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar formas de pagamento" });
  }
};

// POST - Criar nova forma de pagamento
export const createFormaPagamento = async (req, res) => {
  try {
    const data = FormaPagamentoSchema.parse(req.body);
    await create(data);
    res.status(201).json({ message: "Forma de pagamento criada com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message }))
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao criar forma de pagamento" });
  }
};

// PUT - Atualizar forma de pagamento
export const updateFormaPagamento = async (req, res) => {
  try {
    const { id_pagamento } = req.params;
    const data = FormaPagamentoSchema.partial().parse(req.body);
    await update(id_pagamento, data);
    res.status(200).json({ message: `Forma de pagamento ${id_pagamento} atualizada com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message }))
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar forma de pagamento" });
  }
};

// DELETE - Remover forma de pagamento
export const deleteFormaPagamento = async (req, res) => {
  try {
    const { id_pagamento } = req.params;
    await remove(id_pagamento);
    res.status(200).json({ message: `Forma de pagamento ${id_pagamento} deletada com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar forma de pagamento" });
  }
};
