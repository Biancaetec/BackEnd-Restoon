import { connectDB } from '../../db/connection.js';

export async function findAll() {
    try {
        const db = await connectDB();
        const query = "SELECT * FROM restaurante;";
        const statement = db.prepare(query);
        const result = statement.all();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar restaurantes: " + error.message);
    }
}

export async function create(data) {
    try {
        const db = await connectDB();
        const query = `
            INSERT INTO restaurante (nome, email, senha, criado_em, status_licenciamento)
            VALUES (?, ?, ?, ?, ?);
        `;
        const statement = db.prepare(query);
        const result = statement.run(data.nome, data.email, data.senha, data.criado_em, data.status_licenciamento);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao criar restaurante: " + error.message);
    }
}

export async function update(id, data) {
    try {
        const db = await connectDB();
        const query = `
            UPDATE restaurante
            SET nome = ?, email = ?, senha = ?, criado_em = ?, status_licenciamento = ?
            WHERE id_restaurante = ?;
        `;
        const statement = db.prepare(query);
        const result = statement.run(data.nome, data.email, data.senha, data.criado_em, data.status_licenciamento, id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar restaurante: " + error.message);
    }
}

export async function remove(id) {
    try {
        const db = await connectDB();
        const query = "DELETE FROM restaurante WHERE id_restaurante = ?;";
        const statement = db.prepare(query);
        const result = statement.run(id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao remover restaurante: " + error.message);
    }
}

export async function updateStatusLicenciamento(id, status) {
    try {
        const db = await connectDB();
        const query = `
            UPDATE restaurante
            SET status_licenciamento = ?
            WHERE id_restaurante = ?;
        `;
        const statement = db.prepare(query);
        const result = statement.run(status, id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar status de licenciamento: " + error.message);
    }
}
