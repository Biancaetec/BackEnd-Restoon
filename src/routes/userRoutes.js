
import express from 'express';
const router = express.Router();

import { getUsers, createUser } from "../controllers/userController.js";

router.get('/user', getUsers);
router.post('/user', createUser);

export default router;
