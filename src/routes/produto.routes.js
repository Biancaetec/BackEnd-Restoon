import express from 'express';
const router = express.Router();

// Controllers - Produto
import {
  createProduto,
  getProdutos,
  updateProduto,
  deleteProduto,
} from '../controllers/produto.controller.js';

// Rotas de Produto
router.post('/produto', createProduto);
router.get('/produto', getProdutos);
router.patch('/produto/:id_produto', updateProduto);
router.delete('/produto/:id_produto', deleteProduto);

export default router;
