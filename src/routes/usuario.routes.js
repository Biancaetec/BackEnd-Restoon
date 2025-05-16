import express from 'express';
const router = express.Router();

import UsuarioController from '../controllers/usuario.controller.js';

router.post('/usuario', UsuarioController.create);
router.get('/usuario', UsuarioController.get);
router.patch('/usuario/:id', UsuarioController.update);

export default router;
