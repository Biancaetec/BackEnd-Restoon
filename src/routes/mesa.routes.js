import express from 'express';
const router = express.Router();

// Controllers - Mesa
import {
  createMesa,
  getMesas,
  updateMesa,
  deleteMesa,
} from "../controllers/mesa.controller.js";

// Rotas de Mesa
router.post('/mesa', createMesa);
router.get('/mesa', getMesas);
router.patch('/mesa/:id_mesa', updateMesa);
router.delete('/mesa/:id_mesa', deleteMesa);

export default router;
