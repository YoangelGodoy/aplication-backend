import { Router } from 'express';
import { DriverPaymentController } from '../controller/driver_payment.controller.js';
import { verifyAdmin, verifyAsist } from '../middelware/jwt.middelware.js';

const router = Router();

router.use(verifyAdmin)
router.use(verifyAsist);

router.get('/driverPayments', DriverPaymentController.listPayments);
router.get('/driverPayment/:id', DriverPaymentController.getPayment);
router.post('/driverPaymentCreate', DriverPaymentController.createPayment);
router.put('/driverPaymentUpdate/:id', DriverPaymentController.updatePayment);
router.delete('/driverPaymentDelete/:id', DriverPaymentController.deletePayment);

export default router;