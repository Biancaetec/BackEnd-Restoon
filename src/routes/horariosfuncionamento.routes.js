import express from 'express';
import routesHorariosFuncionamento from './routes/horariosfuncionamento.routes.js';

const router = express.Router();

// Criar horariosfuncionamento
router.post('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);

// Atualizar horariosfuncionamento
router.post('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);

export default router;