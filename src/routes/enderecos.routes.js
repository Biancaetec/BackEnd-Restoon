import express from 'express';
import EnderecosController from '../controllers/enderecos.controller.js';

const router = express.Router();

// Criar Endereço
router.post('/enderecos', EnderecosController.createEnderecos);
router.get('/enderecos', EnderecosController.createEnderecos);
router.delete('/enderecos', EnderecosController.createEnderecos);
router.patch('/enderecos', EnderecosController.createEnderecos);

// Atualizar Endereço
// router.patch('/enderecos/:id', EnderecosController.updateEnderecos);

export default router;