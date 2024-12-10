import { Router } from "express";
import { TowTruckController } from '../controller/towTruck.controller.js';

const router = Router();

router.post('/towCreate', TowTruckController.createTowTruck);
router.get('/towTruck/:id', TowTruckController.getTowTruck);
router.get('/GetAllTowtruck', TowTruckController.listTowTrucks);
router.put('/towTruckUpdate/:id', TowTruckController.updateTowTruck);
router.delete('/towTruckDelete/:id', TowTruckController.deleteTowTruck);

export default router;