import express from 'express';
import rootRoutes from './routes/index.js'; // Importando as rotas do index.js
const server = express();

import routerPayment from './routes/payment.routes.js';
import routerRestaurante from './routes/restaurante.routes.js';
import routerLicenciamento from './routes/licenciamento.routes.js';
import routerUsuario from './routes/usuario.routes.js';
import routerCategoria from './routes/categoria.routes.js';
import routerProduto from './routes/produto.routes.js';
import routerFormaPagamento from './routes/formaPagamento.routes.js';
import routerMesa from './routes/mesa.routes.js';
import routerPedido from './routes/pedido.routes.js';
import routerItemPedido from './routes/itemPedido.routes.js';
import routerPedidoPagamento from './routes/pedidoPagamento.routes.js';

const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: true }));
server.use("/", rootRoutes); // Usando as rotas do index.js
server.use(express.json());

server.use("/api", routerPayment);
server.use("/api/restaurantes", routerRestaurante);
server.use("/api/licenciamentos", routerLicenciamento);
server.use("/api/usuarios", routerUsuario);
server.use("/api/categorias", routerCategoria);
server.use("/api/produtos", routerProduto);
server.use("/api/formaspagamento", routerFormaPagamento);
server.use("/api/mesas", routerMesa);
server.use("/api/pedidos", routerPedido);
server.use("/api/itempedido", routerItemPedido);
server.use("/api/pedidopagamento", routerPedidoPagamento);



server.get("/", (req, res) => {
    res.send("Primeira Rota do Backend - TCC");
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
