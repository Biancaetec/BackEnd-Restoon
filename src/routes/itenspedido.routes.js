import express from 'express';
import ItensPedidoController from '../controllers/itenspedido.controller.js';

const router = express.Router();

// Criar Itens Pedido
router.post('/itenspedido', ItensPedidoController.createItensPedido);

// Atualizar Itens Pedido
router.patch('/itenspedido/:id', ItensPedidoController.updateItensPedido);

export default router;