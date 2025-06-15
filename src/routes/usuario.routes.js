// import express from 'express';
// const router = express.Router();

// import UsuarioController from '../controllers/usuario.controller.js';

// router.post('/usuario', UsuarioController.create);
// router.get('/usuario', UsuarioController.get);
// router.patch('/usuario/:id', UsuarioController.update);

// export default router;

import express from 'express';
const router = express.Router();

import {getUsers, createUser, deleteUser, updateUser} from '../controllers/usuario.controller.js';

router.get('/usuario', getUsers);
router.post('/usuario', createUser);
router.delete("/usuario/:id", deleteUser);
router.patch("/usuario/:id", updateUser);


export default router;

