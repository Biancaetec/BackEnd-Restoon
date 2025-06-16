import express from 'express';
const router = express.Router();

import {
    getRestaurantes,
    createRestaurante,
    deleteRestaurante,
    updateRestaurante,
    updateRestauranteStatus
} from "../controllers/restaurante.controller.js";

router.get('/restaurante', getRestaurantes);
router.post('/restaurante', createRestaurante);
router.delete('/restaurante/:id', deleteRestaurante);
router.patch('/restaurante/:id', updateRestaurante);
router.patch('/restaurante/status/:id', updateRestauranteStatus);

export default router;
