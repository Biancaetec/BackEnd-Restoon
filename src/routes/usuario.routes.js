// import express from 'express';
// const router = express.Router();

// import UsuarioController from '../controllers/usuario.controller.js';

// router.post('/usuario', UsuarioController.create);
// router.get('/usuario', UsuarioController.get);
// router.patch('/usuario/:id', UsuarioController.update);

// export default router;

import express from 'express';
const router = express.Router();

import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  updateUserFuncao // adicionada para alterar apenas a função do usuário
} from '../controllers/usuario.controller.js';

// Buscar todos os usuários
router.get('/usuario', getUsers);

// Criar novo usuário
router.post('/usuario', createUser);

// Deletar usuário por ID
router.delete("/usuario/:id", deleteUser);

// Atualizar dados gerais do usuário
router.patch("/usuario/:id", updateUser);

// Atualizar apenas a função do usuário
router.patch("/usuario/funcao/:id", updateUserFuncao);

export default router;

