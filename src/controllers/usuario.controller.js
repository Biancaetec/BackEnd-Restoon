// import { z } from "zod";

// const UsuarioSchema = z.object({
//   id_usuario: z.number().int().positive().optional(),
//   nome: z.string(),
//   email: z.string().email(),
//   senha: z.string(),
//   funcao: z.string(),
//   id_restaurante: z.number().int().positive(),
//   ativo: z.boolean(),
// });

// const UsuarioController = {
//   async create(req, res) {
//     try {
//       UsuarioSchema.parse(req.body);
//       res.status(201).json({ message: "Usuário criado com sucesso" });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         return res.status(400).json({
//           message: "Erro de validação",
//           errors: error.errors.map(e => ({ atributo: e.path[0], mensagem: e.message })),
//         });
//       }
//       res.status(500).send({ message: error.message });
//     }
//   },
//   async update(req, res) {
//     try {
//       const { id_usuario } = req.params;
//       UsuarioSchema.partial().parse(req.body);
//       res.status(200).json({ message: `Usuário ${id_usuario} atualizado com sucesso` });
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
//   },
//   async get(req, res) {
//     try {
//       const data = [
//         {
//           id_usuario: 1,
//           nome: "João",
//           email: "joao@email.com",
//           senha: "senha123",
//           funcao: "admin",
//           id_restaurante: 1,
//           ativo: true,
//         },
//         {
//           id_usuario: 2,
//           nome: "Maria",
//           email: "maria@email.com",
//           senha: "senha123",
//           funcao: "garçom",
//           id_restaurante: 2,
//           ativo: true,
//         },
//       ];
//       res.status(200).json({ data, message: "Usuários listados com sucesso" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },
// };

// export default UsuarioController;

import { z } from "zod";
import { findAll, create, remove, update, updateFuncao } from "../models/usuario.model.js";

// Schema principal de usuário (POST e PUT)
const usuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().optional(),
  funcao: z.enum(["garçom", "admin"], {
    errorMap: () => ({ message: "Função inválida" }),
  }),
  id_restaurante: z.number().int().positive("ID do restaurante deve ser positivo"),
  ativo: z.boolean(),
});

// Schema somente para atualização de função (PATCH)
const funcaoSchema = z.object({
  funcao: z.enum(["garçom", "admin"], {
    errorMap: () => ({ message: "Função inválida" }),
  }),
});

// GET - Buscar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const usuarios = await findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao buscar usuários" });
  }
};

// POST - Criar novo usuário
export const createUser = async (req, res) => {
  try {
    const userData = usuarioSchema.parse(req.body);
    const result = await create(userData);
    res.status(201).json({
      message: "Usuário criado com sucesso",
      userId: result.lastInsertRowid ?? result.lastID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => ({
        atributo: e.path[0],
        mensagem: e.message,
      }));
      return res.status(400).json({ message: "Erro de validação", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor - Controller" });
  }
};

// DELETE - Deletar usuário
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor - Controller" });
  }
};

// PUT - Atualizar usuário (parcial)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateSchema = usuarioSchema.partial();
    const usuarioData = updateSchema.parse(req.body);

    const result = await update(id, usuarioData);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => ({
        atributo: e.path[0],
        mensagem: e.message,
      }));
      return res.status(400).json({ message: "Erro de validação", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor - Controller" });
  }
};

// PATCH - Atualizar função do usuário
export const updateUserFuncao = async (req, res) => {
  try {
    const { id } = req.params;
    const { funcao } = funcaoSchema.parse(req.body);

    const result = await updateFuncao(id, funcao);
    if (result.changes === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Função do usuário atualizada com sucesso" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => ({
        atributo: e.path[0],
        mensagem: e.message,
      }));
      return res.status(400).json({ message: "Erro de validação", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor - Controller" });
  }
};
