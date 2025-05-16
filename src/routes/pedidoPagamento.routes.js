import express from 'express';
const router = express.Router();

import PedidoPagamentoController from '../controllers/pedidopagamento.controller.js';

router.post('/pedidopagamento', PedidoPagamentoController.create);
router.get('/pedidopagamento', PedidoPagamentoController.get);
router.patch('/pedidopagamento/:id', PedidoPagamentoController.update);

export default router;
