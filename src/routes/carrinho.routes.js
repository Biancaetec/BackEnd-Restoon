import express from 'express';
import CarrinhoController from '../controllers/carrinho.controller.js';

const router = express.Router();

// Criar Carrinho
router.post('/carrinhos', CarrinhoController.createCarrinho);

// Atualizar Carrinho
router.post('/carrinhos', CarrinhoController.createCarrinho);

export default router;