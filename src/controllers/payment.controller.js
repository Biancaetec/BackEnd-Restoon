import { z } from "zod";
const PaymentSchema = z.object({
  usuarioId: z.string().uuid(),
  total: z.number().positive(),
  numero: z.number().int().positive(),
  data: z.string().datetime(),
  observacao: z.string().optional(), 
});

const PaymentController = {
  async createPayment(req, res) {
    try {
      const { usuarioId, total, numero, data, observacao } = req.body;
      PaymentSchema.parse({ usuarioId, total, numero, data, observacao });
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

  async updatePayment(req, res) {
    try {
      const { id } = req.params;
      const { total, numero, data, observacao } = req.body;
      res.status(200).json({ message: `Pagamento ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  async getPayments(req, res) {
    try {
      const data = [
        { id: 1, valor: 100, numero: 123456, data: new Date(), observacao: "Pagamento 1" },
        { id: 2, valor: 200, numero: 654321, data: new Date(), observacao: "Pagamento 2" },
        { id: 3, valor: 300, numero: 789012, data: new Date(), observacao: "Pagamento 3" },
        { id: 4, valor: 400, numero: 210987, data: new Date(), observacao: "Pagamento 4" },
        { id: 5, valor: 500, numero: 345678, data: new Date(), observacao: "Pagamento 5" },
        { id: 6, valor: 600, numero: 876543, data: new Date(), observacao: "Pagamento 6" },
        { id: 7, valor: 700, numero: 234567, data: new Date(), observacao: "Pagamento 7" },
        { id: 8, valor: 800, numero: 765432, data: new Date(), observacao: "Pagamento 8" },
        { id: 9, valor: 900, numero: 345678, data: new Date(), observacao: "Pagamento 9" },
        { id: 10, valor: 1000, numero: 987654, data: new Date(), observacao: "Pagamento 10" },
      ];
      res.status(200).json({ data, message: "Pagamentos criados com sucesso" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
},
}

export default PaymentController;
