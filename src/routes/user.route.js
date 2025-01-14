import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { verifyToken } from "../middelware/jwt.middelware.js";


const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(verifyToken);

router.get('/logout', UserController.logoutUser);
router.get('/profile', UserController.profile);
router.post('/resetPassword', UserController.resetPassword);
router.get('/users', UserController.usersList);
router.get('/user/:id', UserController.getUser);
router.put('/userUpdate/:id', UserController.userUpdate);
router.delete('/delete/:id', UserController.userDelete);

export  default router;