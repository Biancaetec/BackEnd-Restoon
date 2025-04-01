import express from 'express';
import PaymentController from '../controllers/payment.controller.js';

const router = express.Router();

// Criar Pagamento
router.post('/payment', PaymentController.createPayment);

// Atualizar Pagamento
router.patch('/payment/:id', PaymentController.updatePayment);

export default router;