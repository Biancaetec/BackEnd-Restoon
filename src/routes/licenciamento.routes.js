import express from 'express';
const router = express.Router();

import LicenciamentoController from '../controllers/licenciamento.controller.js';

router.post('/licenciamento', LicenciamentoController.create);
router.get('/licenciamento', LicenciamentoController.get);
router.patch('/licenciamento/:id', LicenciamentoController.update);

export default router;
