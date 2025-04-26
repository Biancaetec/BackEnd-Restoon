import express from 'express';
const router = express.Router();

import PaymentController from '../controllers/payment.controller.js';

router.post('/payment', PaymentController.createPayment);
router.get('/payment', PaymentController.createPayment);
// router.delete('/payment', PaymentController.createPayment);
router.patch('/payment/:id', PaymentController.createPayment);


export default router;