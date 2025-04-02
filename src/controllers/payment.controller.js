import { z } from "zod";

// Esquema de pagamento com Zod
const PaymentSchema = z.object({
  usuarioId: z.string().uuid(),
  total: z.number().positive(),
  numero: z.number().int().positive(),
  data: z.string().datetime(),
  observacao: z.string().optional(), 
});

const PaymentController = {
  // Criar pagamento
  async createPayment(req, res) {
    try {
      const { usuarioId, total, numero, data, observacao } = req.body;
      PaymentSchema.parse({ usuarioId, total, numero, data, observacao });

      // Simulando a criação de um pagamento
      res.status(201).json({ message: "Pagamento criado com sucesso" });
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

  // Atualizar pagamento
  async updatePayment(req, res) {
    try {
      const { id } = req.params;
      const { total, numero, data, observacao } = req.body;

      // Simulando a atualização de um pagamento
      res.status(200).json({ message: `Pagamento ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default PaymentController;
