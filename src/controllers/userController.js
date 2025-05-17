import { findAll } from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const usuario = await findAll()
        res.status(200).json(usuario);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error - Controller" });
    }
}