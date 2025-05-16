import express from 'express';
const router = express.Router();

import CategoriaController from '../controllers/categoria.controller.js';

router.post('/categoria', CategoriaController.create);
router.get('/categoria', CategoriaController.get);
router.patch('/categoria/:id_categoria', CategoriaController.update);

export default router;
