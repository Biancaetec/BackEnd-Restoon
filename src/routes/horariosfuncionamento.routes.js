import express from 'express';
import HorariosFuncionamentoController from '../controllers/horariosfuncionamento.controller.js';

const router = express.Router();

// Criar horariosfuncionamento
router.post('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);

// Atualizar horariosfuncionamento
router.post('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);

export default router;