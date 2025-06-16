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
import { z } from "zod";

// Schema de validação
const formaPagamentoSchema = z.object({
  id_pagamento: z.number().int().positive().optional(),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  id_restaurante: z.number().int().positive(),
  ativo: z.boolean(),
});

// Listar formas de pagamento
export const getFormasPagamento = async (req, res) => {
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
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar formas de pagamento" });
  }
};

// Criar nova forma de pagamento
export const createFormaPagamento = async (req, res) => {
  try {
    const formaData = formaPagamentoSchema.parse(req.body);

    // Simulação de criação (trocar por model real depois)
    // const result = await createFormaPagamentoNoBanco(formaData);

    res.status(201).json({ message: "Forma de pagamento criada com sucesso", forma: formaData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar forma de pagamento" });
  }
};

// Atualizar forma de pagamento
export const updateFormaPagamento = async (req, res) => {
  try {
    const { id_pagamento } = req.params;
    const formaData = formaPagamentoSchema.partial().parse(req.body);

    // Simulação de atualização (trocar por model real depois)
    // const result = await updateFormaPagamentoNoBanco(id_pagamento, formaData);

    res.status(200).json({ message: `Forma de pagamento ${id_pagamento} atualizada com sucesso` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar forma de pagamento" });
  }
};

// Deletar forma de pagamento (opcional, incluído para seguir padrão)
export const deleteFormaPagamento = async (req, res) => {
  try {
    const { id_pagamento } = req.params;

    // Simulação de exclusão (trocar por model real depois)
    // const result = await deleteFormaPagamentoDoBanco(id_pagamento);

    // if (result.changes === 0) {
    //   return res.status(404).json({ message: "Forma de pagamento não encontrada" });
    // }

    res.status(200).json({ message: `Forma de pagamento ${id_pagamento} deletada com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar forma de pagamento" });
  }
};
