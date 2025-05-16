import { z } from "zod";

const RestauranteSchema = z.object({
  id_restaurante: z.number().int().positive(),
  nome: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  criado_em: z.string().datetime("Data inválida"),
  status_licenciamento: z.enum(["ativo", "expirado", "pendente"], {
    required_error: "O status é obrigatório",
    invalid_type_error: "Status inválido",
  }),
});

const RestauranteController = {
  async createRestaurante(req, res) {
    try {
      const { id_restaurante, nome, email, senha, criado_em, status_licenciamento } = req.body;
      RestauranteSchema.parse({ id_restaurante, nome, email, senha, criado_em, status_licenciamento });
      res.status(201).json({ message: "Restaurante criado com sucesso" });
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

  async updateRestaurante(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha, criado_em, status_licenciamento } = req.body;
      // Aqui você poderia validar novamente se quiser, com RestauranteSchema.partial().parse({ ... })
      res.status(200).json({ message: `Restaurante ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async getRestaurantes(req, res) {
    try {
      const data = [
        {
          id_restaurante: 1,
          nome: "Mazegohan Sushi",
          email: "contato@mazegohan.com",
          senha: "segura123",
          criado_em: new Date().toISOString(),
          status_licenciamento: "ativo",
        },
        {
          id_restaurante: 2,
          nome: "Petiscaria Banzai",
          email: "banzai@email.com",
          senha: "banzaiseguro",
          criado_em: new Date().toISOString(),
          status_licenciamento: "pendente",
        },
      ];
      res.status(200).json({ data, message: "Restaurantes carregados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default RestauranteController;
