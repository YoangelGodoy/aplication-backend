import {db} from '../conection/conec.database.js'
import bcrypt from 'bcryptjs'

const create = async ({name, lastname, email, password, id_user, rol_id, question1, answer1, question2, answer2}) => {
    const query = {
        text:`
        INSERT INTO users (name, lastname, email, password, id_user, rol_id, security_question_1, answer_1, security_question_2, answer_2)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING name, lastname, email, id, id_user, rol_id, security_question_1, answer_1, security_question_2, answer_2
        `,
        values:[name, lastname, email, password, id_user, rol_id, question1, answer1, question2, answer2] 
    }    
    const {rows} = await db.query(query)
    return rows[0]
}

const findUserByEmail = async (email) => {
    const query = {
    text:`
    SELECT id, name, lastname, email, password, id_user, rol_id FROM users 
    WHERE email = $1
    `,
    values:[email]
    }
    const {rows} = await db.query(query)
    const row = rows[0]

    return row
}
const findUserByEmailSnPassword = async (email) => {
    const query = {
    text:`
    SELECT id, name, lastname, email, id_user, rol_id FROM users 
    WHERE email = $1
    `,
    values:[email]
    }
    const {rows} = await db.query(query)
    const row = rows[0]

    return row
}

const verifySecurityAnswers = async (id, answer1, answer2) => {
    const query = {
        text: `
        SELECT security_question_1, security_question_2, answer_1, answer_2 FROM users 
        WHERE id = $1`,
        values: [id],
    };
    const { rows } = await db.query(query);
    const user = rows[0];

    const isAnswer1Valid = await bcrypt.compare(answer1, user.answer_1);
    const isAnswer2Valid = await bcrypt.compare(answer2, user.answer_2);

    return isAnswer1Valid && isAnswer2Valid; 
}

const updatePassword = async ({email, newPassword}) => {
    const query = {
        text: `UPDATE users 
        SET password = $1 
        WHERE email = $2
        `,
        values: [newPassword, email],
    };
    return await db.query(query);
   
}

const compareIdUser = async (id_user) => {
    const query = {
    text:`
    SELECT id, name, lastname, email, id_user, rol_id FROM users 
    WHERE id_user = $1
    `,
    values:[id_user]
    }
    const {rows} = await db.query(query)
    const row = rows[0]

    return row
}

const listUsers = async () =>{
    const query = {
        text: `
        SELECT name, lastname, email, id_user, rol_id FROM users 
        `,
    }
    const {rows} = await db.query(query)
    return rows

}

const updateRolUser = async (id, {rol_id}) => {
    const query = {
        text:`
        UPDATE users
        SET rol_id = $1
        WHERE id = $2 
        RETURNING id, name, lastname, email, id_user, rol_id
        `,
        values:[rol_id, id]
    }
    const {rows} = await db.query(query)
    const row = rows[0]
    return row
}
const userDelete = async (id) => {
    const query = {
        text:`
        DELETE FROM users 
        WHERE id = $1
        RETURNING id
        `,
        values:[id]
    }
    const { rows } = await db.query(query);
    return rows[0]; 
}

const addTokenToBlacklist = async (token, expiresAt) => {
    const query = {
        text:`
        INSERT INTO blacklist_tokens (token, expires_at)
         VALUES ($1, $2)
        `,
        values: [token, expiresAt],
    };
    await db.query(query);
};

const isTokenBlacklisted = async (token) => {
    const query = {
        text:`
        SELECT * FROM blacklist_tokens 
        WHERE token = $1
        `,
        values: [token],
    };
    const { rows } = await db.query(query);
    return rows.length > 0; // Devuelve true si el token está en la lista negra
};

export const UserModel = {
    create,
    findUserByEmail,
    findUserByEmailSnPassword,
    verifySecurityAnswers,
    updatePassword,
    listUsers,
    updateRolUser,
    compareIdUser,
    userDelete,
    addTokenToBlacklist,
    isTokenBlacklisted
}