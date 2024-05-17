import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Usuario from '../models/usuario.model'


class RedSocialController {

    constructor() {
        connectDB();
    }
    //aqui va el crud

}


export const redSocialController = new RedSocialController();