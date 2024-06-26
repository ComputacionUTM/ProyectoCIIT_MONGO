import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Empresa from '../models/empresa.model';
import ofertaLaboral from '../models/ofertaLaboral.model';

class EmpresaController {

    constructor() {
    }

    public async createEmpresa(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, direccion, rfc, ciudad, telefono, responsable } = req.body;
            const nuevoEmpresa = new Empresa({
                nombre,
                direccion,
                rfc,
                telefono,
                ciudad,
                responsable,
            });
            const empresaGuardado = await nuevoEmpresa.save();
            res.json({
                id: empresaGuardado._id,
                nombre: empresaGuardado.nombre,
                direccion: empresaGuardado.direccion,
                rfc: empresaGuardado.rfc,
                telefono: empresaGuardado.telefono,
                ciudad: empresaGuardado.ciudad,
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
        const ofertas = await Empresa.aggregate([
            {
                $lookup: {
                    from: "ofertas",
                    localField: "_id",
                    foreignField: "empresa_id",
                    as: "Oferta_e"
                }
                
            }, 
            {
                $lookup: {
                from: "detalleofertas",
                localField: "Oferta_e._id",
                foreignField: "detalleOferta_id",
                as: "DetalleOfertas"
            }

            },
            {
                $match: {ciudad:"Oaxaca"}
            },
            {
                $project:{
                    nombre: 1,
                    horario : '$DetalleOfertas.horario'
                }
            }
            ]);
        res.json(ofertas)
    }

    public async listConMerge(req: Request, res: Response): Promise<void> {
        const ofertas = await Empresa.aggregate([{

            $lookup: {
                from: "ofertalaboral",
                localField: "_id",
                foreignField: "empresa_id",
                as: "ofertaLaboral"
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$ofertaLaboral', 0] }, "$$ROOT"]
                }
            }
        }
        ]);
        res.json(ofertas)
    }

    public async ListMergeProjection(req: Request, res: Response): Promise<void> {
        const ofertas = await Empresa.aggregate([
            {
                $lookup:
                {
                    from: "ofertalaboral",
                    localField: "_id",
                    foreignField: "empresa_id",
                    as: "ofertaLaboral"
                }
            },
            {
                $replaceRoot:
                {
                    newRoot:
                    {
                        $mergeObjects: [{ $arrayElemAt: ['$ofertaLaboral', 0] }, "$$ROOT"]
                    }
                }
            },
            {
                $project:
                {
                    _id: 0,
                    nombre: 1,
                    nombreOferta: '$ofertaLaboral.nombre'
                }
            }
        ]);
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
