// src/routes/horariosfuncionamento.routes.js
import express from 'express';
import HorariosFuncionamentoController from '../controllers/horariosfuncionamento.controller.js'; 

const router = express.Router();


router.post('/', HorariosFuncionamentoController.createHorariosFuncionamento);


router.put('/:id', HorariosFuncionamentoController.updateHorariosFuncionamento); 

export default router;
