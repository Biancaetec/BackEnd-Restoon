import { z } from "zod";

// Esquema de pagamento com Zod
const HorariosFuncionamentoSchema = z.object({
  dia_semana: z.enum(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']), // Enum para o dia da semana
  horario_abertura: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/), // Horário de abertura no formato HH:mm
  horario_fechamento: z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/), // Horário de fechamento no formato HH:mm
  data_feriado: z.string().datetime().optional(), // Data de feriado opcional (se fornecida, precisa ser uma data válida)
});

const HorariosFuncionamentoController = {
  // Criar pagamento
  async createHorariosFuncionamento(req, res) {
    try {
      const { dia_semana, horario_abertura, horario_fechamento, data_feriado} = req.body;
      HorariosFuncionamentoSchema.parse({dia_semana, horario_abertura, horario_fechamento, data_feriado});

      // Simulando a criação de um pagamento
      res.status(201).json({ message: "Horários de Funcionamento criado com sucesso" });
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
  async updateHorariosFuncionamento(req, res) {
    try {
      const { id } = req.params;
      const { dia_semana, horario_abertura, horario_fechamento, data_feriado } = req.body;

      // Simulando a atualização de um pagamento
      res.status(200).json({ message: `Horários ${id} atualizado com sucesso` });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default HorariosFuncionamentoController;
