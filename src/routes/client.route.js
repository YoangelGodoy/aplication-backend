import {Router} from 'express';
import { ClientController } from '../controller/client.controller.js';
import { verifyToken, verifyAsist } from '../middelware/jwt.middelware.js';

const router = Router();

router.get('/clients', verifyToken, verifyAsist, ClientController.listClients);
router.get('/client/:id', verifyToken, verifyAsist, ClientController.getClient);
router.post('/clientCreate', verifyToken, verifyAsist, ClientController.createClient);
router.put('/clientUpdate/:id', verifyToken, verifyAsist, ClientController.updateClient);
router.delete('/clientDelete/:id', verifyToken, verifyAsist, ClientController.deleteClient)

export default router;