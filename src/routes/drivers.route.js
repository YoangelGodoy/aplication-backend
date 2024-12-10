import {Router} from 'express';
import { DriverController } from '../controller/driver.controller.js'; // Asegúrate de que la ruta sea correcta

const router = Router();

router.get('/GetAllDrivers', DriverController.listDrivers);
router.get('/driver/:id', DriverController.getDriver);
router.post('/driverCreate', DriverController.createDriver);
router.put('/driverUpdate/:id', DriverController.updateDriver);
router.delete('/driverDelete/:id', DriverController.deleteDriver);

export default router;