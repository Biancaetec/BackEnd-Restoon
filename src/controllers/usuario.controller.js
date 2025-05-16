import { z } from "zod";

const UsuarioSchema = z.object({
  id_usuario: z.number().int().positive().optional(),
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  funcao: z.string(),
  id_restaurante: z.number().int().positive(),
  ativo: z.boolean(),
});

const UsuarioController = {
  async create(req, res) {
    try {
      UsuarioSchema.parse(req.body);
      res.status(201).json({ message: "Usuário criado com sucesso" });
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
      const { id_usuario } = req.params;
      UsuarioSchema.partial().parse(req.body);
      res.status(200).json({ message: `Usuário ${id_usuario} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  async get(req, res) {
    try {
      const data = [
        {
          id_usuario: 1,
          nome: "João",
          email: "joao@email.com",
          senha: "senha123",
          funcao: "admin",
          id_restaurante: 1,
          ativo: true,
        },
        {
          id_usuario: 2,
          nome: "Maria",
          email: "maria@email.com",
          senha: "senha123",
          funcao: "garçom",
          id_restaurante: 2,
          ativo: true,
        },
      ];
      res.status(200).json({ data, message: "Usuários listados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default UsuarioController;
