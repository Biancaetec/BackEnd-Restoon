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

// Controllers - Usuário
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updateUserRole
} from "../controllers/userController.js";

// Controllers - Categoria
import {
  createCategoria,
  getCategorias,
  updateCategoria
} from "../controllers/categoria.controller.js";

// Rotas de Usuário
router.get('/user', getUsers);
router.post('/user', createUser);
router.delete('/user/:id', deleteUser);
router.patch('/user/:id', updateUser);
router.patch('/user/role/:id', updateUserRole);

// Rotas de Categoria
router.post('/categoria', createCategoria);
router.get('/categoria', getCategorias);
router.patch('/categoria/:id_categoria', updateCategoria);

export default router;


