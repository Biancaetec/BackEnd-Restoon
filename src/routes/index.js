import express from 'express';
const router = express.Router();

import paymentRoutes from './payment.routes.js';
import userRoutes from './user.routes.js';
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

router.use('/api',paymentRoutes);
router.use('/api', userRoutes);
router.use('/api/restaurantes', restauranteRoutes);
router.use('/api/licenciamentos', licenciamentoRoutes);
router.use('/api/usuarios', usuarioRoutes);
router.use('/api/categorias', categoriaRoutes);
router.use('/api/produtos', produtoRoutes);
router.use('/api/formaspagamento', formaPagamentoRoutes);
router.use('/api/mesas', mesaRoutes);
router.use('/api/pedidos', pedidoRoutes);
router.use('/api/itempedido', itemPedidoRoutes);
router.use('/api/pedidopagamento', pedidoPagamentoRoutes);

export default router;