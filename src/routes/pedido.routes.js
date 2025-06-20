import express from "express";
const router = express.Router();

import {
  createPedido,
  getPedidos,
  updatePedido,
  deletePedido,
} from "../controllers/pedido.controller.js";

// Rotas de Pedido
router.post("/pedido", createPedido);
router.get("/pedido", getPedidos);
router.patch("/pedido/:id_pedido", updatePedido);
router.delete("/pedido/:id_pedido", deletePedido);

export default router;
