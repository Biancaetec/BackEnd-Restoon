// src/routes/horariosfuncionamento.routes.js
import express from 'express';
import HorariosFuncionamentoController from '../controllers/horariosfuncionamento.controller.js'; 

const router = express.Router();


router.post('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);
router.get('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);
router.delete('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);
router.patch('/horariosfuncionamento', HorariosFuncionamentoController.createHorariosFuncionamento);



// router.put('/:id', HorariosFuncionamentoController.updateHorariosFuncionamento); 

export default router;
