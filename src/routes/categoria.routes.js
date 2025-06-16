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

// Controllers
import { 
  getUsers, 
  createUser, 
  deleteUser, 
  updateUser, 
  updateUserRole 
} from "../controllers/userController.js";

import { 
  create as createCategoria, 
  get as getCategorias, 
  update as updateCategoria 
} from "../controllers/categoria.controller.js";

// Rotas de Usuário
router.get('/user', getUsers);
router.post('/user', createUser);
router.delete('/user/:id', deleteUser);
router.patch('/user/:id', updateUser);         // Adiciona updateUser se estiver faltando
router.patch('/user/role/:id', updateUserRole);

// Rotas de Categoria
router.post('/categoria', createCategoria);
router.get('/categoria', getCategorias);
router.patch('/categoria/:id_categoria', updateCategoria);

export default router;

