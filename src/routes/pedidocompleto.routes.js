import express from "express";
const router = express.Router();

import { criarPedidoCompleto } from "../controllers/pedidocompleto.controller.js";

// Rota para criar pedido + itens
router.post("/pedido/completo", criarPedidoCompleto);

export default router;
