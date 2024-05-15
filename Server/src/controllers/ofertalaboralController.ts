import { Request, Response } from 'express';
import { connectDB } from '../database'; //acceso a la base de datos
import ofertaLaboralModel from '../models/ofertaLaboral.model';


class OfertaLaboralController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    
}

export const ofertaLaboralController = new OfertaLaboralController();