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
        
    } finally {
        
        database.close();
    }
}
