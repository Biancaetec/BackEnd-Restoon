import express from 'express';
import ItensPedidoController from '../controllers/itenspedido.controller.js';

const router = express.Router();

// Criar Itens Pedido
router.post('/itenspedido', ItensPedidoController.createItensPedido);
router.get('/itenspedido', ItensPedidoController.createItensPedido);
router.delete('/itenspedido', ItensPedidoController.createItensPedido);
router.patch('/itenspedido', ItensPedidoController.createItensPedido);

// Atualizar Itens Pedido
// router.patch('/itenspedido/:id', ItensPedidoController.updateItensPedido);

export default router;