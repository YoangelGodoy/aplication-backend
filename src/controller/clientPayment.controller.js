import { ClientPaymentModel } from '../models/clientPayment.model.js';
import { ForeignValidations } from '../models/ForeignValidations.js';

// api/v1/clientPaymentCreate
const createPayment = async (req, res) => {
    try {
        const { client_id, service_id, payment_date, payment_status, payment_method, amount, description } = req.body;

        if (!client_id || !service_id || !payment_date || !amount || !payment_status || !payment_method) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: client_id, service_id, payment_date, amount, payment_status, payment_method" });
        }
        const clientExists = await ForeignValidations.clientExists(client_id);
        if (!clientExists) {
            return res.status(400).json({ ok: false, msg: "The client does not exist" });
        }
        const serviceExists = await ForeignValidations.serviceExists(service_id)
        if(!serviceExists){
            return res.status(400).json({ ok: false, msg: "The service does not exist" });
        }
        const validStatuses = ["Pendiente", "Completado"];
        if (!validStatuses.includes(payment_status)) {
            return res.status(400).json({ ok: false, msg: "invalid status values( Pendiente, Completado)" });
        }
        const newPayment = await ClientPaymentModel.createPayment({
            client_id,
            service_id,
            payment_date,
            payment_status,
            payment_method,
            amount,
            description
        });

        return res.status(201).json({ ok: true, msg: "Payment registered successfully", payment: newPayment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error registering payment",
            error: error.message
        });
    }
};

// api/v1/clientPayment/:id
const getPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await ClientPaymentModel.findPaymentById(id);

        if (!payment) {
            return res.status(404).json({ ok: false, msg: "Payment not found" });
        }

        return res.json({
            ok: true,
            payment
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving payment"
        });
    }
};

// /api/v1/clientPayments
const listPayments = async (req, res) => {
    try {
        const payments = await ClientPaymentModel.getAllPayments();
        return res.json({
            ok: true,
            payments
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving payments"
        });
    }
};

// /api/v1/clientPaymentUpdate/:id
const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_status } = req.body; 

        if (!payment_status) {
            return res.status(400).json({ ok: false, msg: "Missing required field: payment_status" });
        }

        const updatedPayment = await ClientPaymentModel.updatePaymentStatus(id, {
            payment_status
        });

        if (!updatedPayment) {
            return res.status(404).json({ ok: false, msg: "Payment not found" });
        }

        return res.json({ ok: true, msg: "Payment status updated successfully", payment: updatedPayment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating payment status"
        });
    }
};

// /api/v1/clientPaymentDelete/:id
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await ClientPaymentModel.deletePayment(id);
        
        if (!deletedPayment) {
            return res.status(404).json({ ok: false, msg: "Payment not found" });
        }

        return res.json({ ok: true, msg: "Payment deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting payment"
        });
    }
};

export const ClientPaymentController = {
    createPayment,
    getPayment,
    listPayments,
    updatePaymentStatus,
    deletePayment
};