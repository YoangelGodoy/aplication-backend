import { db } from '../conection/conec.database.js';

// Función para crear un nuevo cliente
const createClient = async ({ id, name, lastname, municipality_id, phone }) => {
    const query = {
        text: `
        INSERT INTO client (id, name, lastname, municipality_id, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, lastname, municipality_id, phone
        `,
        values: [id, name, lastname, municipality_id, phone]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para encontrar un cliente por su ID
const findClientById = async (id) => {
    const query = {
        text: `
        SELECT id, name, lastname, municipality_id, phone FROM client
        WHERE id = $1
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para obtener todos los clientes
const getAllClients = async () => {
    const query = {
        text: `
        SELECT id, name, lastname, municipality_id, phone, created_at FROM client
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

// Función para actualizar un cliente
const updateClient = async (id, { name, lastname, municipality_id, phone }) => {
    const query = {
        text: `
        UPDATE client
        SET name = $1, lastname = $2, municipality_id = $3, phone = $4
        WHERE id = $5
        RETURNING id, name, lastname, municipality_id, phone
        `,
        values: [name, lastname, municipality_id, phone, id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para eliminar un cliente
const deleteClient = async (id) => {
    const query = {
        text: `
        DELETE FROM client
        WHERE id = $1
        RETURNING id
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

export const ClientModel = {
    createClient,
    findClientById,
    getAllClients,
    updateClient,
    deleteClient
};