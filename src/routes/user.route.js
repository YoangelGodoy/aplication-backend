import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { verifyAdmin, verifyToken } from "../middelware/jwt.middelware.js";


const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(verifyToken);

router.get('/logout', UserController.logoutUser);
router.get('/profile', UserController.profile);
router.post('/resetPassword', UserController.resetPassword);

router.use(verifyAdmin);

router.get('/user/:id', UserController.getUser);
router.get('/users', UserController.usersList);
router.put('/userRolUpdate/:id', UserController.userRolUpdate);
router.delete('/delete/:id', UserController.userDelete);


export  default router;