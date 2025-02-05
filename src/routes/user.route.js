import { Router } from "express";
import { UserController } from "../controller/user.controller.js";
import { verifyAdmin, verifyToken } from "../middelware/jwt.middelware.js";

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/resetPassword', UserController.resetPassword);
router.get('/logout', UserController.logoutUser);
router.get('/profile', UserController.profile);


router.put('/userUpdate/:id', verifyToken,  UserController.userUpdate);
router.get('/user/:id', verifyToken, verifyAdmin, UserController.getUser);
router.get('/users', verifyToken, verifyAdmin, UserController.usersList);
router.delete('/delete/:id', verifyToken, verifyAdmin, UserController.userDelete);

export default router;