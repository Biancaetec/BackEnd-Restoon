// import express from 'express';
// import userRoutes from './userRoutes.js';

// const router = express.Router();

// // Agrupar todas as rotas aqui
// router.use(userRoutes);

// export default router;

import express from 'express';
const router = express.Router();

import { getUsers, createUser } from "../controllers/userController.js";

router.get('/users', getUsers);
router.post('/users', createUser);

export default router;
