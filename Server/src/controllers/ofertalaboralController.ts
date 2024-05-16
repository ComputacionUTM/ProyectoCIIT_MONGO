import { Request, Response } from 'express';
import { connectDB } from '../database'; //acceso a la base de datos
import ofertaLaboralModel from '../models/ofertaLaboral.model';


class OfertaLaboralController {

    constructor() {
        connectDB();
    }
    //aqui va el crud

    public async getOfertasLaborales(req: Request, res: Response): Promise<void> {
        console.log("Mostrando todas las ofertas laborales");
        const ofertas = await ofertaLaboralModel.find()
        res.json(ofertas)
    }

    public async getOfertaLaboral(req: Request, res: Response): Promise<void> {
        console.log("Mostrando una oferta laboral");
        const oferta = await ofertaLaboralModel.findById(req.params.id)
        res.json(oferta)
    }

    
}

export const ofertaLaboralController = new OfertaLaboralController();