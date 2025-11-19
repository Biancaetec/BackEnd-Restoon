import express from "express";
const router = express.Router();

import { 
    criarPedidoCompleto,
    deletePedidoCompleto,
    getPedidoCompleto,
    listarPedidosCompleto
 } from "../controllers/pedidocompleto.controller.js";

// Listar pedidos completos do restaurante
router.get("/pedidocompleto", listarPedidosCompleto);
// Rota para criar pedido + itens
router.post("/pedidocompleto", criarPedidoCompleto);
// Buscar pedido completo (pedido + itens + pagamento)
router.get('/pedidocompleto/:id_pedido', getPedidoCompleto);
// Excluir pedido completo (pedido + itens + pagamento)
router.delete('/pedidocompleto/:id_pedido', deletePedidoCompleto);

export default router;
