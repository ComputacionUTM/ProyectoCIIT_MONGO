import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { connectDB } from '../database'; //acceso a la base de datos
import Empresa from '../models/empresa.model'


class EmpresaController {

    constructor() {
        connectDB();
    }
    //aqui va el crud
    /*
    nombre_empresa: string;
    direccion: string;
    rfc: string;
    descripcion: string;
    description: string;
    */
    public async createEmpresa(req: Request, res: Response): Promise<void> {
        const { nombre_empresa, direccion, rfc, descripcion,description} = req.body;
        try {
            console.log("ENTRANDO...");

            const nuevoEmpresa = new Empresa(
                {
                    nombre_empresa,
                    direccion,
                    rfc,
                    descripcion,
                    description
                })
            console.log(nuevoEmpresa);

            const empresaGuardado = await nuevoEmpresa.save();
            //const token = await createAccesToken({ id: usuarioGuardado._id });
            //res.cookie('token', token);
            res.json(
                {
                    id: empresaGuardado._id,
                    nombre_empresa: empresaGuardado.nombre_empresa,
                    direccion: empresaGuardado.direccion,
                    rfc: empresaGuardado.rfc,
                    descripcion:empresaGuardado.descripcion,
                    description:empresaGuardado.description,
                    createAt: empresaGuardado.createdAt,
                    updateAt: empresaGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /*public async mostrar_todos_usuarios(req: Request, res: Response): Promise<void> {
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
    }*/
    

}
//function decodeJWT(token: any) {
//    return (Buffer.from(token.split('.')[1], 'base64').toString());
//}

export const empresaController = new EmpresaController();