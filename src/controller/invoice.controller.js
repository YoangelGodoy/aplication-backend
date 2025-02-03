import { InvoiceModel } from '../models/invoice.model.js';
import { ForeignValidations } from '../models/ForeignValidations.js';
// api/v1/invoiceCreate
const createInvoice = async (req, res) => {
    try {
        const { clientPayment_id, issue_date, total_amount, description } = req.body;

        if (!clientPayment_id || !issue_date || !total_amount) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: clientPayment_id, issue_date, total_amount" });
        }
        const clientPaymentExists = await ForeignValidations.clientPaymentExists(clientPayment_id)
        if(!clientPaymentExists){
            return res.status(400).json({ ok: false, msg: "The payment does not exist" });
        } 
        const newInvoice = await InvoiceModel.createInvoice({
            clientPayment_id,
            issue_date,
            total_amount,
            description
        });

        return res.status(201).json({ ok: true, msg: "Invoice registered successfully", invoice: newInvoice });
    } catch (error) {
        console .log(error);
        return res.status(500).json({
            ok: false,
            message: "Error registering invoice",
            error
        });
    }
};

// api/v1/invoice/:id
const getInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await InvoiceModel.findInvoiceById(id);

        if (!invoice) {
            return res.status(404).json({ ok: false, msg: "Invoice not found" });
        }

        return res.json({
            ok: true,
            invoice
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving invoice"
        });
    }
};

// /api/v1/invoices
const listInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceModel.getAllInvoices();
        return res.json({
            ok: true,
            invoices
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving invoices"
        });
    }
};

// /api/v1/invoiceDelete/:id
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await InvoiceModel.deleteInvoice(id);
        
        if (!deletedInvoice) {
            return res.status(404).json({ ok: false, msg: "Invoice not found" });
        }

        return res.json({ ok: true, msg: "Invoice deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting invoice"
        });
    }
};

export const InvoiceController = {
    createInvoice,
    getInvoice,
    listInvoices,
    deleteInvoice
};