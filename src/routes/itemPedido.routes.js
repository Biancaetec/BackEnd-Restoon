import express from 'express';
const router = express.Router();

import {
  createItemPedido,
  getItensPedido,
  updateItemPedido,
  deleteItemPedido
} from '../controllers/itempedido.controller.js';

// Rota para criar um novo item de pedido
router.post('/itempedido', createItemPedido);

// Rota para listar todos os itens de pedido
router.get('/itempedido', getItensPedido);

// Rota para atualizar um item de pedido pelo ID
router.patch('/itempedido/:id_item', updateItemPedido);

// Rota para deletar um item de pedido pelo ID
router.delete('/itempedido/:id_item', deleteItemPedido);

export default router;
