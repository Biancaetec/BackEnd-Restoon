import { z } from "zod";


const CategoriasSchema = z.object({
  nome: z.string().min(3, "O nome da categoria deve ter pelo menos 3 caracteres."),
  created_at: z.string().datetime("Data inválida."),
});

const CategoriasController = {
  
  async createCategorias(req, res) {
    try {
      const { nome, created_at } = req.body;
      CategoriasSchema.parse({ nome, created_at });

     
      res.status(201).json({ message: "Categoria criada com sucesso" });
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

  
  async updateCategorias(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

     
      const updateSchema = z.object({
        nome: z.string().min(3).optional(),
      });

      updateSchema.parse({ nome });

      
      res.status(200).json({ message: `Categoria ${id} atualizada com sucesso` });
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

export default CategoriasController;
