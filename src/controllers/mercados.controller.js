import { z } from "zod";

// Esquema de Mercados com Zod
const MercadosSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  cnpj: z.string().length(14, "O CNPJ deve ter 14 caracteres").regex(/^\d{14}$/, "O CNPJ deve conter apenas números"),
  email: z.string().email("O e-mail deve ser válido"),
  telefone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "O telefone deve ter o formato '(XX) XXXX-XXXX' ou '(XX) XXXXX-XXXX'"),
  logradouro: z.string().min(1, "O logradouro é obrigatório"),
  bairro: z.string().min(1, "O bairro é obrigatório"),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "O CEP deve ter o formato '12345-678'") // CEP no formato '12345-678'
    .min(8, "O CEP deve ter 8 caracteres")
    .max(8, "O CEP deve ter 8 caracteres"),
  numero: z.number().int().positive(),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  complemento: z.string().optional(),
});

const MercadosController = {
  // Criar Mercados
  async createMercados(req, res) {
    try {
      const { nome, cnpj, email, telefone, logradouro, bairro, cep, numero, senha, complemento } = req.body;

      // Validando os dados com Zod
      MercadosSchema.parse({ nome, cnpj, email, telefone, logradouro, bairro, cep, numero, senha, complemento });

      // Simulando a criação de um Endereço
      res.status(201).json({ message: "Endereço criado com sucesso" });
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

  // Atualizar Mercados
  async updateMercados(req, res) {
    try {
      const { id } = req.params;
      const { nome, cnpj, email, telefone, logradouro, bairro, cep, numero, senha, complemento } = req.body;

      // Simulando a atualização de um Endereço
      res.status(200).json({ message: `Endereço ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default MercadosController;
