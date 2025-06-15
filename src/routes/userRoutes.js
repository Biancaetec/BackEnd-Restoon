
import express from 'express';
const router = express.Router();

import {getUsers, createUser, deleteUser, updateUser, updateUserRole} from "../controllers/userController.js";

router.get('/user', getUsers);
router.post('/user', createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/role/:id", updateUserRole);

export default router;
