import { z } from "zod";

// Esquema de pedidos com Zod
const PedidosSchema = z.object({
  cliente_id: z.string().uuid(),  // ID do cliente
  mercado_id: z.string().uuid(),  // ID do mercado
  status: z.enum(['pendente', 'pago', 'cancelado', 'entregue'], "Status inválido"),  // Status do pedido
  total: z.number().positive(),  // Total do pedido
  numero: z.number().int().positive(),  // Número do pedido
  data: z.string().datetime(),  // Data do pedido
  observacao: z.string().optional(),  // Observação do pedido (opcional)
});

const PedidosController = {
  // Criar pedido
  async createPedidos(req, res) {
    try {
      const { cliente_id, mercado_id, status, total, numero, data, observacao } = req.body;
      
      // Validando os dados com Zod
      PedidosSchema.parse({ cliente_id, mercado_id, status, total, numero, data, observacao });

      // Simulando a criação de um pedido
      res.status(201).json({ message: "Pedido criado com sucesso" });
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

  // Atualizar pedido
  async updatePedidos(req, res) {
    try {
      const { id } = req.params;
      const { cliente_id, mercado_id, status, total, numero, data, observacao } = req.body;

      // Simulando a atualização de um pedido
      res.status(200).json({ message: `Pedido ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default PedidosController;