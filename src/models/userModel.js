import { connectDB } from '../../db/connection.js';

export async function findAll() {
    try {
        const database = await connectDB();
        const query = "SELECT id, username, email, senha FROM users;";
        const statement = database.prepare(query);
        const users = statement.all();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching users: " + error.message);
    }
}

export async function create(userData) {
    try {
        const database = await connectDB();
        const query = "INSERT INTO users (nome, email) VALUES (?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(userData.username, userData.email);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user: " + error.message);
    }
}

export async function remove(id) {
    try {
        const database = await connectDB();
        const query = "DELETE FROM users WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(id);
        if (result.changes === 0) {
            throw new Error("User not found");
        }
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting user: " + error.message);
    }
}

export async function update(id, userData) {
    try {
        const database = await connectDB();
        const query = "UPDATE users SET nome = ?, email = ? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(userData.username, userData.email, id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating user: " + error.message);
    }
}

export async function updateRole(id, role) {
    try {
        const database = await connectDB(); 
        const query = "UPDATE users SET role = ? WHERE id = ?;";
        const statement = database.prepare(query);
        const result = statement.run(role, id);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating user role: " + error.message);
    }
}