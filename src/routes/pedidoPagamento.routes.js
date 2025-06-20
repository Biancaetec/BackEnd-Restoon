import express from 'express';
const router = express.Router();

import {
  createPedidoPagamento,
  getPedidoPagamentos,
  updatePedidoPagamento,
  deletePedidoPagamento,
} from '../controllers/pedidopagamento.controller.js';

router.post('/pedidopagamento', createPedidoPagamento);
router.get('/pedidopagamento', getPedidoPagamentos);
router.patch('/pedidopagamento/:id_pagamento_pedido', updatePedidoPagamento);
router.delete('/pedidopagamento/:id_pagamento_pedido', deletePedidoPagamento);

export default router;
