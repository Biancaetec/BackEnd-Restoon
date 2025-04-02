import express from 'express';
import ClientesController from '../controllers/clientes.controller.js';

const router = express.Router();

// Criar Clientes
router.post('/clientes', ClientesController.createClientes);

// Atualizar Clientes
router.post('/clientes', ClientesController.createClientes);

export default router;