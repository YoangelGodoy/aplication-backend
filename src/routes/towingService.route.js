import { Router } from 'express';
import { TowingServiceController } from '../controller/towing_service.controller.js';
import { verifyAdmin, verifyAsist, verifyToken } from '../middelware/jwt.middelware.js';

const router = Router();



router.get('/towingServices', verifyAsist, verifyToken, TowingServiceController.listTowingServices);
router.get('/towingService/:id', verifyAsist, verifyToken,TowingServiceController.getTowingService); 
router.post('/towingServiceCreate', verifyAsist, verifyToken,TowingServiceController.createTowingService);  
router.put('/towingServiceUpdate/:id',verifyAsist, verifyToken, TowingServiceController.updateTowingService);  
router.delete('/towingServiceDelete/:id', verifyAsist, verifyToken,TowingServiceController.deleteTowingService); 

export default router;