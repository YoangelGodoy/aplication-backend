import { db } from '../conection/conec.database.js';

const createTowingService = async ({ client_id, driver_id, towTruck_id, date, cost, typeOfVehicle_id, status_service, description }) => {
    const query = {
        text: `
        INSERT INTO towing_service (client_id, driver_id, towTruck_id, date, cost, typeOfVehicle_id, status_service, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id_service, client_id, driver_id, towTruck_id, date, cost, typeOfVehicle_id, status_service, description
        `,
        values: [client_id, driver_id, towTruck_id, date, cost, typeOfVehicle_id, status_service, description]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const findTowingServiceById = async (id_service) => {
    const query = {
        text: `
        SELECT * FROM towing_service 
        WHERE id_service = $1
        `,
        values: [id_service]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

const getAllTowingServices = async () => {
    const query = {
        text: 'SELECT * FROM towing_service',
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

const updateTowingServiceStatus = async (id_service, { status_service }) => {
    const query = {
        text: `
        UPDATE towing_service
        SET status_service = $1
        WHERE id_service = $2
        RETURNING id_service, status_service
        `,
        values: [status_service, id_service]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

const deleteTowingService = async (id_service) => {
    const query = {
        text: `
        DELETE FROM towing_service 
        WHERE id_service = $1 
        RETURNING id_service
        `,
        values: [id_service]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

export const TowingServiceModel = {
    createTowingService,
    findTowingServiceById,
    getAllTowingServices,
    updateTowingServiceStatus,
    deleteTowingService,
};