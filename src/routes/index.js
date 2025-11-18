import express from 'express';
const router = express.Router();

import paymentRoutes from './payment.routes.js';
import userRoutes from './userRoutes.js';
import restauranteRoutes from './restaurante.routes.js';
import licenciamentoRoutes from './licenciamento.routes.js';
import usuarioRoutes from './usuario.routes.js';
import categoriaRoutes from './categoria.routes.js';
import produtoRoutes from './produto.routes.js';
import formaPagamentoRoutes from './formaPagamento.routes.js';
import mesaRoutes from './mesa.routes.js';
import pedidoRoutes from './pedido.routes.js';
import itemPedidoRoutes from './itemPedido.routes.js';
import pedidoPagamentoRoutes from './pedidoPagamento.routes.js';
import pedidocompletoRoutes from './pedidocompleto.routes.js';

// import authRoutes from './auth.routes.js';

// router.use('/api', authRoutes);
router.use('/api',paymentRoutes);
router.use('/api', userRoutes);
router.use('/api', restauranteRoutes);
router.use('/api', licenciamentoRoutes);
router.use('/api', usuarioRoutes);
router.use('/api', categoriaRoutes);
router.use('/api', produtoRoutes);
router.use('/api', formaPagamentoRoutes);
router.use('/api', mesaRoutes);
router.use('/api', pedidoRoutes);
router.use('/api', itemPedidoRoutes);
router.use('/api', pedidoPagamentoRoutes);
router.use('/api', pedidocompletoRoutes);

export default router;