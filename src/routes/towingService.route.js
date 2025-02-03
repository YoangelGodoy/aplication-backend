import { Router } from 'express';
import { TowingServiceController } from '../controller/towing_service.controller.js';
import { verifyAdmin, verifyAsist } from '../middelware/jwt.middelware.js';

const router = Router();


router.use(verifyAdmin);
router.use(verifyAsist);


router.get('/towingServices', TowingServiceController.listTowingServices);
router.get('/towingService/:id', TowingServiceController.getTowingService); 
router.post('/towingServiceCreate', TowingServiceController.createTowingService);  
router.put('/towingServiceUpdate/:id', TowingServiceController.updateTowingService);  
router.delete('/towingServiceDelete/:id', TowingServiceController.deleteTowingService); 

export default router;