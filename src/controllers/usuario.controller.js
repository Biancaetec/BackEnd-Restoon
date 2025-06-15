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
import {create, findAll, remove, update} from "../models/usuario.model.js"; // Certifique-se que `findAll` existe no model

const UsuarioSchema = z.object({
  id_usuario: z.number().int().positive().optional(),
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  funcao: z.string(),
  id_restaurante: z.number().int().positive(),
  ativo: z.boolean(),
});

export const createUser = async (req, res) => {
  try {
    const validUser = UsuarioSchema.parse(req.body);
    const result = await create(validUser);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      userId: result.lastID ?? result.lastInsertRowid,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => ({
        atributo: e.path[0],
        mensagem: e.message,
      }));

      return res.status(400).json({
        message: "Erro de validação",
        errors,
      });
    }

    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const usuarios = await findAll(); // Supondo que findAll() retorna todos os usuários
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await remove(id);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor - Controller" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioData = req.body;

    // Validação básica (opcional, mas recomendado)
    if (
      !usuarioData.nome ||
      !usuarioData.email ||
      !usuarioData.senha ||
      !usuarioData.funcao ||
      usuarioData.id_restaurante === undefined ||
      usuarioData.ativo === undefined
    ) {
      return res.status(400).json({ message: "Dados incompletos para atualização" });
    }

    const result = await update(id, usuarioData);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor - Controller" });
  }
};
;