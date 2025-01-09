import {db} from '../conection/conec.database.js'

const create = async ({name, lastname, email, password}) => {
    const query = {
        text:`
        INSERT INTO users (name, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING name, lastname, email, id_user
        `,
        values:[name, lastname, email, password] 
    }    
    const {rows} = await db.query(query)
    return rows[0]
}

const findUserByEmail = async (email) => {
    const query = {
    text:`
    SELECT id_user, name, lastname, email FROM users 
    WHERE email = $1
    `,
    values:[email]
    }
    const {rows} = await db.query(query)
    const row = rows[0]
    console.log("Aqui findUserByEmail row:", row)
    return row
}


export const UserModel = {
    create,
    findUserByEmail
}