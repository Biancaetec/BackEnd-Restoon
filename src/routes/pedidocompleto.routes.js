import express from "express";
const router = express.Router();

import { 
    criarPedidoCompleto,
    deletePedidoCompleto,
    getPedidoCompleto,
    listarPedidosCompleto,
    atualizarStatusPedido,
    limparPedidosMesa,
    getFilaPreparoPorCategoria,
    atualizarStatusItemPedido
 } from "../controllers/pedidocompleto.controller.js";

// Listar pedidos completos do restaurante
router.get("/pedidocompleto", listarPedidosCompleto);
// Rota para criar pedido + itens
router.post("/pedidocompleto", criarPedidoCompleto);
// Buscar pedido completo (pedido + itens + pagamento)
router.get('/pedidocompleto/:id_pedido', getPedidoCompleto);
// Excluir pedido completo (pedido + itens + pagamento)
router.delete('/pedidocompleto/:id_pedido', deletePedidoCompleto);
// Atualizar apenas o status do pedido
router.patch("/pedidocompleto/status/:id_pedido", atualizarStatusPedido);
// Limpar todos os pedidos de uma mesa
router.delete("/pedidocompleto/mesa/:id_mesa", limparPedidosMesa);
// fila de preparo
router.get("/fila-preparo/:id_categoria", getFilaPreparoPorCategoria);
// Atualizar status de um item do pedido
router.patch("/itempedido/status/:id_item", atualizarStatusItemPedido);



export default router;
