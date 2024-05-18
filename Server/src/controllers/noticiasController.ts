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
    public async mostrarNoticias(req: Request, res: Response): Promise<void> {
        const noticias = await Noticias.find()
        if(noticias.length == 0)
            res.json(false)
        else
            res.json(noticias)
    }

    public async mostrarNoticia(req: Request, res: Response): Promise<void> {
        console.log("Mostrar una noticia.");
        const { id } = req.params;
        const noticia = await Noticias.findById(id);
        res.json(noticia);
    }

    public async eliminarNoticia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const noticia = await Noticias.findByIdAndDelete(id);
        res.json(noticia);
    }

    public async actualizarNoticias(req: Request, res: Response): Promise<void> {
        console.log("Actualizando noticia");
        try
        {
            const noticia = await Noticias.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.json(noticia)
        }
        catch (error: any) 
        {
                res.status(500).json({ message: error.message });
        }
    
        }
}

export const noticiasController = new NoticiasController();