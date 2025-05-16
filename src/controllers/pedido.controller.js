import { z } from "zod";

const PedidoSchema = z.object({
  id_pedido: z.number().int().positive().optional(),
  id_usuario: z.number().int().positive(),
  data_pedido: z.string().datetime(),
  status: z.enum(["pendente", "em_andamento", "entregue", "cancelado"]),
  total: z.number().nonnegative(),
});

const PedidoController = {
  async create(req, res) {
    try {
      PedidoSchema.parse(req.body);
      res.status(201).json({ message: "Pedido criado com sucesso" });
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
      const { id_pedido } = req.params;
      PedidoSchema.partial().parse(req.body);
      res.status(200).json({ message: `Pedido ${id_pedido} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const data = [
        {
          id_pedido: 1,
          id_usuario: 1,
          data_pedido: new Date().toISOString(),
          status: "pendente",
          total: 40.0,
        },
        {
          id_pedido: 2,
          id_usuario: 2,
          data_pedido: new Date().toISOString(),
          status: "entregue",
          total: 60.0,
        },
      ];
      res.status(200).json({ data, message: "Pedidos listados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default PedidoController;
