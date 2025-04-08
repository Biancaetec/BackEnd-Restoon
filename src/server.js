import express from 'express';
const server = express();

import routerPayment from './routes/payment.routes.js';
import routerItensPedido from './routes/itenspedido.routes.js';
import routerMercados from './routes/mercados.routes.js';
import routerPedidos from './routes/pedidos.routes.js';
import routerClientes from './routes/clientes.routes.js';
import routerProdutos from './routes/produtos.routes.js';
import routerCategorias from './routes/categorias.routes.js';
import routerBanner from './routes/banners.routes.js';
import routerCarrinho from './routes/carrinho.routes.js';
import routerEndereco from './routes/enderecos.routes.js';
import routerHorariosfuncionamento from './routes/horariosfuncionamento.routes.js';

const PORT = process.env.PORT || 3000;

server.use(express.json());

// Aplicando todas as rotas no servidor
server.use("/api", routerPayment);
server.use("/api", routerItensPedido);
server.use("/api", routerMercados);
server.use("/api", routerPedidos);
server.use("/api", routerClientes);
server.use("/api", routerProdutos);
server.use("/api", routerCategorias);
server.use("/api", routerBanner);
server.use("/api", routerCarrinho);
server.use("/api", routerEndereco);
server.use("/api", routerHorariosfuncionamento);

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
