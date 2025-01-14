import { Router } from "express";
import { TowTruckController } from '../controller/towTruck.controller.js';
import { verifyToken } from "../middelware/jwt.middelware.js";

const router = Router();

router.use(verifyToken);

router.post('/towTruckCreate', TowTruckController.createTowTruck);
router.get('/towTruck/:id', TowTruckController.getTowTruck);
router.get('/Towtrucks', TowTruckController.listTowTrucks);
router.put('/towTruckUpdate/:id', TowTruckController.updateTowTruck);
router.delete('/towTruckDelete/:id', TowTruckController.deleteTowTruck);

export default router;