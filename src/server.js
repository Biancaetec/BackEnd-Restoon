import express from 'express';
import router from './routes/index.js'; // Importando as rotas principais
import cors from 'cors';

const server = express();
const PORT = process.env.PORT || 3001;

// Middleware para interpretar JSON e dados de formulário
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Usando as rotas principais
server.use("/", router);

// Rota de teste
server.get("/", (req, res) => {
    res.send("Primeira Rota do Backend - TCC");
});

// Iniciando o servidor
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


server.use(cors());  // Permite requisições de qualquer origem
