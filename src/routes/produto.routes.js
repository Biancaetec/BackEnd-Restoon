import express from 'express';
const router = express.Router();

import ProdutoController from '../controllers/produto.controller.js';

router.post('/produto', ProdutoController.create);
router.get('/produto', ProdutoController.get);
router.patch('/produto/:id', ProdutoController.update);

export default router;
