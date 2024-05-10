import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
export const validarToken = (req: Request, res: Response, next: NextFunction) =>
{
    dotenv.config();
    const bearerHeader = req.headers.bearer;
    if (typeof bearerHeader !== 'undefined')
    {
        const bearerToken = bearerHeader + "";
        console.log("Process env : ",process.env.TOKEN_SEGURIDAD)
        jwt.verify(bearerToken, process.env.TOKEN_SECRET || 'prueba', async (error, authData: any) =>
        {
            
            if (error)
            res.sendStatus(403);
            else
            next();
        });
    }
    else
    res.sendStatus(403);
}