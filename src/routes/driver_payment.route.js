import { Router } from 'express';
import { DriverPaymentController } from '../controller/driver_payment.controller.js';
import { verifyAsist } from '../middelware/jwt.middelware.js';

const router = Router();


router.get('/driverPayments', verifyAsist,DriverPaymentController.listPayments);
router.get('/driverPayment/:id', verifyAsist,DriverPaymentController.getPayment);
router.post('/driverPaymentCreate', verifyAsist,DriverPaymentController.createPayment);
router.put('/driverPaymentUpdate/:id', verifyAsist,DriverPaymentController.updatePayment);
router.delete('/driverPaymentDelete/:id', verifyAsist,DriverPaymentController.deletePayment);

export default router;