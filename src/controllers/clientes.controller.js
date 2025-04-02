import { z } from "zod";

// Esquema de validação para clientes
const ClientesSchema = z.object({
  cliente_id: z.number().int().positive("O ID do cliente deve ser um número positivo."),
  email: z.string().email("Formato de e-mail inválido."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  created_at: z.string().datetime(),
});

const ClientesController = {

  async createClientes(req, res) {
    try {
      const { username, email, senha, created_at } = req.body;
      ClientesSchema.parse({ username, email, senha, created_at });

   
      res.status(201).json({ message: "Cliente criado com sucesso" });
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

  
  async updateClientes(req, res) {
    try {
      const { id } = req.params;
      const { username, email, senha } = req.body;

      const updateSchema = z.object({
        username: z.string().min(3).optional(),
        email: z.string().email().optional(),
        senha: z.string().min(6).optional(),
      });

      updateSchema.parse({ username, email, senha });

      res.status(200).json({ message: `Cliente ${id} atualizado com sucesso` });
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

export default ClientesController;
