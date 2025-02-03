import { Router } from 'express';
import { ClientPaymentController } from '../controller/clientPayment.controller.js';

const router = Router();

router.post('/clientPaymentCreate', ClientPaymentController.createPayment);
router.get('/clientPayment/:id', ClientPaymentController.getPayment);
router.get('/clientPayments', ClientPaymentController.listPayments);
router.put('/clientPaymentUpdate/:id', ClientPaymentController.updatePaymentStatus);
router.delete('/clientPaymentDelete/:id', ClientPaymentController.deletePayment);

export default router;