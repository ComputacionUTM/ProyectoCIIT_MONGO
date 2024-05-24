import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import puesto from '../models/puesto.model'


class PuestoController {

    constructor() {
    }
    public async createPuesto(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, sueldo} = req.body;
        try {
            const nuevoPuesto = new puesto(
                {
                    nombre,
                    descripcion,
                    sueldo
                })
            console.log(nuevoPuesto);
            const puestoGuardado = await nuevoPuesto.save();
            res.json(
                {
                    id: puestoGuardado._id,
                    nombre: puestoGuardado.nombre,
                    descripcion : puestoGuardado.descripcion,
                    sueldo : puestoGuardado.sueldo,
                    createAt: puestoGuardado.createdAt,
                    updateAt: puestoGuardado.updatedAt
                })
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
    public async list(req: Request, res: Response): Promise<void>{
        console.log("Mostrando Puestos");
        const rol = await puesto.find()
        res.json(rol)
    }
    public async listRestricciones(req: Request, res: Response): Promise<void>{
        console.log("Mostrando Puestos");
        const {text1, text2, sueldo} = req.body;

        const rol = await puesto.find({$and:[{sueldo: {$gte: sueldo}}, {$or: [{ nombre: {$regex:text1}}, {nombre: {$regex: text2}}]}]},{nombre:1,sueldo:1,_id:0}) ;

        //const rol = await puesto.find({nombre:/Desa/})//Bueca una subcadena en el atributo "nombre"
        /*Operadores relacionales
        $ne (no iguales)
        $gt (mayores que)
        $gte (mayores o iguales)
        $lt (menor que)
        $lte (menor o igual)
        $in [15000,20000] (Rango) 
        $nin [15000,20000] (fuera de rango)
        Operadores logicos
        $and:[{nombre:"Desarrollador web"},{"sueldo":20000}]
        $or:[{nombre:"Desarrollador web"},{"nombre":"Full stack"}]
        */
        res.json(rol)
    }
    public async listRango(req: Request, res: Response): Promise<void> {
        console.log("Mostrando Puestos Por Rango");
        const { text, limInferior, limSuperior } = req.body;

        const rol = await puesto.find({
            nombre: { $regex: text },
            sueldo: { $gte: limInferior, $lte: limSuperior }
        });
        res.json(rol);
    }

    public async SueldoMinimo(req: Request, res: Response): Promise<void> {
        console.log("Mostrando total puestos");
        const minimos  = await puesto.aggregate([{
            '$group': { _id: null ,'total':{'$count':{}}}
        }]);
        res.json(minimos);
    }
    
}
export const puestoController = new PuestoController();
