import express from "express";
const router = express.Router();

import { 
    criarPedidoCompleto,
    deletePedidoCompleto,
    getPedidoCompleto
 } from "../controllers/pedidocompleto.controller.js";

// Rota para criar pedido + itens
router.post("/pedido/completo", criarPedidoCompleto);
// Buscar pedido completo (pedido + itens + pagamento)
router.get('/pedidocompleto/:id_pedido', getPedidoCompleto);
// Excluir pedido completo (pedido + itens + pagamento)
router.delete('/pedidocompleto/:id_pedido', deletePedidoCompleto);

export default router;
