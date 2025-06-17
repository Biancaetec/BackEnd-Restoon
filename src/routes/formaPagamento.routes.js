// src/routes/formaPagamento.routes.js
import express from 'express';
const router = express.Router();

import { create, get, update } from '../controllers/formapagamento.controller.js';

router.post('/formadepagamento', create);
router.get('/formadepagamento', get);
router.patch('/formadepagamento/:id', update);

export default router;
