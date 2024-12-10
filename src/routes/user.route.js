import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { verifyToken } from "../middelware/jwt.middelware.js";


const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', verifyToken, UserController.profile);

export  default router;