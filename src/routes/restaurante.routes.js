import express from 'express';
import {
  getRestaurantes,
  createRestaurante,
  updateRestaurante,
  deleteRestaurante,
  updateRestauranteStatus,
  getRestauranteById
} from '../controllers/restaurante.controller.js';

const router = express.Router();
import { login } from '../controllers/restaurante.controller.js';

router.post('/login', login);

// Listar todos os restaurantes
router.get('/restaurante', getRestaurantes);

// Criar novo restaurante
router.post('/restaurante', createRestaurante);

// Atualizar restaurante
router.put('/restaurante/:id', updateRestaurante);

// Atualizar status do licenciamento
router.patch('/restaurante/:id/status', updateRestauranteStatus);

// Deletar restaurante
router.delete('/restaurante/:id', deleteRestaurante);

router.get('/restaurante/:id', getRestauranteById);

export default router;

