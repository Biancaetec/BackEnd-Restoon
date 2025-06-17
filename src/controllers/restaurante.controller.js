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
//       res.status(200).json({ message: Restaurante ${id} atualizado com sucesso });
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

import {
    findAll,
    create,
    remove,
    update,
    updateStatus, // nome ajustado para bater com o model
} from "../models/restauranteModel.js";
import { z } from "zod";

// Schema completo de restaurante
const restauranteSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(1, "Senha é obrigatória"),
    criado_em: z.string().optional(),
    status_licenciamento: z.enum(["ativo", "expirado", "pendente"]).optional(),
    id_usuario: z.number().int().positive().optional(),
});

// Apenas para atualização do status de licenciamento
const statusSchema = z.object({
    status_licenciamento: z.enum(["ativo", "expirado", "pendente"]),
});

// Validador de ID (parâmetro de rota)
const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID inválido"),
});

// Buscar todos os restaurantes
export const getRestaurantes = async (req, res) => {
    try {
        const restaurantes = await findAll();
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar restaurantes" });
    }
};

// Criar novo restaurante
export const createRestaurante = async (req, res) => {
    try {
        const data = restauranteSchema.parse(req.body);
        const result = await create(data);
        res.status(201).json({
            message: "Restaurante criado com sucesso",
            restauranteId: result.lastInsertRowid,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Erro ao criar restaurante",
            error: error.errors ?? error.message,
        });
    }
};

// Deletar restaurante
export const deleteRestaurante = async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const result = await remove(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }
        res.status(200).json({ message: "Restaurante deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro ao deletar restaurante", error: error.errors ?? error.message });
    }
};

// Atualizar dados do restaurante
export const updateRestaurante = async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const data = restauranteSchema.parse(req.body);
        const result = await update(id, data);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }
        res.status(200).json({ message: "Restaurante atualizado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro ao atualizar restaurante", error: error.errors ?? error.message });
    }
};

// Atualizar apenas o status de licenciamento
export const updateRestauranteStatus = async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const { status_licenciamento } = statusSchema.parse(req.body);
        const result = await updateStatus(id, status_licenciamento);
        if (result.changes === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }
        res.status(200).json({ message: "Status de licenciamento atualizado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro ao atualizar status", error: error.errors ?? error.message });
    }
};
