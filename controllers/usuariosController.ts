import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Usuario from '../models/usuario.model'


class UsuariosController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    public async createUsuario(req: Request, res: Response): Promise<void> {
        const { usuario, correo, password } = req.body;
        try {
            console.log("ENTRANDO...");

            const nuevoUsuario = new Usuario(
                {
                    usuario,
                    correo,
                    password
                })
            console.log(nuevoUsuario);

            const usuarioGuardado = await nuevoUsuario.save();
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json(
                {
                    id: usuarioGuardado._id,
                    usuario: usuarioGuardado.usuario,
                    correo: usuarioGuardado.correo,
                    createAt: usuarioGuardado.createdAt,
                    updateAt: usuarioGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async mostrar_todos_usuarios(req: Request, res: Response): Promise<void> {
        console.log("Mostrando todos usuario");
        const usuarios = await Usuario.find()
        res.json(usuarios)
    }
    public async listOne(req: Request, res: Response): Promise<void> {
        console.log("Mostrando un usuario");
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    }

    public async borrarUsuario(req: Request, res: Response): Promise<void> {
        console.log("Borrando un usuario");
        const usuario = await Usuario.findByIdAndDelete(req.params.id)
        res.json(usuario)
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        console.log("Actualizando un usuario");
        const usuario = await Usuario.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(usuario)
    }
    

}
//function decodeJWT(token: any) {
//    return (Buffer.from(token.split('.')[1], 'base64').toString());
//}

export const usuariosController = new UsuariosController();