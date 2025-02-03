import { db } from '../conection/conec.database.js';

const clientPaymentExists = async (clientPayment_id) => {
    const query = {
        text: `
        SELECT * FROM client_payment 
        WHERE id_payment = $1
        `,
        values: [clientPayment_id]
    };
    const { rows } = await db.query(query);
    return rows.length > 0; 
};
const serviceExists = async (service_id) => {
    const query = {
        text: `
        SELECT * FROM towing_service 
        WHERE id_service = $1
        `,
        values: [service_id]
    };
    const { rows } = await db.query(query);
    return rows.length > 0; 
};

const driverExists = async (driver_id) => {
    const query = {
        text: `
        SELECT * FROM driver 
        WHERE id_driver = $1
        `,
        values: [driver_id]
    };
    const { rows } = await db.query(query);
    return rows.length > 0; 
};

const clientExists = async (client_id) => {
    const query = {
        text: `
        SELECT * FROM client 
        WHERE id = $1
        `,
        values: [client_id]
    };
    const { rows } = await db.query(query);
    return rows.length > 0;
};

const towTruckExists = async (towTruck_id) => {
    const query = {
        text: `
        SELECT * FROM tow_truck 
        WHERE id = $1
        `,
        values: [towTruck_id]
    };
    const { rows } = await db.query(query);
    return rows.length > 0; 
};

const typeOfVehicleExists = async (typeOfVehicle_id) => {
    const query = {
        text: `
        SELECT * FROM type_vehicle 
        WHERE id_type_vehicle = $1
        `,
        values: [typeOfVehicle_id]
    };
    const { rows } = await db.query(query);
    return rows.length > 0; 
};

export const ForeignValidations = {
    clientExists,
    towTruckExists,
    typeOfVehicleExists,
    serviceExists,
    driverExists,
    clientPaymentExists
}