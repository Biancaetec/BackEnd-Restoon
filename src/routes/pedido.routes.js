import express from 'express';
const router = express.Router();

import PedidoController from '../controllers/pedido.controller.js';

router.post('/pedido', PedidoController.create);
router.get('/pedido', PedidoController.get);
router.patch('/pedido/:id', PedidoController.update);

export default router;
