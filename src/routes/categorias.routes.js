import express from 'express';
import PaymentController from '../controllers/categorias.controller';

const router = express.Router();

// Criar Pagamento
router.post('/categorias', CategoriasController.createCategorias);

// Atualizar Pagamento
router.patch('/categorias/:id', CategoriasController.updateCategorias);

export default router;