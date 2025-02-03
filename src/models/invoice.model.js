import { db } from '../conection/conec.database.js';

const createInvoice = async ({ clientPayment_id, issue_date, total_amount, description }) => {

    const query = {
        text: `
        INSERT INTO invoice (clientPayment_id, issue_date, total_amount, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id_invoice, clientPayment_id, issue_date, total_amount, description
        `,
        values: [clientPayment_id, issue_date, total_amount, description]
    };
    const { rows } = await db.query(query);
    return rows[0];
};


const findInvoiceById = async (id_invoice) => {
    const query = {
        text: `
        SELECT * FROM invoice 
        WHERE id_invoice = $1
        `,
        values: [id_invoice]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};


const getAllInvoices = async () => {
    const query = {
        text: `
        SELECT * FROM invoice
        `,
        values: []
    };
    const { rows } = await db.query(query);
    return rows; 
};

const deleteInvoice = async (id_invoice) => {
    const query = {
        text: `
        DELETE FROM invoice
        WHERE id_invoice = $1
        RETURNING id_invoice
        `,
        values: [id_invoice]
    };
    const { rows } = await db.query(query);
    return rows[0]; 
};

export const InvoiceModel = {
    createInvoice,
    findInvoiceById,
    getAllInvoices,
    deleteInvoice,
};