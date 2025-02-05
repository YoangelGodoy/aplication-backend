import { db } from '../conection/conec.database.js';

// Función para crear un nuevo conductor
const createDriver = async ({ id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license }) => {
    const query = {
        text: `
        INSERT INTO driver (id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license
        `,
        values: [id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para encontrar un conductor por su ID
const findDriverById = async (id_driver) => {
    const query = {
        text: `
        SELECT id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license FROM driver 
        WHERE id_driver = $1
        `,
        values: [id_driver]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para obtener todos los conductores
const getAllDrivers = async () => {
    const query = {
        text: `
        SELECT id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license, created_at FROM driver
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

// Función para actualizar un conductor
const updateDriver = async (id_driver, { name_driver, lastname_driver, phone, fkid_municipality, status_driver, license }) => {
    const query = {
        text: `
        UPDATE driver
        SET name_driver = $1, lastname_driver = $2, phone = $3, fkid_municipality = $4, status_driver = $5, license = $6
        WHERE id_driver = $7
        RETURNING id_driver, name_driver, lastname_driver, phone, fkid_municipality, status_driver, license
        `,
        values: [name_driver, lastname_driver, phone, fkid_municipality, status_driver, license, id_driver]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para eliminar un conductor
const deleteDriver = async (id_driver) => {
    const query = {
        text: `
        DELETE FROM driver
        WHERE id_driver = $1
        RETURNING id_driver
        `,
        values: [id_driver]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};
const getAllStates = async () => {
    const query = {
        text: `
        SELECT * FROM state
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

const getAllMunicipality = async () => {
    const query = {
        text: `
        SELECT * FROM municipality
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

export const DriverModel = {
    createDriver,
    findDriverById,
    getAllDrivers,
    updateDriver,
    deleteDriver,
    getAllStates,
    getAllMunicipality
};