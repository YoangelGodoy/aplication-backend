import { DriverPaymentModel } from '../models/driver_payment.model.js';
import { ForeignValidations } from '../models/ForeignValidations.js';

// api/v1/driverPaymentCreate
const createPayment = async (req, res) => {
    try {
        const { driver_id, payment_date, amount, description } = req.body;

        if (!driver_id || !payment_date || !amount) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: driver_id, payment_date, amount" });
        }
        console.log("aqui 1")
        const exisst = await ForeignValidations.driverExists(driver_id);
        console.log("aqui 2")
        if(!exisst){
            return res.status(400).json({ ok: false, msg: "The driver does not exist" });
        }
        console.log("aqui 3")
        const newPayment = await DriverPaymentModel.createPayment({
            driver_id,
            payment_date,
            amount,
            description
        });

        return res.status(201).json({ ok: true, msg: "Payment registered successfully", payment: newPayment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error registering payment",
            error
        });
    }
};

// api/v1/driverPayment/:id
const getPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await DriverPaymentModel.findPaymentById(id);

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

// /api/v1/driverPayments
const listPayments = async (req, res) => {
    try {
        const payments = await DriverPaymentModel.getAllPayments();
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

// /api/v1/driverPaymentUpdate/:id
const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { driver_id, payment_date, amount, description } = req.body;

        const updatedPayment = await DriverPaymentModel.updatePayment(id, {
            driver_id,
            payment_date,
            amount,
            description
        });

        if (!updatedPayment) {
            return res.status(404).json({ ok: false, msg: "Payment not found" });
        }

        return res.json({ ok: true, msg: "Payment updated successfully", payment: updatedPayment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating payment"
        });
    }
};

// /api/v1/driverPaymentDelete/:id
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await DriverPaymentModel.deletePayment(id);
        
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

export const DriverPaymentController = {
    createPayment,
    getPayment,
    listPayments,
    updatePayment,
    deletePayment
};