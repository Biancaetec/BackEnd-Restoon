import express from 'express';
import CarrinhoController from '../controllers/carrinho.controller.js';

const router = express.Router();

// Criar Carrinho
router.post('/carrinho', CarrinhoController.createCarrinho);
router.get('/carrinho', CarrinhoController.createCarrinho);
router.delete('/carrinho', CarrinhoController.createCarrinho);
router.patch('/carrinho', CarrinhoController.createCarrinho);

// Atualizar Carrinho
// router.post('/carrinho', CarrinhoController.createCarrinho);

export default router;