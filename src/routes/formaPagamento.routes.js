import express from 'express';
const router = express.Router();

import FormaPagamentoController from '../controllers/formapagamento.controller.js';

router.post('/formadepagamento', FormaPagamentoController.create);
router.get('/formadepagamento', FormaPagamentoController.get);
router.patch('/formadepagamento/:id', FormaPagamentoController.update);

export default router;
