import express from 'express';
const router = express.Router();

import {getUsers, createUser} from "../controllers/userController.js";

router.get('/users', getUsers);
router.post('/users', createUser);

export default router;