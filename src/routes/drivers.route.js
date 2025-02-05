import { Router } from 'express';
import { DriverController } from '../controller/driver.controller.js';
import { verifyAsist, verifyToken } from '../middelware/jwt.middelware.js';

const router = Router();


router.get('/drivers', verifyToken, verifyAsist, DriverController.listDrivers); // Obtener todos los conductores
router.get('/driver/:id',verifyToken, verifyAsist, DriverController.getDriver); // Obtener un conductor por ID
router.get('/states', verifyToken, verifyAsist, DriverController.listStates); 
router.get('/municipality', verifyToken, verifyAsist, DriverController.listMunicipality); 
router.post('/drivercreate',verifyToken, verifyAsist, DriverController.createDriver);
router.put('/driverUpdate/:id', verifyToken, verifyAsist, DriverController.updateDriver); 
router.delete('/driverDelete/:id', verifyToken, verifyAsist, DriverController.deleteDriver);

export default router;