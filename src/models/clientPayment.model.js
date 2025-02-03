import { db } from '../conection/conec.database.js';

// Función para crear un nuevo pago de cliente
const createPayment = async ({ client_id, service_id, payment_date, payment_status, payment_method, amount, description }) => {
    const query = {
        text: `
        INSERT INTO client_payment (client_id, service_id, payment_date, payment_status, payment_method, amount, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id_payment, client_id, service_id, payment_date, payment_status, payment_method, amount, description
        `,
        values: [client_id, service_id, payment_date, payment_status, payment_method, amount, description]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

// Función para encontrar un pago por su ID
const findPaymentById = async (id_payment) => {
    const query = {
        text: `
        SELECT * FROM client_payment 
        WHERE id_payment = $1
        `,
        values: [id_payment]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para obtener todos los pagos de clientes
const getAllPayments = async () => {
    const query = {
        text: `
        SELECT * FROM client_payment
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

// Función para actualizar solo el payment_status
const updatePaymentStatus = async (id_payment, { payment_status }) => {
    const query = {
        text: `
        UPDATE client_payment
        SET payment_status = $1
        WHERE id_payment = $2
        RETURNING id_payment, payment_status
        `,
        values: [payment_status, id_payment]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

// Función para eliminar un pago
const deletePayment = async (id_payment) => {
    const query = {
        text: `
        DELETE FROM client_payment
        WHERE id_payment = $1
        RETURNING id_payment
        `,
        values: [id_payment]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

export const ClientPaymentModel = {
    createPayment,
    findPaymentById,
    getAllPayments,
    updatePaymentStatus,
    deletePayment,
};