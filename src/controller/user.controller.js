import bcryptjs from 'bcryptjs'
import { findUserByEmail } from '../data/data.js';
import { data } from "../data/data.js";
import jwt from 'jsonwebtoken';

// /api/v1/users/register
const register = async (req, res) => {
    try {
        const {  name, lastname, email, password, phone} = req.body

        if ( !name || !lastname || !email || !password || !phone ) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password, username" })
        }

        
        const emailExist = findUserByEmail(email);
        if (emailExist) { 
            return res.status(409).json({ ok: false, msg: "Email already exists" }); 
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = {id: (data.users.length + 1).toString(), name, lastname, email, password: hashedPassword, phone};

        data.users.push(newUser);

        const token = jwt.sign(
            { email: newUser.email },
            process.env.WORD_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({ok:true, msg: token});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok:false,
            message: "Error en el register register",error 
        });
    }
}

// /api/v1/users/login
const login = async (req, res, newUser) => {
    try {
        const {email, password} = req.body;

        if(!email || ! password){
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password" })        
        }

        const userExist = findUserByEmail(email)
        if (!userExist){
            return res.status(404).json({ ok: false, msg: "User not found"})
        }

        const comparePassword = await password === userExist.password

        if(!comparePassword){
            return res.status(400).json({ok: false, msg: "Password incorrect" })
        }

        const token = jwt.sign(
            { email: userExist.email },
            process.env.WORD_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ok:true, msg: token});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok:false,
            message: "Error en el registro login" 
        });
    }
}

const profile = async (req, res) =>{
    try{
        const user = findUserByEmail(req.email);

        if (!user) {
            return res.status(404).json({ ok: false, message: "User not found" });
        }

        return res.json({
            ok: true,
            msg: user
          });

    }catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok:false,
            message: "Error en el registro login" 
        });
    }
} 

export const UserController = {
    register,
    login,
    profile
}