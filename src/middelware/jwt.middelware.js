import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    token = token.split(" ")[1];

    try {
        // Verificar si el token está en la lista negra
        const isBlacklisted = await UserModel.isTokenBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({ error: "Token invalidado, por favor inicie sesión nuevamente." });
        }

        const { email, rol_id} = jwt.verify(token, process.env.WORD_SECRET);
        req.email = email;
        req.rol_id = rol_id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Invalid token" });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.rol_id === 6) {
        return next()
    }

    return res.status(403).json({ error: "Unauthorized only admin user" })
}

export const verifyAsist = (req, res, next) => {
    if (req.rol_id === 7 || req.rol_id === 6) {
        return next()
    }
    return res.status(403).json({ error: "Unauthorized only driver user" })
}