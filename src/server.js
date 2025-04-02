//const express = require('express');
import express from 'express';
const server = express();

import routerPayment from './routes/payment.routes.js';
import routerItensPedido from './routes/itenspedido.routes.js';
import routerMercados from './routes/mercados.routes.js';
import routerPedidos from './routes/pedidos.routes.js';
import routerClientes from './routes/clientes.routes.js';
import routerProdutos from './routes/produtos.routes.js';
import routerCategorias from './routes/categorias.routes.js';
import routesBanner from '/routes/banners.routes.js';
import routesCarrinho from '/routes/carrinho.routes.js';
import routesEndereco from '/routes/enderecos.routes.js';
import routeshorariofuncionamento from '/routes/horariofuncionamento.routes.js';

const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use("/api", routerPayment);

server.get("/",(req,res)=>{
    res.send("GET Word " + new Date());
});
server.post("/",(req,res)=>{
    res.send("POST " + new Date());
});ijm
server.patch("/",(req,res)=>{
    res.send("PATCH " + new Date());
});
server.delete("/",(req,res)=>{
    res.send("DELETE " + new Date());
});
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});