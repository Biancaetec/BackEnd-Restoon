import express from 'express';
const server = express();

import routerPayment from './routes/payment.routes.js';
import routerItensPedido from './routes/itenspedido.routes.js';
import routerMercados from './routes/mercados.routes.js';
import routerPedidos from './routes/pedidos.routes.js';
import routerClientes from './routes/clientes.routes.js';
import routerProdutos from './routes/produtos.routes.js';
import routerCategorias from './routes/categorias.routes.js';
import routesBanner from './routes/banners.routes.js';
import routesCarrinho from './routes/carrinho.routes.js';
import routesEndereco from './routes/enderecos.routes.js';
import routeshorariofuncionamento from './routes/horariofuncionamento.routes.js';

const PORT = process.env.PORT || 3000;

server.use(express.json());

// Aplicando todas as rotas no servidor
server.use("/api/payment", routerPayment);
server.use("/api/itens-pedido", routerItensPedido);
server.use("/api/mercados", routerMercados);
server.use("/api/pedidos", routerPedidos);
server.use("/api/clientes", routerClientes);
server.use("/api/produtos", routerProdutos);
server.use("/api/categorias", routerCategorias);
server.use("/api/banners", routesBanner);
server.use("/api/carrinho", routesCarrinho);
server.use("/api/enderecos", routesEndereco);
server.use("/api/horario-funcionamento", routeshorariofuncionamento);

// Teste simples das rotas raiz
server.get("/", (req, res) => {
    res.send("GET World " + new Date());
});

server.post("/", (req, res) => {
    res.send("POST " + new Date());
});

server.patch("/", (req, res) => {
    res.send("PATCH " + new Date());
});

server.delete("/", (req, res) => {
    res.send("DELETE " + new Date());
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
