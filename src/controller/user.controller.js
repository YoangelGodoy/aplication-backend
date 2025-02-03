import bcryptjs from 'bcryptjs'
import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

// /api/v1/users/registerr
const register = async (req, res) => {
    try {
        console.log(req.body)
        const {name, lastname, email, password, id_user, rol_id, question1, answer1, question2, answer2} = req.body

        if (!name||!lastname||!email||!password||!id_user||!rol_id ||!question1 ||!answer1 ||!question2 ||!answer2) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password, name, lastname..." })
        }
         // validar name
         const valitedName = /^[A-Za-z]+$/
         if(!valitedName.test(name)){
             return res.status(400).json({ ok: false, msg: "Invalid characters name" });
         } 
         if(!valitedName.test(lastname)){
             return res.status(400).json({ ok: false, msg: "Invalid characters lastname" });
         } 
         

        const compareIdUser = await UserModel.compareIdUser(id_user);

        if(compareIdUser){
            return res.status(409).json({ ok: false, msg: "Id_user already exists" });
        }
        const user =  await UserModel.findUserByEmail(email);
        
        if (user) { 
            return res.status(409).json({ ok: false, msg: "Email already exists" }); 
        }
        
        const salt = await bcryptjs.genSalt(10)
        
        const hashedPassword = await bcryptjs.hash(password, salt);
        const hashedAnswer1 = await bcryptjs.hash(answer1, 10);
        const hashedAnswer2 = await bcryptjs.hash(answer2, 10);

        const userToCreate = {name, lastname, email, password: hashedPassword, id_user, rol_id, question1, answer1:hashedAnswer1, question2, answer2:hashedAnswer2}
        const newUser = await UserModel.create(userToCreate);
        
        
        const token = jwt.sign(
            { 
                id: userToCreate.id,
                email: userToCreate.email,
                name: userToCreate.name,
                lastname: userToCreate.lastname,
                rol_id: userToCreate.rol_id 
            },
            process.env.WORD_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({ok:true, message:"registro exitoso", token: token});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok:false,
            message: "Error en el register register",error 
        });
    }
}

// /api/v1/users/resetPassword
const resetPassword = async (req, res) => {
    const { email, answer1, answer2, newPassword } = req.body;

    try {
        const user = await UserModel.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ ok: false, msg: 'User not found' });
        }

        const areAnswersValid = await UserModel.verifySecurityAnswers(user.id, answer1, answer2);
        if (!areAnswersValid) {
            return res.status(400).json({ ok: false, msg: 'Respuestas de seguridad incorrectas' });
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);

        const result = await UserModel.updatePassword({ email, newPassword: hashedPassword });

        if (result.rowCount === 0) {
            return res.status(400).json({ ok: false, msg: 'No se pudo actualizar la contraseña' });
        }

        return res.status(200).json({ ok: true, msg: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        return res.status(500).json({ ok: false, msg: 'Error al restablecer la contraseña' });
    }
};

// /api/v1/users/login
const login = async (req, res) => {
    try {
        const {email, password } = req.body;

        if(!email || ! password){
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password" })        
        }

        const userExist = await UserModel.findUserByEmail(email)
        if (!userExist){
            return res.status(404).json({ ok: false, msg: "User not found"})
        }

        const comparePassword = await bcryptjs.compare(password, userExist.password)

        if(!comparePassword){
            return res.status(400).json({ok: false, msg: "Incorrect data" })
        }

        const token = jwt.sign(
            { 
                id: userExist.id,
                email: userExist.email,
                name: userExist.name,
                lastname: userExist.lastname,
                rol_id: userExist.rol_id
            },
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

const profile = async (req, res) => {
    try {
        const user = await UserModel.findUserByEmailSnPassword(req.email);
        
        if (!user) {
            return res.status(404).json({ ok: false, message: "User  not found" });
        }
        
        return res.json({
            user: user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            ok: false,
            message: "Error en el registro login" 
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ ok: false, message: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.WORD_SECRET);
        console.log("decoded:", decoded)
        const expiresAt = new Date(decoded.exp * 1000); // Convertir a milisegundos

        // Agregar el token a la lista negra
        const add = await UserModel.addTokenToBlacklist(token, expiresAt);

        return res.json({ ok: true, message: "Sesión cerrada exitosamente" });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return res.status(500).json({ ok: false, message: "Error al cerrar sesión" });
    }
}
 
const userRolUpdate = async (req, res)=>{
    try{
        const {id} = req.params;
        const {name, lastname, email, id_user, rol_id} = req.body;
        console.log("id:",id)
        const updateduser = await UserModel.updateRolUser(id, {
            name,
            lastname,
            email,
            id_user,
            rol_id
        });
        if(!updateduser){
            return res.status(404).json({ok: false, msg: "user not found"})
        }
        return res.json({ ok: true, msg: "user updated successfully", user: updateduser });
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error updating user"
        });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findUserById(id);

        if (!user) {
            return res.status(404).json({ ok: false, msg: "user not found" });
        }

        return res.json({
            ok: true,
            msg: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving user"
        });
    }
}

const usersList = async (req, res) =>{
    try {
        const users = await UserModel.listUsers();
        return res.json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error retrieving users"
        });
    }
}

const userDelete = async (req,res) =>{
    try{
        const { id } = req.params;
        const userdeleted = await UserModel.userDelete(id);

        if (!userdeleted) {
            return res.status(404).json({ ok: false, msg: "user not found" });
        }

        return res.json({ ok: true, msg: "user deleted successfully" });
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Error deleting user"
        });
    } 
} 

export const UserController = {
    register,
    resetPassword,
    login,
    profile,
    getUser,
    logoutUser,
    usersList,
    userRolUpdate,
    userDelete
}