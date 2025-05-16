import { z } from "zod";

const ProdutoSchema = z.object({
  id_produto: z.number().int().positive().optional(),
  nome: z.string(),
  descricao: z.string(),
  preco: z.number().nonnegative(),
  tipo_preparo: z.string(),
  id_categoria: z.number().int().positive(),
  id_restaurante: z.number().int().positive(),
  ativo: z.boolean(),
});

const ProdutoController = {
  async create(req, res) {
    try {
      ProdutoSchema.parse(req.body);
      res.status(201).json({ message: "Produto criado com sucesso" });
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
      const { id_produto } = req.params;
      ProdutoSchema.partial().parse(req.body);
      res.status(200).json({ message: `Produto ${id_produto} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async get(req, res) {
    try {
      const data = [
        {
          id_produto: 1,
          nome: "Sushi de Salmão",
          descricao: "Sushi fresco de salmão",
          preco: 25.0,
          tipo_preparo: "cozinha",
          id_categoria: 1,
          id_restaurante: 1,
          ativo: true,
        },
        {
          id_produto: 2,
          nome: "Porção de Batata Frita",
          descricao: "Porção de batata frita crocante",
          preco: 15.0,
          tipo_preparo: "cozinha",
          id_categoria: 2,
          id_restaurante: 2,
          ativo: true,
        },
      ];
      res.status(200).json({ data, message: "Produtos listados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ProdutoController;
