import express from 'express';
const router = express.Router();

import RestauranteController from '../controllers/restaurante.controller.js';

router.post('/restaurante', RestauranteController.createRestaurante);
router.get('/restaurante', RestauranteController.getRestaurantes);
router.patch('/restaurante/:id', RestauranteController.updateRestaurante);

export default router;
