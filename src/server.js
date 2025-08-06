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

// import express from 'express';
// import router from './routes/index.js'; // Importando as rotas principais
// import cors from 'cors';

// const server = express();
// const PORT = process.env.PORT || 3001;

// // ---- Middlewares (ordem importa!) ----
// server.use(cors()); // <= cors primeiro (permite requisições do app)
// server.use(express.urlencoded({ extended: true }));
// server.use(express.json());

// // Logging simples para depuração
// server.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//   next();
// });

// // Usando as rotas principais (depois dos middlewares)
// server.use('/', router);

// // Rota de teste simples
// server.get('/', (req, res) => {
//   res.send('Primeira Rota do Backend - TCC');
// });

// // Opcional: rota POST de teste para isolar problemas
// // Remova/ comente depois de testar
// server.post('/restaurante-teste', (req, res) => {
//   console.log('POST /restaurante-teste body:', req.body);
//   res.json({ message: 'OK rota de teste', body: req.body });
// });

// // Iniciando o servidor
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
