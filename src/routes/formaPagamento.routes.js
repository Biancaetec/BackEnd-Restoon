// src/routes/formaPagamento.routes.js
import express from 'express';
const router = express.Router();

import { createFormaPagamento, getFormasPagamento, updateFormaPagamento, deleteFormaPagamento} from '../controllers/formapagamento.controller.js';
router.post('/formapagamento', createFormaPagamento);
router.get('/formapagamento', getFormasPagamento);
router.patch('/formapagamento/:id_pagamento', updateFormaPagamento);
router.delete('/formapagamento/:id_pagamento', deleteFormaPagamento);

export default router;
