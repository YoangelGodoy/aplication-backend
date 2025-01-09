import { Router } from 'express';
import { DriverController } from '../controller/driver.controller.js';

const router = Router();

router.get('/drivers', DriverController.listDrivers); // Obtener todos los conductores
router.get('/driver/:id', DriverController.getDriver); // Obtener un conductor por ID
router.post('/drivercreate', DriverController.createDriver);
router.put('/driverUpdate/:id', DriverController.updateDriver); 
router.delete('/driverdelete/:id', DriverController.deleteDriver);

export default router;