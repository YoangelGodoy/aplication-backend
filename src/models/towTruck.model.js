import { db } from '../conection/conec.database.js';

// Función para crear un nuevo registro de grua
const createTowTruck = async ({ id, model_id, status, type}) => {
    const query = {
        text: `
        INSERT INTO tow_truck (id, model_id, status, type)
        VALUES ($1, $2, $3, $4)
        RETURNING id, model_id, status, type
        `,
        values: [id, model_id, status, type]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para encontrar una grua por su ID
const findTowTruckById = async (id) => {
    const query = {
        text: `
        SELECT id, model_id, status, type FROM tow_truck 
        WHERE id = $1
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para obtener todos los registros de gruas
const getAllTowTruck = async () => {
    const query = {
        text: `
        SELECT id, model_id, status, type FROM tow_truck
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

// Función para actualizar un registro de una grúa
const updateTowTruck = async (id, { model_id, status, type }) => {
    const query = {
        text: `
        UPDATE tow_truck
        SET model_id = $1, status = $2, type = $3
        WHERE id = $4
        RETURNING id, model_id, status, type
        `,
        values: [model_id, status, type, id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para eliminar un conductor
const deleteTowTruck = async (id) => {
    const query = {
        text: `
        DELETE FROM tow_truck
        WHERE id = $1
        RETURNING id
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    console.log("rows_delete:",rows[0])
    return rows[0]; 
};

export const towTruckModel = {
    createTowTruck,
    findTowTruckById,
    getAllTowTruck,
    updateTowTruck,
    deleteTowTruck
};