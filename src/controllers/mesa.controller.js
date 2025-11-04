import { z } from "zod";
import { findAll, create, update, remove } from "../models/mesaModel.js";

// Schema de validação
const mesaSchema = z.object({
  id_mesa: z.number().int().positive().optional(),
  numero: z.number().int().positive("Número da mesa deve ser positivo"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  id_restaurante: z.number().int().positive("ID do restaurante inválido"),
  ocupada: z.boolean(),
});

// export const getMesas = async (req, res) => {
//   try {
//     const mesas = await findAll();
//     res.status(200).json(mesas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erro interno ao listar mesas" });
//   }
// };

export async function getMesas(req, res) {
  try {
    const { id_restaurante } = req.query;
    if (!id_restaurante) {
      return res.status(400).json({ error: "id_restaurante é obrigatório" });
    }

    const mesas = await findAll(id_restaurante);

    res.json(mesas);
  } catch (error) {
    console.error("Erro ao listar mesas:", error);
    res.status(500).json({ error: "Erro ao listar mesas" });
  }
}
export const createMesa = async (req, res) => {
  try {
    console.log("📋 Dados recebidos:", req.body);

    const mesaData = mesaSchema.parse(req.body);
    await create(mesaData);
    res.status(201).json({ message: "Mesa criada com sucesso" });
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
    res.status(500).json({ message: "Erro interno ao criar mesa" });
  }
};

export const updateMesa = async (req, res) => {
  try {
    const { id_mesa } = req.params;
    const mesaData = mesaSchema.partial().parse(req.body);
    await update(id_mesa, mesaData);
    res.status(200).json({ message: `Mesa ${id_mesa} atualizada com sucesso` });
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
    res.status(500).json({ message: "Erro interno ao atualizar mesa" });
  }
};

export const deleteMesa = async (req, res) => {
  try {
    const { id_mesa } = req.params;
    await remove(id_mesa);
    res.status(200).json({ message: `Mesa ${id_mesa} deletada com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar mesa" });
  }
};
