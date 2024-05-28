import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Empresa from '../models/empresa.model';

class EmpresaController {

    constructor() {
    }

    public async createEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_empresa, direccion, rfc, descripcion, description, telefono, fotito } = req.body;
            const nuevoEmpresa = new Empresa({
                nombre_empresa,
                direccion,
                rfc,
                descripcion,
                description,
                telefono,
                fotito
            });
            const empresaGuardado = await nuevoEmpresa.save();
            res.json({
                id: empresaGuardado._id,
                nombre_empresa: empresaGuardado.nombre_empresa,
                direccion: empresaGuardado.direccion,
                rfc: empresaGuardado.rfc,
                descripcion: empresaGuardado.descripcion,
                description: empresaGuardado.description,
                telefono: empresaGuardado.telefono,
                fotito: empresaGuardado.fotito,
                createAt: empresaGuardado.createdAt,
                updateAt: empresaGuardado.updatedAt
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async mostrar_todos_empresa(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.find();
            res.json(empresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async actualizarEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });

            res.json(empresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async eliminarEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.findByIdAndDelete(req.params.id);
            //console.log(empresas);
            if (empresas == null) {
                //console.log("Probando...");
                res.json({ mensaje: "No existe ese dato para eliminar" });
            } else {
                res.json({ id: empresas.id, mensaje: "Empresa eliminada con exito" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    public async listOne(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.findById(req.params.id);
            res.json(empresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async listOneRestricciones(req: Request, res: Response): Promise<void> {
        const idEmpresa = req.params.id;
        const ofertas = await Empresa.aggregate([{
            $lookup: {
                from: "ofertalaboral",
                localField: "_id",
                foreignField: "id_empresa",
                as: "Ofertas"
            }
        }]);
        res.json(ofertas)
    }

    public async actualizarFotito(req: Request, res: Response): Promise<void> {
        try {
            const empresas = await Empresa.findByIdAndUpdate(req.params.id, { "fotito": "1" }, { new: true });
            res.json(empresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}

export const empresaController = new EmpresaController();
