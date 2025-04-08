import express from 'express';
import MercadosController from '../controllers/mercados.controller.js';

const router = express.Router();

// Criar Pagamento
router.post('/mercados', MercadosController.createMercados);
router.get('/mercados', MercadosController.createMercados);
router.delete('/mercados', MercadosController.createMercados);
router.patch('/mercados', MercadosController.createMercados);

// Atualizar Pagamento
// router.patch('/mercados/:id', MercadosController.updateMercados);

export default router;