import express from 'express';
const router = express.Router();

import ItemPedidoController from '../controllers/itempedido.controller.js';

router.post('/itempedido', ItemPedidoController.create);
router.get('/itempedido', ItemPedidoController.get);
router.patch('/itempedido/:id', ItemPedidoController.update);

export default router;
