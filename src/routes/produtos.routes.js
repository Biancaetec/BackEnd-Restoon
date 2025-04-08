import express from 'express';
import ProdutosController from '../controllers/produtos.controller.js';

const router = express.Router();

// Criar Produtos
router.post('/produtos', ProdutosController.createProdutos);
router.get('/produtos', ProdutosController.createProdutos);
router.delete('/produtos', ProdutosController.createProdutos);
router.patch('/produtos', ProdutosController.createProdutos);

// Atualizar Produtos
// router.patch('/produtos/:id', ProdutosController.updateProdutos);

export default router;