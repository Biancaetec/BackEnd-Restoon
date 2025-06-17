import express from 'express';
const router = express.Router();

import { createItemPedido, getItensPedido, updateItemPedido, deleteItemPedido } from '../controllers/itempedido.controller.js';

router.post('/itempedido', createItemPedido);
router.get('/itempedido', getItensPedido);
router.patch('/itempedido/:id_item', updateItemPedido);
router.delete('/itempedido/:id_item', deleteItemPedido);

export default router;
