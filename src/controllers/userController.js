import { findAll, create, remove, update, updateRole } from "../models/userModel.js";
import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(1, "Nome de usuário é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().optional(),
    role: z.enum(["parcial", "user"]).optional(),
    photo: z.string().optional(),
});

const roleSchema = z.object({
    role: z.enum(["parcial", "user"]).optional(),
    
});


export const getUsers = async (req, res) => {
    try {
        const users = await findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = userSchema.parse(req.body);
        const result = await create(userData);
        res.status(201).json({ message: "User created successfully", userId: result.lastInsertRowid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await remove(id);
        if (result.changes === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = userSchema.parse(req.body);
        const result = await update(id, userData);
        if (result.changes === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};


export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = roleSchema.parser(req.body);
        const result = await updateRole(id, role);
        if (result.changes === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
};
