import { z } from "zod";

const ItensPedidoSchema = z.object({
  pedido_id: z.number().int().positive(),
  produto_id: z.number().int().positive(),
  quantidade: z.number().int().positive(),
  subtotal: z.number().positive(),
});

const ItensPedidoController = {
 
  async createItensPedido(req, res) {
    try {
      const { pedido_id, produto_id, quantidade, subtotal } = req.body;
      ItensPedidoSchema.parse({ pedido_id, produto_id, quantidade, subtotal });

     
      res.status(201).json({ message: "Item do pedido criado com sucesso" });
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
      res.status(500).send({ message: error.message });
    }
  },

  
  async updateItensPedido(req, res) {
    try {
      const { id } = req.params;
      const { produto_id, quantidade, subtotal } = req.body;

  
      const updateSchema = z.object({
        produto_id: z.number().int().positive().optional(),
        quantidade: z.number().int().positive().optional(),
        subtotal: z.number().positive().optional(),
      });

      updateSchema.parse({ produto_id, quantidade, subtotal });

    
      res.status(200).json({ message: `Item do pedido ${id} atualizado com sucesso` });
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
      res.status(500).send({ message: error.message });
    }
  },
};

export default ItensPedidoController;
