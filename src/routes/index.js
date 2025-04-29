import express from 'express';
const router = express.Router();

import paymentRoutes from './payment.routes.js';
import userRoutes from './user.routes.js';

router.use('/api',paymentRoutes);
router.use('/api', userRoutes);

export default router;