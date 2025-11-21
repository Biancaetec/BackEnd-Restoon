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

// CORRETO: parâmetro separado com "/:param"
router.get('/produto/:id_restaurante', getProdutos);

router.patch('/produto/:id_produto', updateProduto);
router.delete('/produto/:id_produto', deleteProduto);

export default router;
