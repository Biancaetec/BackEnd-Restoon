import express from 'express';
import rootRoutes from './routes/index.js'; // Importando as rotas do index.js
const server = express();

import router from './routes/index.js'; // Importando as rotas do index.js

const PORT = process.env.PORT || 3001;

server.use(express.urlencoded({ extended: true }));
server.use("/", rootRoutes); // Usando as rotas do index.js
server.use(express.json());

server.use("/", router);

server.get("/", (req, res) => {
    res.send("Primeira Rota do Backend - TCC");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
