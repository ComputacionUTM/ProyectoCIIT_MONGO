import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
export const validarToken = (req: any, res: Response, next: NextFunction) => {
    dotenv.config();
    const palabraSecreta = process.env.TOKEN_SECRET
    console.log(req)
    console.log("valida",req.cookie);
    next();
    //const { token } = req.cookies;
    
    // console.log(token);
    // if (!token) {
    //     return res.status(401).json({ mensaj: "No token, autorización denegada" })
    // }
    // else {
    //     jwt.verify(token, palabraSecreta!, (err: any, user: any) => {
    //         if (err)
    //             return res.status(403).json({ mensaje: "token inválido" });
    //         console.log("usuario", user);
    //         req.usuario = user;
    //     })
    //     next();
    // }
}
