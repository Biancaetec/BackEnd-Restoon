import { z } from "zod";

const ItemPedidoSchema = z.object({
  id_item: z.number().int().positive().optional(),
  id_pedido: z.number().int().positive(),
  id_produto: z.number().int().positive(),
  quantidade: z.number().int().positive(),
  preco_unitario: z.number().positive(),
  status: z.enum(["aguardando", "em_preparo", "pronto"]),
});

const ItemPedidoController = {
  async create(req, res) {
    try {
      ItemPedidoSchema.parse(req.body);
      res.status(201).json({ message: "Item de pedido criado com sucesso" });
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
      const { id_item } = req.params;
      ItemPedidoSchema.partial().parse(req.body);
      res.status(200).json({ message: `Item de pedido ${id_item} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const data = [
        {
          id_item: 1,
          id_pedido: 1,
          id_produto: 5,
          quantidade: 2,
          preco_unitario: 25.5,
          status: "aguardando",
        },
        {
          id_item: 2,
          id_pedido: 1,
          id_produto: 3,
          quantidade: 1,
          preco_unitario: 40,
          status: "em_preparo",
        },
      ];
      res.status(200).json({ data, message: "Itens de pedido listados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ItemPedidoController;
