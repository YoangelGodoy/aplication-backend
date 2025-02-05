import jwt from "jsonwebtoken";
import { UserModel } from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const { email, rol_id} = jwt.verify(token, process.env.WORD_SECRET);
    req.email = email;
    req.rol_id = rol_id;
    const user = await UserModel.findUserByLoginToken(token);

    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

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
    return res.status(403).json({ error: "Unauthorized only assit user" })
}