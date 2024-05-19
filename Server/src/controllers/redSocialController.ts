import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import RedSocial from '../models/red_social'


class RedSocialController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    public async eliminarRed(req: Request, res:Response)
    {
        console.log("Borrando una Red");
        const redSocial = await RedSocial.findByIdAndDelete(req.params.id)
        res.json(redSocial)
    }
    
    //Mostar todas las redes
    public async mostrar_todas_redes(req: Request, res: Response ): Promise<void>{
        console.log("Mostrando todas las redes");
        const redSocial = await RedSocial.find()
        res.json(redSocial)
    }
}


export const redSocialController = new RedSocialController();