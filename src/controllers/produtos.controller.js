import { z } from "zod";

// Esquema de Produtos com Zod
const ProdutosSchema = z.object({
  nome: z.string(), 
  descricao: z.string(), 
  preco: z.number().positive(),
  categoria_id: z.number().int().positive(),
  mercado_id: z.string().uuid(), 
  status: z.string().optional(), 
  created_at: z.string().datetime().optional(), 
});

const ProdutosController = {
  // Criar Produtos
  async createProdutos(req, res) {
    try {
      const { nome, descricao, preco, categoria_id, mercado_id, status, created_at } = req.body;
      ProdutosSchema.parse({ nome, descricao, preco, categoria_id, mercado_id, status, created_at });

      // Simulando a criação de um Produtos
      res.status(201).json({ message: "Produtos criado com sucesso" });
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

  // Atualizar Produtos
  async updateProdutos(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, categoria_id, mercado_id, status, created_at } = req.body;

      // Simulando a atualização de um Produtos
      res.status(200).json({ message: `Produtos ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default ProdutosController;
