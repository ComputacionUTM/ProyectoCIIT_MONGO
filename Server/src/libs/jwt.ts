import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
export function createAccesToken(payload: any) {
    dotenv.config();
    return new Promise((resolve, reject) => {
        jwt.sign(payload,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            }
        );
    })
} 
