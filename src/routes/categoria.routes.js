//import express from 'express';
//const router = express.Router();

//import CategoriaController from '../controllers/categoria.controller.js';

//router.post('/categoria', CategoriaController.create);
//router.get('/categoria', CategoriaController.get);
//router.patch('/categoria/:id_categoria', CategoriaController.update);

//export default router;
// routes.js

import express from 'express';
const router = express.Router();

// Controllers - Categoria
import {
  createCategoria,
  getCategorias,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoria.controller.js";


// Rotas de Categoria
router.post('/categoria', createCategoria);
router.get('/categoria', getCategorias);
router.patch('/categoria/:id_categoria', updateCategoria);
router.delete('/categoria/:id_categoria', deleteCategoria);

export default router;


