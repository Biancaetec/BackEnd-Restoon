import database from '../../db/connection.js';

export async function findAll() {
    try {
        const query = "SELECT id_usuario, nome, email, senha from usuario;";
        const statement = database.prepare(query);
        //statement.finalize();
        const usuario = statement.all();
        return usuario;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching users: " + error.message);
        
    } 
}

export async function create(userData) {
    try {
        const query = "INSERT INTO usuario (nome, email) VALUES (?, ?);";
        const statement = database.prepare(query);
        const result = statement.run(userData.nome, userData.email);
        return result;

    } catch (error) {
        console.log(error);
        throw new Error("Error creating user: " + error.message);
    } 
}
