import { z } from "zod";

const LicenciamentoSchema = z.object({
  id_licenciamento: z.number().int().positive().optional(),
  id_restaurante: z.number().int().positive(),
  data_inicio: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Data inválida" }),
  data_fim: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Data inválida" }),
  status: z.enum(["ativo", "expirado", "pendente"]),
  valor: z.number().nonnegative(),
  tipo: z.enum(["gratuito", "mensal", "anual"]),
});

const LicenciamentoController = {
  async create(req, res) {
    try {
      LicenciamentoSchema.parse(req.body);
      res.status(201).json({ message: "Licenciamento criado com sucesso" });
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
      const { id_licenciamento } = req.params;
      LicenciamentoSchema.partial().parse(req.body);
      res.status(200).json({ message: `Licenciamento ${id_licenciamento} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  async get(req, res) {
    try {
      const data = [
        {
          id_licenciamento: 1,
          id_restaurante: 1,
          data_inicio: "2025-01-01",
          data_fim: "2025-12-31",
          status: "ativo",
          valor: 0,
          tipo: "gratuito",
        },
        {
          id_licenciamento: 2,
          id_restaurante: 2,
          data_inicio: "2025-02-01",
          data_fim: "2026-01-31",
          status: "pendente",
          valor: 500.0,
          tipo: "anual",
        },
      ];
      res.status(200).json({ data, message: "Licenciamentos listados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default LicenciamentoController;
