import { z } from "zod";
import { findAll, create, update, remove } from "../models/licenciamentoModel.js"; // ajuste o caminho conforme necessário

// Schema de validação
const licenciamentoSchema = z.object({
  id_licenciamento: z.number().int().positive().optional(),
  id_restaurante: z.number().int().positive(),
  data_inicio: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Data inválida" }),
  data_fim: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Data inválida" }),
  status: z.enum(["ativo", "expirado", "pendente"]),
  valor: z.number().nonnegative(),
  tipo: z.enum(["gratuito", "mensal", "anual"]),
});

// Listar todos os licenciamentos
export const getLicenciamentos = async (req, res) => {
  try {
    const licenciamentos = await findAll();
    res.status(200).json(licenciamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao listar licenciamentos" });
  }
};

// Criar novo licenciamento
export const createLicenciamento = async (req, res) => {
  try {
    const licenciamentoData = licenciamentoSchema.parse(req.body);
    await create(licenciamentoData);
    res.status(201).json({ message: "Licenciamento criado com sucesso" });
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
    res.status(500).json({ message: "Erro interno ao criar licenciamento" });
  }
};

// Atualizar licenciamento existente
export const updateLicenciamento = async (req, res) => {
  try {
    const { id_licenciamento } = req.params;
    const licenciamentoData = licenciamentoSchema.partial().parse(req.body);
    await update(id_licenciamento, licenciamentoData);
    res.status(200).json({ message: `Licenciamento ${id_licenciamento} atualizado com sucesso` });
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
    res.status(500).json({ message: "Erro interno ao atualizar licenciamento" });
  }
};

// Deletar licenciamento
export const deleteLicenciamento = async (req, res) => {
  try {
    const { id_licenciamento } = req.params;
    await remove(id_licenciamento);
    res.status(200).json({ message: `Licenciamento ${id_licenciamento} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno ao deletar licenciamento" });
  }
};
