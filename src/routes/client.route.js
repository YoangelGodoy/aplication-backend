import {Router} from 'express';
import { ClientController } from '../controller/client.controller.js';
import { verifyAsist } from '../middelware/jwt.middelware.js';

const router = Router();

router.use(verifyAsist);

router.get('/clients', ClientController.listClients);
router.get('/client/:id', ClientController.getClient);
router.post('/clientCreate', ClientController.createClient);
router.put('/clientUpdate/:id', ClientController.updateClient);
router.delete('/clientDelete/:id', ClientController.deleteClient)

export default router;