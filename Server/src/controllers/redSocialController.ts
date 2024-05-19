import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import RedSocial from '../models/red_social'


class RedSocialController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    public async eliminarRed(req: Request, res: Response) {
        console.log("Borrando una Red");
        const redSocial = await RedSocial.findByIdAndDelete(req.params.id)
        res.json(redSocial)
    }

    //Mostar todas las redes
    public async mostrar_todas_redes(req: Request, res: Response): Promise<void> {
        console.log("Mostrando todas las redes");
        const redSocial = await RedSocial.find()
        res.json(redSocial)
    }

    //Mostar una red
    public async listOne(req: Request, res: Response): Promise<void> {
        console.log("Mostrando una red");
        const redSocial = await RedSocial.findById(req.params.id)
        res.json(redSocial)
    }

    public async createRedSocial(req: Request, res: Response): Promise<void> {
        const { nombre, enlace, foto } = req.body;
        try {
            console.log("ENTRANDO...");

            const nuevaRedSocial = new RedSocial(
                {
                    nombre,
                    enlace,
                    foto
                })
            console.log(nuevaRedSocial);

            const redSocialGuardada = await nuevaRedSocial.save();
            res.json(
                {
                    nombre: redSocialGuardada.nombre,
                    enlace: redSocialGuardada.enlace,
                    foto: redSocialGuardada.foto,
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async actualizarRed(req: Request, res: Response): Promise<void> {
        console.log("Actualizando una red");
        const redSocial = await RedSocial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(redSocial);
    }
}


export const redSocialController = new RedSocialController();