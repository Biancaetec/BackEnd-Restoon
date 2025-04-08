import { z } from "zod";
const CarrinhoSchema = z.object({
  cliente_id: z.number().int().positive("O ID do cliente deve ser um número positivo."),
  produto_id: z.number().int().positive("O ID do produto deve ser um número positivo."),
  quantidade: z.number().int().positive("A quantidade deve ser um número inteiro positivo."),
  subtotal: z.number().positive("O subtotal deve ser um valor positivo."),
  created_at: z.string().datetime("Data inválida."),
});
const CarrinhoController = {
  async createCarrinho(req, res) {
    try {
      const { cliente_id, produto_id, quantidade, subtotal, created_at } = req.body;
      CarrinhoSchema.parse({ cliente_id, produto_id, quantidade, subtotal, created_at });
      res.status(201).json({ message: "Item adicionado ao carrinho com sucesso" });
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
  async updateCarrinho(req, res) {
    try {
      const { id } = req.params;
      const { quantidade, subtotal } = req.body;
      const updateSchema = z.object({
        quantidade: z.number().int().positive().optional(),
        subtotal: z.number().positive().optional(),
      });
      updateSchema.parse({ quantidade, subtotal });
      res.status(200).json({ message: `Item ${id} atualizado com sucesso` });
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

export default CarrinhoController;
