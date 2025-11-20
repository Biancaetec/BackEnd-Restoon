import {
    findAll,
    create,
    remove,
    update,
    updateStatus,
    findByEmailAndSenha
} from "../models/restauranteModel.js";

import { z } from "zod";

// ===============================
// LOGIN
// ===============================
export const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    try {
        const restaurante = await findByEmailAndSenha(email, senha);

        if (!restaurante) {
            return res.status(401).json({ message: "Email ou senha inválidos" });
        }

        return res.status(200).json(restaurante);

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
};

// ===============================
// SCHEMAS DE VALIDAÇÃO
// ===============================
const restauranteSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(1, "Senha é obrigatória"),
    criado_em: z.string().optional(),
    status_licenciamento: z.enum(["ativo", "expirado", "pendente"]).optional(),
    id_usuario: z.number().int().positive().optional(),
});

const statusSchema = z.object({
    status_licenciamento: z.enum(["ativo", "expirado", "pendente"]),
});

const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID inválido"),
});

// ===============================
// BUSCAR TODOS
// ===============================
export const getRestaurantes = async (req, res) => {
    try {
        const restaurantes = await findAll();
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar restaurantes" });
    }
};

// ===============================
// CRIAR RESTAURANTE
// ===============================
export const createRestaurante = async (req, res) => {
    try {
        let data = restauranteSchema.parse(req.body);

        // valor padrão se não vier no body
        if (!data.status_licenciamento) {
            data.status_licenciamento = "pendente";
        }

        const novoRestaurante = await create(data);

        return res.status(201).json({
            message: "Restaurante criado com sucesso",
            restaurante: novoRestaurante,
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            message: "Erro ao criar restaurante",
            error: error.errors ?? error.message,
        });
    }
};

// ===============================
// DELETAR RESTAURANTE
// ===============================
export const deleteRestaurante = async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);

        const result = await remove(id);

        if (result.changes === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        res.status(200).json({ message: "Restaurante deletado com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Erro ao deletar restaurante",
            error: error.errors ?? error.message,
        });
    }
};

// ===============================
// ATUALIZAR RESTAURANTE
// ===============================
export const updateRestaurante = async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const data = restauranteSchema.parse(req.body);

        const result = await update(id, data);

        if (result.changes === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        res.status(200).json({ message: "Restaurante atualizado com sucesso" });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Erro ao atualizar restaurante",
            error: error.errors ?? error.message,
        });
    }
};

// ===============================
// ATUALIZAR STATUS DE LICENCIAMENTO
// ===============================
export const updateRestauranteStatus = async (req, res) => {
    try {
        const { id } = idParamSchema.parse(req.params);
        const { status_licenciamento } = statusSchema.parse(req.body);

        const result = await updateStatus(id, status_licenciamento);

        if (result.changes === 0) {
            return res.status(404).json({ message: "Restaurante não encontrado" });
        }

        res.status(200).json({
            message: "Status de licenciamento atualizado com sucesso",
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Erro ao atualizar status",
            error: error.errors ?? error.message,
        });
    }
};
