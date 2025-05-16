import { z } from "zod";

const MesaSchema = z.object({
  id_mesa: z.number().int().positive().optional(),
  numero: z.number().int().positive(),
  descricao: z.string(),
  id_restaurante: z.number().int().positive(),
  ocupada: z.boolean(),
});

const MesaController = {
  async create(req, res) {
    try {
      MesaSchema.parse(req.body);
      res.status(201).json({ message: "Mesa criada com sucesso" });
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
      const { id_mesa } = req.params;
      MesaSchema.partial().parse(req.body);
      res.status(200).json({ message: `Mesa ${id_mesa} atualizada com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const data = [
        {
          id_mesa: 1,
          numero: 1,
          descricao: "Mesa próxima à janela",
          id_restaurante: 1,
          ocupada: false,
        },
        {
          id_mesa: 2,
          numero: 2,
          descricao: "Mesa do canto",
          id_restaurante: 1,
          ocupada: true,
        },
      ];
      res.status(200).json({ data, message: "Mesas listadas com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default MesaController;
