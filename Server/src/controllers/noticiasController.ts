import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Noticias from '../models/noticias.model'


class NoticiasController {

    constructor() {
        connectDB();
    }
    
    public async createNoticia(req: Request, res: Response): Promise<void> {
        const { titulo, title, autor, fecha_publicacion,contenido,content} = req.body;
        try {
            console.log("ENTRANDO...");

            const nuevaNoticia = new Noticias(
                {
                    titulo,
                    title,
                    autor,
                    fecha_publicacion,
                    contenido,
                    content
                })
            console.log(nuevaNoticia);

            const noticiaGuardada = await nuevaNoticia.save();
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json(
                {
                    id: noticiaGuardada._id,
                    titulo: noticiaGuardada.titulo,
                    title: noticiaGuardada.title,
                    autor: noticiaGuardada.autor,
                    fecha_publicacion:noticiaGuardada.fecha_publicacion,
                    contenido:noticiaGuardada.contenido,
                    content:noticiaGuardada.content,
                    createAt: noticiaGuardada.createdAt,
                    updateAt: noticiaGuardada.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    

}

export const noticiasController = new NoticiasController();