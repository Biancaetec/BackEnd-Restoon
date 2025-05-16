import express from 'express';
const router = express.Router();

import MesaController from '../controllers/mesa.controller.js';

router.post('/mesa', MesaController.create);
router.get('/mesa', MesaController.get);
router.patch('/mesa/:id', MesaController.update);

export default router;
