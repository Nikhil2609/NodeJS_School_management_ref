import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.token as string || "";
    console.log("authenticateToken=>", token)

    // check if token is present 
    if (!token) {
        return res.status(400).json({ token: "Invalid Token" })
    }

    // verify token
    try {
        const secretKey = process.env.JWT_SECRET_KEY as string;
        const user = jwt.verify(token, secretKey);
        
        (req as any).user = user; // we can use this user data for CRUD operation based on token
        next();
    } catch (error) {
        res.status(401).json({ token: "Unauthorized" })
    };
}

export const generateToken = (payload: any) => {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const generatedToken = jwt.sign(payload, secretKey);
    return generatedToken
}