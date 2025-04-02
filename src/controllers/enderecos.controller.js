import { z } from "zod";

// Esquema de Enderecos com Zod
const EnderecosSchema = z.object({
  cliente_id: z.number().int().positive("O ID do cliente deve ser um número positivo."),
  mercado_id: z.number().int().positive("O ID do mercado deve ser um número positivo."),
  rua: z.string().min(1, "A rua é obrigatória"),
  bairro: z.string().min(1, "O bairro é obrigatório"),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "O CEP deve ter o formato '12345-678'") // CEP no formato '12345-678'
    .min(8, "O CEP deve ter 8 caracteres")
    .max(8, "O CEP deve ter 8 caracteres"),
  numero: z.number().int().positive(),
  complemento: z.string().optional(),
});

const EnderecosController = {
  // Criar Enderecos
  async createEnderecos(req, res) {
    try {
      const { cliente_id, mercado_id, rua, bairro, cep, numero, complemento } = req.body;  
      
      // Validando os dados com Zod
      EnderecosSchema.parse({ cliente_id, mercado_id, rua, bairro, cep, numero, complemento });

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

  // Atualizar Enderecos
  async updateEnderecos(req, res) {
    try {
      const { id } = req.params;
      const {cliente_id, mercado_id, rua, bairro, cep, numero, complemento } = req.body;

      // Simulando a atualização de um Endereço
      res.status(200).json({ message: `Endereço ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default EnderecosController;
