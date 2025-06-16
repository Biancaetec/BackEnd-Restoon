// import { z } from "zod";

// const RestauranteSchema = z.object({
//   id_restaurante: z.number().int().positive(),
//   nome: z.string().min(1, "O nome é obrigatório"),
//   email: z.string().email("Email inválido"),
//   senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
//   criado_em: z.string().datetime("Data inválida"),
//   status_licenciamento: z.enum(["ativo", "expirado", "pendente"], {
//     required_error: "O status é obrigatório",
//     invalid_type_error: "Status inválido",
//   }),
// });

// const RestauranteController = {
//   async createRestaurante(req, res) {
//     try {
//       const { id_restaurante, nome, email, senha, criado_em, status_licenciamento } = req.body;
//       RestauranteSchema.parse({ id_restaurante, nome, email, senha, criado_em, status_licenciamento });
//       res.status(201).json({ message: "Restaurante criado com sucesso" });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         return res.status(400).json({
//           message: "Erro de validação",
//           errors: error.errors.map((err) => ({
//             atributo: err.path[0],
//             mensagem: err.message,
//           })),
//         });
//       }
//       res.status(500).send({ message: error.message });
//     }
//   },

//   async updateRestaurante(req, res) {
//     try {
//       const { id } = req.params;
//       const { nome, email, senha, criado_em, status_licenciamento } = req.body;
//       // Aqui você poderia validar novamente se quiser, com RestauranteSchema.partial().parse({ ... })
//       res.status(200).json({ message: `Restaurante ${id} atualizado com sucesso` });
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
//   },

//   async getRestaurantes(req, res) {
//     try {
//       const data = [
//         {
//           id_restaurante: 1,
//           nome: "Mazegohan Sushi",
//           email: "contato@mazegohan.com",
//           senha: "segura123",
//           criado_em: new Date().toISOString(),
//           status_licenciamento: "ativo",
//         },
//         {
//           id_restaurante: 2,
//           nome: "Petiscaria Banzai",
//           email: "banzai@email.com",
//           senha: "banzaiseguro",
//           criado_em: new Date().toISOString(),
//           status_licenciamento: "pendente",
//         },
//       ];
//       res.status(200).json({ data, message: "Restaurantes carregados com sucesso" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },
// };

// export default RestauranteController;

import { z } from "zod";
import {
  findAll,
  create,
  update,
  remove,
  updateStatusLicenciamento,
} from "../models/restauranteModel.js";

// Validação do restaurante completo
const restauranteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  criado_em: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" })
    .transform((val) => new Date(val).toISOString()),
  status_licenciamento: z.enum(["pendente", "aprovado", "rejeitado"]),
});

// Validação específica para atualizar status
const statusSchema = z.object({
  status_licenciamento: z.enum(["pendente", "aprovado", "rejeitado"]),
});

export const getRestaurantes = async (req, res) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar restaurantes" });
  }
};

export const createRestaurante = async (req, res) => {
  try {
    const restauranteData = restauranteSchema.parse(req.body);
    const novoRestaurante = await create(restauranteData);
    res.status(201).json({
      message: "Restaurante criado com sucesso",
      restaurante: novoRestaurante,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((err) => ({
          atributo: err.path[0],
          mensagem: err.message,
        })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao criar restaurante" });
  }
};

export const updateRestaurante = async (req, res) => {
  try {
    const { id } = req.params;
    const restauranteData = restauranteSchema.parse(req.body);
    const result = await update(id, restauranteData);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }
    res.status(200).json({ message: "Restaurante atualizado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((err) => ({
          atributo: err.path[0],
          mensagem: err.message,
        })),
      });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno ao atualizar restaurante" });
  }
};

export const deleteRestaurante = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }
    res.status(200).json({ message: "Restaurante deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar restaurante" });
  }
};

export const updateRestauranteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_licenciamento } = statusSchema.parse(req.body);
    const result = await updateStatusLicenciamento(id, status_licenciamento);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Restaurante não encontrado" });
    }
    res
      .status(200)
      .json({ message: "Status de licenciamento atualizado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((err) => ({
          atributo: err.path[0],
          mensagem: err.message,
        })),
      });
    }
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar status de licenciamento" });
  }
};
