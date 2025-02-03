import { db } from '../conection/conec.database.js';

const createPayment = async ({ driver_id, payment_date, amount, description }) => {
    const query = {
        text: `
        INSERT INTO driver_payment (driver_id, payment_date, amount, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id, driver_id, payment_date, amount, description
        `,
        values: [driver_id, payment_date, amount, description]
    };
    const { rows } = await db.query(query);
    return rows[0];
};


const findPaymentById = async (id) => {
    const query = {
        text: `
        SELECT id, driver_id, payment_date, amount, description FROM driver_payment 
        WHERE id = $1
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};


const getAllPayments = async () => {
    const query = {
        text: `
        SELECT id, driver_id, payment_date, amount, description FROM driver_payment
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};


const updatePayment = async (id, { driver_id, payment_date, amount, description }) => {
    const query = {
        text: `
        UPDATE driver_payment
        SET driver_id = $1, payment_date = $2, amount = $3, description = $4
        WHERE id = $5
        RETURNING id, driver_id, payment_date, amount, description
        `,
        values: [driver_id, payment_date, amount, description, id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};


const deletePayment = async (id) => {
    const query = {
        text: `
        DELETE FROM driver_payment
        WHERE id = $1
        RETURNING id
        `,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

export const DriverPaymentModel = {
    createPayment,
    findPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment,
};