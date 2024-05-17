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

    public async mostrar_todos_empresa(req: Request, res: Response ): Promise<void>{
        console.log("Mostrando todas las empresas");
        const empresas = await Empresa.find()
        res.json(empresas)
    }

    public async actualizarEmpresa(req: Request, res: Response): Promise<void> {
       console.log("Actualizando la empresa");
       const empresas = await Empresa.findByIdAndUpdate(req.params,req.body,{new:true})
        res.json(empresas)
    }
    public async eliminarEmpresa(req: Request, res: Response): Promise<void> {
        console.log("Eliminado la empresa");
       const empresas = await Empresa.findByIdAndDelete(req.params)
        res.json(empresas)
    }

    public async listOne(req: Request, res: Response): Promise <void>{
        console.log("Mostrando a una empresa");
       const empresas = await Empresa.findById(req.params)
        res.json(empresas)
    }

    public async actualizarFotito(req: Request, res: Response): Promise<void> {
        console.log("Actualizando la variable fotito de una empresa empresas");
       const empresas = await Empresa.findByIdAndUpdate(req.params,req.body,{new:true})
        res.json(empresas)
    }


}
//function decodeJWT(token: any) {
//    return (Buffer.from(token.split('.')[1], 'base64').toString());
//}

export const empresaController = new EmpresaController();